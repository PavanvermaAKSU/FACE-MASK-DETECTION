# 🛡️ FACE MASK DETECTION SYSTEM

## Internship Details

| Field            | Details                    |
| ---------------- | -------------------------- |
| **Intern ID**    | CITS2674                   |
| **Intern Name**  | PAVAN KUMAR VERMA          |
| **Duration**     | 4 Weeks                    |
| **Project Name** | FACE MASK DETECTION SYSTEM |

---

# 📌 Project Overview

The Face Mask Detection System is an AI-powered computer vision application designed to identify whether a person is wearing a face mask, not wearing a face mask, or wearing a face mask incorrectly.

The system utilizes a custom-trained YOLO model for object detection, FastAPI for backend API development, React.js for frontend development, and SQLite for data storage.

This project demonstrates the integration of Artificial Intelligence, Computer Vision, Backend Development, Frontend Development, and Database Management into a complete full-stack AI solution.

---

# 🎯 Project Scope

The scope of this project includes:

* Real-time face mask classification
* Detection of mask compliance
* Identification of incorrect mask usage
* Bounding box visualization
* Confidence score generation
* Detection history management
* Interactive dashboard analytics
* Fast API communication between frontend and AI model
* Full-stack deployment readiness

The system can be further extended for use in:

* Educational Institutions
* Hospitals
* Offices
* Airports
* Railway Stations
* Public Surveillance Systems
* Smart City Applications

---

# ✨ Features

## AI Detection Features

* Face Detection using YOLO
* With Mask Detection
* No Mask Detection
* Incorrect Mask Detection
* Confidence Score Display
* Bounding Box Rendering

## Dashboard Features

* Modern React Dashboard
* KPI Cards
* Detection Statistics
* AI Analysis Panel
* Detection History Tracking

## Backend Features

* FastAPI REST API
* Image Processing Pipeline
* Detection Logging
* SQLite Database Integration

## Frontend Features

* Responsive User Interface
* Image Upload System
* Detection Result Visualization
* Bounding Box Display
* Professional Dashboard Layout

---

# 🛠️ Technology Stack

## Frontend

* React.js
* Tailwind CSS
* Axios
* Lucide React

## Backend

* FastAPI
* Python

## Artificial Intelligence

* YOLO
* OpenCV
* PyTorch
* Ultralytics

## Database

* SQLite

## Tools

* VS Code
* Git
* GitHub

---

# 📂 Project Structure

```text
FACE-MASK-DETECTION/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── models/
│   │   └── best.pt
│   │
│   ├── main.py
│   ├── detect.py
│   ├── database.py
│   ├── detections.db
│   └── requirements.txt
│
├── screenshots/
├── output_images/
│
└── README.md
```

---

# 🚀 Installation Guide

## Clone Repository

```bash
git clone https://github.com/yourusername/face-mask-detection.git
cd face-mask-detection
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt
```

Run Backend:

```bash
python -m uvicorn main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

# 🔍 API Endpoint

## Detect Face Mask

```http
POST /detect
```

### Response Example

```json
{
  "detections": [
    {
      "class": 2,
      "label": "With Mask",
      "confidence": 0.94
    }
  ],
  "image_url": "http://127.0.0.1:8000/results/processed_stream.jpg"
}
```

---

# 📊 Model Performance

| Metric    | Value |
| --------- | ----- |
| Precision | 91.7% |
| Recall    | 84.2% |
| mAP@50    | 90.6% |
| mAP@50-95 | 60.0% |

The model was trained on a custom face mask dataset using YOLO.

---

# 💻 Source Code

The complete source code for both frontend and backend is included in this repository.

### Frontend

```text
frontend/
```

### Backend

```text
backend/
```

### AI Model

```text
backend/models/best.pt
```

---

# 🎓 Learning Outcomes

Through this project, the following skills were developed:

* Computer Vision
* Object Detection using YOLO
* Deep Learning Fundamentals
* FastAPI Backend Development
* React.js Frontend Development
* REST API Integration
* Database Management
* Full Stack AI Application Development
* Git and GitHub Version Control

---

# 🔮 Future Enhancements

* Real-Time Webcam Detection
* Multi-Face Detection
* PDF Report Generation
* Analytics Dashboard
* User Authentication
* Cloud Deployment
* Mobile Application Support

---

# 👨‍💻 Author

### PAVAN KUMAR VERMA

B.Tech (Artificial Intelligence & Data Science)

AKS University

Intern ID: CITS2674

Project Duration: 4 Weeks

Project: Face Mask Detection System

---

# 📜 Conclusion

The Face Mask Detection System successfully demonstrates the practical implementation of Artificial Intelligence and Computer Vision in a real-world safety monitoring application. The project integrates a YOLO-based detection model with a FastAPI backend and React.js frontend to provide accurate mask detection, interactive visualization, and efficient data management.

This project strengthened practical knowledge in AI, Deep Learning, Full-Stack Development, API Integration, and Software Engineering practices.
