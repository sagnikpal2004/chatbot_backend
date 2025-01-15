import time
starttime3 = time.time()
import sys
if len(sys.argv) < 1:
    exit("Usage: python src/utils/pinecone.py <ACTION> [args...]")

from langchain_huggingface import HuggingFaceEmbeddings
from langchain_pinecone.vectorstores import PineconeVectorStore

model = HuggingFaceEmbeddings(model_name="sentence-transformers/multi-qa-mpnet-base-cos-v1")

pc_apikey = "pcsk_25oCJP_NkpfLrNG7FrNpev3yRsvhPR1VmWQZuaUWbXdNvFbM16G2YMwdLH15wMRjqPHs8i"
pinecone1 = PineconeVectorStore(pinecone_api_key=pc_apikey, embedding=model, index_name="content-store2")
pinecone2 = PineconeVectorStore(pinecone_api_key=pc_apikey, embedding=model, index_name="topic-store")
pinecone3 = PineconeVectorStore(pinecone_api_key=pc_apikey, embedding=model, index_name="topic-store2")


if sys.argv[1] == "QUERY":
    if len(sys.argv) < 4:
        exit("Usage: python src/utils/pinecone.py QUERY <COURSE_ID> <QUERY>")

    course_id = int(sys.argv[2])
    query = sys.argv[3]

    subject_id = pinecone1.similarity_search_with_score(
        query, k=1,
        filter={  
            "course_id": { "$eq": course_id } 
        }, 
    )[0][0].id
    subject_id = int(subject_id)


    results = pinecone2.similarity_search_with_score(
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

elif sys.argv[1] == "QUERY2":
    if len(sys.argv) < 4:
        exit("Usage: python src/utils/pinecone.py QUERY2 <COURSE_ID> <QUERY>")

    course_id = int(sys.argv[2])
    query = sys.argv[3]

    ### PROD
    # starttime = time.time()
    # results = pinecone3.similarity_search_with_score(
    #     query, k=3,
    #     filter={  
    #         "course_id": { "$eq": course_id }
    #     },
    # )
    # endtime = time.time()

    ### DEBUG
    starttime0 = time.time()
    embeddings = pinecone3._embedding.embed_query(query)
    endtime0 = time.time()

    starttime1 = time.time()
    results = pinecone3.similarity_search_by_vector_with_score(
        embeddings, k=3,
        filter={  
            "course_id": { "$eq": course_id }
        },
    )
    endtime1 = time.time()

    import json
    print(json.dumps({
        "results": [ { "metadata": doc.metadata, "topic": doc.page_content, "score": score } for doc, score in results ],
        "time_embed": endtime0 - starttime0,
        "time_pc": endtime1 - starttime1,
    }))

elif sys.argv[1] == "QUERY3":
    if len(sys.argv) < 4:
        exit("Usage: python src/utils/pinecone.py QUERY2 <COURSE_ID> <QUERY>")

    import nltk
    from nltk.tokenize import word_tokenize
    from nltk.corpus import stopwords
    from nltk.stem import PorterStemmer, WordNetLemmatizer

    # nltk.download("punkt")
    # nltk.download("stopwords")
    # nltk.download("wordnet")

    course_id = int(sys.argv[2])
    query = sys.argv[3].lower()

    lemmatizer = WordNetLemmatizer()
    stop_words = set(stopwords.words("english"))
    important_stopwords = {"why", "how", "what", "when", "where", "which"}

    # def preprocess_query(query):                                                                                
    #     query = ''.join(char if char.isalpha() or char.isspace() else ' ' for char in query)
    #     tokens = word_tokenize(query)
    #     preprocessed_tokens = [
    #         lemmatizer.lemmatize(token) 
    #         for token in tokens 
    #         if token in important_stopwords or token not in stop_words
    #     ]
    #     # Return the processed query as a space-separated string
    #     return " ".join(preprocessed_tokens)
    # query = preprocess_query(query)

    results = pinecone3.similarity_search_with_score(
        query, k=1,
        filter={  
            "course_id": { "$eq": course_id }
        },
    )

    import json
    print(json.dumps([
        { "metadata": doc.metadata, "topic": doc.page_content, "score": score }
        for doc, score in results
    ]))

elif sys.argv[1] == "CREATE_SUBJECT":
    cls = int(sys.argv[2])
    course_id = int(sys.argv[3])
    subject_id = int(sys.argv[4])
    subject_name = sys.argv[6]

    from langchain_core.documents.base import Document

    existing_doc = pinecone1.get_by_ids([subject_id])
    if not existing_doc:
        doc = Document(
            id = subject_id,
            page_content = subject_name,
            metadata={ "cls": cls, "course_id": course_id, "id": subject_id }
        )
        pinecone1.add_documents([doc])

    print("SUCCESS")

elif sys.argv[1] == "CREATE_TOPIC":
    cls = int(sys.argv[2])
    course_id = int(sys.argv[3])
    subject_id = int(sys.argv[4])
    topic_id = int(sys.argv[5])
    topic_name = sys.argv[6]

    from langchain_core.documents.base import Document

    existing_doc = pinecone2.get_by_ids([topic_id])
    if not existing_doc:
        doc = Document(
            id = topic_id,
            page_content = topic_name,
            metadata={ "cls": cls, "course_id": course_id, "subject_id": subject_id, "id": topic_id }
        )
        pinecone2.add_documents([doc])

    print("SUCCESS")

endtime3 = time.time()
print(f"TIME TAKEN {endtime3 - starttime3}")