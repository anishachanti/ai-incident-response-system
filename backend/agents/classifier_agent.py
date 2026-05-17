import json
from utils import client


def classifier_agent(state):
    logs = state["logs"]

    # prompt = f"""
    # You are an incident classification agent.
    #
    # Analyze these logs.
    #
    # Return:
    # 1. Severity
    # 2. Impacted System
    #
    # Logs:
    # {logs}
    # """

    prompt = f"""
    You are an incident classification agent.

    Analyze these logs.
    
    Determine:
    1. Incident severity:
   - LOW
   - MEDIUM
   - HIGH
   - CRITICAL

    2. Impacted system

    Return ONLY valid JSON.

    Format:
    {{
        "severity": "",
        "impacted_system": ""
    }}

    Logs:
    {logs}
    """

    response = client.chat.completions.create(
        model = "llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    output = response.choices[0].message.content

    cleaned_output=(output.replace("```json", "").replace("```", "").strip())

    data = json.loads(cleaned_output)


    state["severity"] = data["severity"]
    state["impacted_system"] = data["impacted_system"]
    state["steps"].append("Incident Classification Complete")

    return state


