import os
import time
import sqlite3
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import cv2
import numpy as np
from ultralytics import YOLO

app = FastAPI(title="VisionGuard AI Core Engine")

# CORS Setup for React frontend connectivity
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directories configuration
UPLOAD_DIR = "uploads"
RESULT_DIR = "results"
DB_PATH = "detection_logs.db"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(RESULT_DIR, exist_ok=True)

# Mount processing results path dynamically for frontend <img> tracking
app.mount("/results", StaticFiles(directory=RESULT_DIR), name="results")

# Initialize Custom Weights Model
# 0: Incorrect Mask, 1: Without Mask, 2: With Mask
model = YOLO("models/best.pt")

# SQLite Local Storage Intialization
def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            label TEXT NOT NULL,
            confidence REAL NOT NULL,
            created_at TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()

init_db()

# Label maps mapping intelligently with your custom model indexes
LABEL_MAP = {
    0: "Incorrect Mask",
    1: "Without Mask",
    2: "With Mask"
}

@app.get("/")
def read_root():
    return {"status": "Online", "engine": "YOLOv8-Core", "active_mapping": LABEL_MAP}

@app.post("/detect")
async def detect_mask(file: UploadFile = File(...)):
    # Read file stream safely
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    if frame is None:
        return {"error": "Invalid imagery format configuration"}

    # Run YOLO Inference
    results = model(frame, conf=0.45)
    detections = []
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S")

    # Access first image processing result matrix loop safely
    for box in results[0].boxes:
        cls_id = int(box.cls[0].item())
        conf_val = float(box.conf[0].item())
        label_text = LABEL_MAP.get(cls_id, "Unknown Face")

        detections.append({
            "class": cls_id,
            "label": label_text,
            "confidence": conf_val
        })

        # Save record directly to database for real-time dashboard tracking
        cursor.execute(
            "INSERT INTO history (label, confidence, created_at) VALUES (?, ?, ?)",
            (label_text, conf_val, timestamp)
        )
    
    conn.commit()
    conn.close()

    # Draw native bounding boxes over frame for live-stream render loop
    annotated_frame = results[0].plot()
    output_filename = "processed_stream.jpg"
    output_path = os.path.join(RESULT_DIR, output_filename)
    cv2.imwrite(output_path, annotated_frame)

    return {
        "detections": detections,
        "image_url": f"http://127.0.0.1:8000/results/{output_filename}"
    }

@app.get("/history")
def get_history():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    # Fetch recent 50 evaluation logs sorted by timestamps sequence
    cursor.execute("SELECT id, label, confidence, created_at FROM history ORDER BY id DESC LIMIT 50")
    rows = cursor.fetchall()
    conn.close()

    # Clean Array to Clean Object Mapping Architecture
    history_list = []
    for row in rows:
        history_list.append({
            "id": row[0],
            "label": row[1],
            "confidence": row[2],
            "created_at": row[3]
        })
        
    return {"history": history_list}

@app.delete("/clear-history")
def clear_history():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM history")
    conn.commit()
    conn.close()
    return {"message": "Database tracking matrices wiped successfully"}