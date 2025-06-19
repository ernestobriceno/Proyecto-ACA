from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime

app = FastAPI()

class Text(BaseModel):
    text: str

BANNED_WORDS = {"badword"}
MOD_LOG = []

@app.post('/moderate')
def moderate(text: Text):
    record = {
        "timestamp": datetime.utcnow().isoformat(),
        "text": text.text,
    }
    for word in BANNED_WORDS:
        if word in text.text.lower():
            record.update({"allowed": False, "reason": "Contenido inapropiado"})
            MOD_LOG.append(record)
            return {"allowed": False, "reason": "Contenido inapropiado"}
    record["allowed"] = True
    MOD_LOG.append(record)
    return {"allowed": True}

