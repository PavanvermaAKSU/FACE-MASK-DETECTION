from ultralytics import YOLO
import cv2
import os

model = YOLO("models/best.pt")

CLASS_NAMES = {
    0: "Incorrect Mask",
    1: "No Mask",
    2: "With Mask"
}

COLORS = {
    0: (0, 255, 255),   # Yellow
    1: (0, 0, 255),     # Red
    2: (0, 255, 0)      # Green
}

def detect_mask(image_path):

    results = model(image_path)

    image = cv2.imread(image_path)

    detections = []

    for r in results:

        for box in r.boxes:

            cls = int(box.cls[0])
            conf = float(box.conf[0])

            x1, y1, x2, y2 = map(
                int,
                box.xyxy[0]
            )

            color = COLORS[cls]

            label = CLASS_NAMES[cls]

            cv2.rectangle(
                image,
                (x1, y1),
                (x2, y2),
                color,
                3
            )

            cv2.putText(
                image,
                f"{label} {conf:.2f}",
                (x1, y1 - 10),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.7,
                color,
                2
            )

            detections.append({
                "class": cls,
                "label": label,
                "confidence": conf,
                "x1": x1,
                "y1": y1,
                "x2": x2,
                "y2": y2
            })

    os.makedirs(
        "results",
        exist_ok=True
    )

    output_path = (
        "results/processed_stream.jpg"
    )

    cv2.imwrite(
        output_path,
        image
    )

    return detections