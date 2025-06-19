from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Text(BaseModel):
    text: str

BANNED_WORDS = {"badword"}

@app.post('/moderate')
def moderate(text: Text):
    for word in BANNED_WORDS:
        if word in text.text.lower():
            return {"allowed": False, "reason": "Contenido inapropiado"}
    return {"allowed": True}
