import os
from dotenv import load_dotenv
from flask import Flask, request
from flask_cors import CORS
import sqlite3
import deepl

load_dotenv()

app = Flask(__name__)
CORS(app)

translator = deepl.Translator(os.getenv("DEEPL_API_KEY"))

def init_db():
    conn = sqlite3.connect('vocabulary.db')
    c = conn.cursor()

    c.execute('''CREATE TABLE IF NOT EXISTS vocabularies(
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              word TEXT,
              meaning TEXT )''')
    
    c.execute('''CREATE TABLE IF NOT EXISTS settings(
              key TEXT PRIMARY KEY,
              value INTEGER)''')
        
    c.execute('''CREATE TABLE IF NOT EXISTS todos(
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              todo TEXT,
              done INTEGER DEFAULT 0)''')
    
    conn.commit() 
    conn.close()

def save_number(number):
    conn = sqlite3.connect('vocabulary.db')
    c = conn.cursor()

    c.execute("""
    INSERT OR REPLACE INTO settings (key, value)
    VALUES ('number', ?)
    """, (number,))

    conn.commit()
    conn.close()

def save_score(score):
    conn = sqlite3.connect('vocabulary.db')
    c = conn.cursor()

    c.execute("""
    INSERT OR REPLACE INTO settings (key, value)
    VALUES ('score', ?)
    """, (score,))

    conn.commit()
    conn.close()

def save_todo(todo):
    conn = sqlite3.connect('vocabulary.db')
    c = conn.cursor()

    c.execute("""
    INSERT INTO todos (todo)
    VALUES (?)
    """, (todo,))

    conn.commit()
    conn.close()
    
@app.route("/save_number", methods=["POST"])
def save_number_route():
    data = request.json
    number = data["number"]
    save_number(number)
    return {"status": "success"}

@app.route("/save_score", methods=["POST"])
def save_score_route():
    data = request.json
    score = data["score"]
    save_score(score)
    return {"status": "success"}

@app.route("/save_todo", methods=["POST"])
def save_todo_route():
    data = request.json
    todo = data["todo"]
    save_todo(todo)
    return {"status": "success"}

@app.route("/get_number", methods=["GET"])
def get_number_route():
    conn = sqlite3.connect('vocabulary.db')
    c = conn.cursor()

    c.execute("SELECT value FROM settings WHERE key = 'number'")
    result = c.fetchone()
    conn.close()

    return {"number": result[0] if result else None}

@app.route("/get_score", methods=["GET"])
def get_score_route():
    conn = sqlite3.connect('vocabulary.db')
    c = conn.cursor()

    c.execute("SELECT value FROM settings WHERE key = 'score'")
    result = c.fetchone()
    conn.close()

    return {"score": result[0] if result else None}

@app.route("/get_todo", methods=["GET"])
def get_todo_route():
    conn = sqlite3.connect('vocabulary.db')
    c = conn.cursor()

    c.execute("SELECT id, todo, done FROM todos")
    result = c.fetchall()
    conn.close()

    return {"todo": [{"id": row[0], "text": row[1], "done": row[2]} for row in result]}

@app.route("/delete_todo/<int:id>", methods=["DELETE"])
def delete_todo_route(id):
    conn = sqlite3.connect('vocabulary.db')
    c = conn.cursor()
    c.execute("DELETE FROM todos WHERE id = ?", (id,))
    conn.commit()
    conn.close()
    return {"status": "success"}

@app.route("/translate", methods=["POST"])
def translate():
    data = request.json
    text = data["text"]
    result = translator.translate_text(
        text,
        target_lang="ja"
    )

    conn = sqlite3.connect('vocabulary.db')
    c = conn.cursor()
    c.execute("""
        INSERT INTO vocabularies (word,meaning)
        VALUES (?, ?)
        """, (text,result.text)
    )
    conn.commit()
    conn.close()
    return {"status": "success"}

@app.route("/get_vocabulary",methods=["GET"])
def get_vocabulary():
    conn = sqlite3.connect('vocabulary.db')
    c = conn.cursor()
    c.execute("SELECT id, word, meaning FROM vocabularies")
    result = c.fetchall()
    conn.close()
    return {"vocab": [{"id":row[0], "word": row[1], "meaning": row[2]} for row in result]}

if __name__ == "__main__":
    init_db()
    app.run(debug=True)