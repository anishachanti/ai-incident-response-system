from rag.chroma_store import search_similar

def retrieval_agent(state):
    logs = state["logs"]
    results = search_similar(logs)
    documents = results["documents"][0]
    state["similar_incidents"] = documents
    state["steps"].append("Similar Incidents Retrieved")
    return state