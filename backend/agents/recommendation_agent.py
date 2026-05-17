from utils import client

def recommendation_agent(state):

    root_cause = state["root_cause"]

    prompt = f"""
    Based on this root cause:
    
    {root_cause}
    
    Return concise recommendations.
    
    Format:
    - remediation steps
    - rollback strategy
    - monitoring recommendations
    
    Keep response under 150 words.
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "user", "content": prompt},
        ]
    )

    state["recommendations"] = response.choices[0].message.content
    state["steps"].append("Recommendations Generated")

    return state