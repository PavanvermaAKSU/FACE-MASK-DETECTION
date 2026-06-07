import sqlite3

# Database file create/open
conn = sqlite3.connect(
    "history.db",
    check_same_thread=False
)

cursor = conn.cursor()

# Detection history table
cursor.execute("""
CREATE TABLE IF NOT EXISTS detections (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    label TEXT NOT NULL,

    confidence REAL NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

)
""")

conn.commit()