from fastapi import FastAPI,UploadFile,File
from fastapi.middleware.cors import CORSMiddleware

from workflows.incident_graph import app_graph

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):

    content = await file.read()
    logs = content.decode("utf-8")

    initial_state = {
        "logs": logs,
        "severity": "",
        "impacted_system": "",
        "root_cause": "",
        "recommendations": "",
        "similar_incidents": "",
        "steps": []
    }

    result = app_graph.invoke(initial_state)

    return result
