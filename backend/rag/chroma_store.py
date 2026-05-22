import chromadb

client = chromadb.PersistentClient(path="./chroma_db")

collection = client.get_or_create_collection(name="incidents")

def add_incident(incident_id, content):
    collection.add(
        documents=[content],
        ids=[incident_id]
    )

def search_similar(query):
    results = collection.query(
        query_texts = [query],
        n_results=2
    )

    return results


sample_incidents = [
    {
        "id": "1",
        "content": "Payment API failed due to database timeout after deployment."
    },
    {
        "id": "2",
        "content": "NullPointerException caused service crash in authentication module."
    },
    {
        "id": "3",
        "content": "HTTP 500 errors due to Redis cache failure."
    }
]

for incident in sample_incidents:
    try:
        collection.add(
            documents=[incident["content"]],
            ids=[incident["id"]]
        )
    except Exception as e:
        print(f"Error adding incident: {e}")