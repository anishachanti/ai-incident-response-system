from typing import TypedDict

class IncidentState(TypedDict):
    logs: str
    severity: str
    impacted_system: str
    root_cause: str
    recommendations: str
    similar_incidents: str
    steps: list


