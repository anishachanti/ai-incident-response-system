import json
from utils import client


def log_analysis_agent(state):
    logs = state["logs"]

    # prompt = f"""
    # You are a senior production support engineer.
    #
    # Analyze these logs.
    #
    # Identify:
    # - probable root cause
    # - error patterns
    # - failure reason
    #
    # Logs:
    # {logs}
    # """

    prompt = f"""
    You are a senior production support engineer. 
    
    Analyze these logs.

    Return ONLY valid JSON.

    Format:
    {{
        "root_cause": "",
        "failure_reason": "",
        "error_patterns": []
    }}

    Logs:
    {logs}
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    output = response.choices[0].message.content

    cleaned_output = (output.replace("```json", "").replace("```", "").strip())

    data = json.loads(cleaned_output)

    state["root_cause"] = data["root_cause"]

    state["steps"].append("Log Analysis Complete")

    return state


