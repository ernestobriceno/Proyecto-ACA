from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_moderate_allows_clean_text():
    res = client.post('/moderate', json={'text': 'hola'}).json()
    assert res == {'allowed': True}

def test_moderate_blocks_badword():
    res = client.post('/moderate', json={'text': 'badword here'}).json()
    assert res['allowed'] is False
    assert 'reason' in res

