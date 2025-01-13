import requests

mapping = {
    4:	"Human Anatomy",
    17:	"Linear Inequalities",
    18:	"Permuation and Combination",
    19:	"Laws of Motion",
    20:	"Anatomy of Flowering Plants",
}

data = [
    (3, "What is the structure of the human skeleton?", 4),
    (3, "Explain the functions of the circulatory system.", 4),
    (3, "What are the types of muscles in the human body?", 4),
    (3, "Describe the role of the nervous system in humans.", 4),
    (3, "How does the human skeletal system interact with the muscular system to facilitate movement, and what are some common disorders that can disrupt this interaction?", 4),
    (3, "Discuss the process by which oxygenated blood is transported to the brain and how it differs from the process in other parts of the body.", 4),
    (3, "How do the various types of muscle fibers differ in their structure, function, and adaptability to physical exercise?", 4),
    (3, "In what ways does the autonomic nervous system regulate involuntary actions, and how do disorders of this system affect homeostasis?", 4),

    (3, "How do you solve a linear inequality?", 17),
    (3, "What are the rules for graphing linear inequalities?", 17),
    (3, "Explain the concept of solution sets in linear inequalities.", 17),
    (3, "What is the difference between strict and non-strict inequalities?", 17),
    (3, "How does the representation of a linear inequality on a graph change when the inequality symbol is reversed, and how can this be used to solve optimization problems?", 17),
    (3, "In the context of real-world problems, explain how linear inequalities can model constraints in resource allocation, and provide an example.", 17),
    (3, "What is the impact of scaling the coefficients of a linear inequality by a negative factor, and how does it affect the inequality and its graphical representation?", 17),

    (3, "What is the formula for permutations?", 18),
    (3, "How do combinations differ from permutations?", 18),
    (3, "Give examples of problems solved using combinations.", 18),
    (3, "Explain the concept of factorial in permutation calculations.", 18),
    (3, "Why is the order of selection important in permutations but not in combinations, and how does this distinction apply to solving probability problems in card games?", 18),
    (3, "Provide a detailed explanation of the principle of inclusion-exclusion and its role in solving problems involving overlapping sets in permutations.", 18),
    (3, "How does the formula for circular permutations differ from linear permutations, and in what scenarios is it applied?", 18),

    (3, "What is Newton's second law of motion?", 19),
    (3, "How is acceleration related to force?", 19),
    (3, "What are the applications of the laws of motion in real life?", 19),
    (3, "Explain the concept of inertia.", 19),
    (3, "How does Newton's second law of motion apply to systems involving variable mass, such as rockets, and what are the mathematical modifications required for such scenarios?", 19),
    (3, "Discuss the role of friction in altering the outcomes predicted by Newton's laws of motion, and explain how frictional forces can sometimes be advantageous.", 19),
    (3, "Provide an example of a real-world scenario where Newton's laws of motion fail to accurately describe the behavior of objects, and explain why this happens.", 19),

    (3, "What are the parts of a flowering plant?", 20),
    (3, "Explain the structure of a flower.", 20),
    (3, "What are the functions of xylem and phloem?", 20),
    (3, "Describe the anatomy of a dicot stem.", 20),
    (3, "How do environmental factors such as soil composition and water availability influence the development and anatomy of the xylem and phloem in flowering plants?", 20),
    (3, "Explain the process of pollination in detail, including the roles of different flower parts and how this process varies among plant species.", 20),
    (3, "What are the anatomical and functional differences between monocot and dicot roots, and how do these differences affect their adaptability to different environments?", 20),
]

# Backend URL
backend_url = "http://localhost:3000/router"

# Function to send POST requests
def send_post_request(query, course_id):
    payload = {
        "course_id": course_id,
        "query": query
    }
    try:
        response = requests.post(backend_url, json=payload)
        print(f"Sent: {payload}, Received: {response.status_code}, {response.json()}")
        return response.json()[0]["metadata"]["id"]
        
    except requests.exceptions.RequestException as e:
        print(f"Error sending request: {e}")

correct_count = 0
for course_id, query, response in data:
    result = send_post_request(query, course_id)
    if result == response:
        correct_count += 1

print(f"Correct responses: {correct_count}/{len(data)}")
print(f"Probability of finding correct answer: {correct_count / len(data)}")