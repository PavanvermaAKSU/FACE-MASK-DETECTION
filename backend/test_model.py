from ultralytics import YOLO

print("Loading model...")

model = YOLO("models/best.pt")

print("Model loaded successfully!")