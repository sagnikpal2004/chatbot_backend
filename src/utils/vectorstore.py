import sys
if len(sys.argv) < 3:
    exit("Usage: python src/utils/pinecone.py <course_id> <query>")
course_id = int(sys.argv[1])
query = sys.argv[2]


from langchain_huggingface import HuggingFaceEmbeddings
from langchain_pinecone.vectorstores import PineconeVectorStore

model = HuggingFaceEmbeddings(model_name="sentence-transformers/multi-qa-mpnet-base-cos-v1")

pc_apikey = "pcsk_25oCJP_NkpfLrNG7FrNpev3yRsvhPR1VmWQZuaUWbXdNvFbM16G2YMwdLH15wMRjqPHs8i"

pinecone = PineconeVectorStore(pinecone_api_key=pc_apikey, embedding=model, index_name="content-store2")
subject_id = pinecone.similarity_search_with_score(
    query, k=1,
    filter={  
        "course_id": { "$eq": course_id } 
    }, 
)[0][0].id
subject_id = int(subject_id)


pinecone = PineconeVectorStore(pinecone_api_key=pc_apikey, embedding=model, index_name="topic-store")
results = pinecone.similarity_search_with_score(
    query, k=1,
    filter={  
        "subject_id": { "$eq": subject_id }
    },
)

import json
print(json.dumps([
    { "metadata": doc.metadata, "topic": doc.page_content, "score": score }
    for doc, score in results
]))

