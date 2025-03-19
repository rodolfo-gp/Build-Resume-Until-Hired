# Deployment Process Overview

The deployment process involves setting up a Flask API server with a MongoDB database using Docker, both locally and on an AWS EC2 instance. Locally, Docker Compose is used to build and run the services. For AWS deployment, the code is uploaded to the instance, containers are rebuilt, and Nginx is used as a reverse proxy for HTTPS communication. The process ensures secure and scalable deployment with SSL certificates.

## **Running Flask API & MongoDB Locally with Docker**

### **1️⃣ Prerequisites**
* **Install Docker** (if not already installed) – [Download Docker](https://www.docker.com/get-started)  
* **Ensure Docker Engine is running** (via **CLI** or **Docker Desktop**)  
* **Latest `.env` file** should be present in the `backendLayer` directory. Example int main project README.md file 

### **2️⃣ Running the Containers**
```sh
cd backendLayer
docker-compose up --build -d
```
API will be visible on localhost:5000

### **3️⃣ Stopping the Containers**
```sh
docker-compose down
```

---

# **AWS EC2 Deployment (Dev Environment)**

### **1️⃣ Prerequisites**
* **EC2 Instance Ready** (Docker & Docker Compose installed)  
* **Nginx Reverse Proxy Configured** (for HTTPS & API container routing, container on port 5000)  
* **SSL Certificate Installed** (for secure connections)  
* **Latest `.env` file**  
* **AWS SSH Key (`.pem file`)**  

### **2️⃣ Uploading Files to EC2**
for the scp comamnd you would use your instances .pem file, ip and directory to store the files. This is an example of the command
```sh
cd backendLayer
scp -i SENG401ProjectEC2Key.pem -r * ec2-user@18.222.60.25:/home/ec2-user/SENG401_Term_Project_backend
```
⚠️ **Ensure** you are **not** uploading virtual environment files (`venv` or unnecessary dependencies).  

### **3️⃣ Updating the AWS Instance**

#### **Connect to EC2 via SSH**
```sh
ssh -i SENG401ProjectEC2Key.pem ec2-user@18.222.60.25
```
Your working directory **must be**:  
```sh
/home/ec2-user/SENG401_Term_Project_backend
```
or the dir where you uploaded the files

#### **Restart Containers with New Code**
```sh
docker-compose down   # Stop current containers
docker-compose up --build -d  # Rebuild & restart with new changes
```

---

## **Additional Notes**
* **Demo Backend Domain:** `https://api.bru-h.xyz`  

* **EC2 Setup Reference:** Followed using this **[YouTube Guide](https://www.youtube.com/watch?v=qNIniDftAcU)**  

 **HTTPS Setup:**  
- Requires **Nginx Reverse Proxy**  
- Configuring **SSL Certificates** manually  
- Setting up **config files** for proper request routing  

---

# API Documentation

This section provides details on the API routes available in this Flask application, including their functionality, required input parameters, and example responses.

### **1. Test Route**
**Endpoint:** `GET /`

**Description:**
Returns a simple message to verify that the server is running.

**Response:**
```json
"Hello From Flask"
```

---
### **2. User Signup**
**Endpoint:** `POST /signup`

**Description:**
Registers a new user.

**Required Fields:**
- `email` (string)
- `password` (string)

**Example Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Success Response:**
```json
{
  "message": "User Created Successfully",
  "status": true
}
```

**Error Responses:**
- `400`: "Bad Request, Missing required fields"
- `400`: "User with that email already exists"
- `501`: "Database Error"

---
### **3. User Login**
**Endpoint:** `POST /login`

**Description:**
Authenticates an existing user.

**Required Fields:**
- `email` (string)
- `password` (string)

**Example Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Success Response:**
```json
{
  "message": "Successful Login",
  "status": true
}
```

**Error Responses:**
- `400`: "Bad Request, Missing required fields"
- `400`: "Incorrect email or password"
- `500`: "Bad request"

---
### **4. Get User CVs**
**Endpoint:** `POST /cv`

**Description:**
Retrieves all CVs for an authenticated user.

**Required Fields:**
- `email` (string)
- `password` (string)

**Example Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Success Response:**
```json
{
  "message": "successfully retrieved documents",
  "status": true,
  "documents": [
    {
      "id": 1,
      "doc_title": "My Resume",
      "latex": false
    }
  ]
}
```

**Error Responses:**
- `400`: "Bad Request, Missing required fields"
- `400`: "Invalid user credentials"
- `501`: "Database Error"

---
### **5. Save CV**
**Endpoint:** `POST /cv/save`

**Description:**
Saves a new CV document for an authenticated user.

**Required Fields:**
- `email` (string)
- `password` (string)
- `latex` (boolean)
- `doc_title` (string)
- `doc_body` (string)

**Example Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "latex": false,
  "doc_title": "Software Engineer Resume",
  "doc_body": "This is my resume content."
}
```

**Success Response:**
```json
{
  "message": "New document created successfully",
  "status": true
}
```

---
### **6. Get Specific CV**
**Endpoint:** `POST /cv/user`

**Description:**
Retrieves a specific CV for an authenticated user.

**Required Fields:**
- `email` (string)
- `password` (string)
- `doc_id` (integer)

**Example Request:**
```json
{
    "message": "Document found",
    "status": true,
    "document": {
        "latex": false,
        "doc_title": "test tittle",
        "doc_body": "Doc body......",
        "id": 1
    }
}
```

**Success Response:**
```json
{
  "message": "Document found",
  "status": true,
  "document": {
    "doc_title": "Software Engineer Resume",
    "doc_body": "This is my resume content."
  }
}
```

---
### **7. Delete CV**
**Endpoint:** `DELETE /cv/user`

**Description:**
Deletes a specific CV for an authenticated user.

**Required Fields:**
- `email` (string)
- `password` (string)
- `doc_id` (integer)

**Example Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "doc_id": 1
}
```

**Success Response:**
```json
{
  "message": "Document deleted successfully",
  "status": true
}
```

**Error Response:**
- `404`: "Document not found"
- `500`: "Database Error"

---
### **8. Generate Cover Letter**
**Endpoint:** `POST /coverletter`

**Description:**
Generates a cover letter based on user input.

**Example Request:**
```json
{
    "name": "John Doe",
    "education": "B.Sc. in Software Engineering, University of Calgary",
    "address": "123 Main St, Calgary, AB, Canada",
    "phone": "123-456-7890",
    "email": "johndoe@example.com",
    "skills": ["Python", "C++", "Embedded Systems", "React.js"],
    "jobDesc": "Software Engineering Intern at Seequent",
    "recipientInfo": "Odin Fox",
    "companyName": "Seequent",
    "companyLocation": "Calgary, AB",
    "projects": ["Developed an AI chatbot using Rasa and Llama 3",
                 "Optimized a C-based data compression algorithm for embedded systems"],
    "workExperience": ["Research Intern at University of Calgary, focusing on LLM evaluations",
                   "Software Developer Intern at XYZ Tech, developed REST APIs in Python"],
    "additionalExperience": ["Volunteer coding mentor at local high school"],
    "latex": false
}
```

**Success Response:**
```json
{
    "doc_title": {
        "$date": "2025-03-19T18:20:30.019Z"
    },
    "doc_body": "John Doe  \\n 123 Main St  \\n Calgary, AB, Canada  \\n johndoe@example.com | 123-456-7890  \\n \\n [Date]\\n \\n To The Hiring Manager for Seequent,  \\n I am excited to apply for the Software Engineering Intern position. As a B.Sc. in Software Engineering student at the University of Calgary, I am passionate about embedded systems and AI. After researching Seequent through networking and online resources, I found the company’s focus on innovative geoscience technology, as well as its commitment to sustainability and collaboration, aligns closely with my interests and skill set. I believe my skills in Python, C++, and React.js would allow me to contribute meaningfully to Seequent’s team.\\n \\n As I share Seequent’s vision of creating impactful technology, I am currently a team member in a project where we developed an AI chatbot using Rasa and Llama 3. In this role, I contributed to the design and implementation of conversational AI solutions. Our work, including optimizing a C-based data compression algorithm for embedded systems, provides valuable insights and skills related to Seequent’s focus on advanced technological solutions.\\n \\n I have also completed coursework in software development, where I worked on developing REST APIs in Python, similar to those used in Seequent’s products. This process required extensive testing and integration, strengthening my technical skills in software engineering.\\n \\n Additionally, I have pursued volunteer work as a coding mentor at a local high school to build my skills in software development. I am currently working on research at the University of Calgary, focusing on LLM evaluations, where I have developed key technical solutions and outcomes.\\n \\n Finally, it is important to me that I not only create impactful technology but also seek out opportunities to see my work make a difference. Seequent’s focus on sustainability and innovation in conjunction with its collaborative work culture is something I would love the opportunity to be a part of. I hope to hear from you soon to discuss how I can contribute to the team.\\n \\n Sincerely,  \\n John Doe",
    "latex": false
}
```

---
### **9. Generate Resume**
**Endpoint:** `POST /resume`

**Description:**
Generates a resume based on user input.

**Example Request:**
```json
{
    "name": "Jane Smith",
    "education": "B.Sc. in Computer Science, University of Toronto",
    "address": "456 Elm St, Toronto, ON, Canada",
    "phone": "987-654-3210",
    "email": "janesmith@example.com",
    "socials": "https://github.com/janesmith",
    "skills": ["Java", "SQL", "PostgreSQL", "Docker"],
    "jobDesc": "Software Developer Intern at Garmin",
    "projects": ["Created a web app using React.js and Flask for Bluetooth communication",
                 "Built a CI/CD pipeline for automated testing with GitHub Actions"],
    "workExperience": ["Software Engineer Intern at ABC Corp, worked on database optimization",
                   "Teaching Assistant for Data Structures at University of Toronto"],
    "additionalExperience": ["Hackathon participant - 1st place in AI challenge"],
    "latex": false
}
```

**Success Response:**
```json
{
    "doc_title": {
        "$date": "2025-03-19T18:22:26.987Z"
    },
    "doc_body": "Jane Smith \t3rd Year Software Engineering Student  \\n Toronto, ON \t987-654-3210 | janesmith@example.com | GitHub: https://github.com/janesmith\\n \\n EDUCATION  \\n University of Toronto\tExpected Graduation: 2025\\n \\n B.Sc. in Computer Science\\n \\n TECHNICAL SKILLS \\n Languages: \tJava, SQL, PostgreSQL\\n Tools: \tDocker\\n Miscellaneous:\tReact.js, Flask, CI/CD, GitHub Actions\\n \\n WORK EXPERIENCE \\n ABC Corp, Toronto, ON\tMay 2023 - August 2023 \\n Software Engineer Intern \\n •\tWorked on database optimization, enhancing performance and reliability of data systems\\n •\tCollaborated with senior engineers to develop scalable software solutions\\n \\n University of Toronto, Toronto, ON\tSeptember 2022 – April 2023 \\n Teaching Assistant for Data Structures\t \\n •\tAssisted in teaching data structures, conducting tutorials, and grading assignments\\n •\tProvided support to students to enhance their understanding of complex algorithms\\n \\n TECHNICAL PROJECTS \\n Web App for Bluetooth Communication \tApril 2023 \\n •\tCreated a web application using React.js and Flask to facilitate Bluetooth communication\\n •\tImplemented user-friendly interfaces and ensured seamless data transmission\\n \\n CI/CD Pipeline for Automated Testing \tMarch 2023 \\n •\tBuilt a CI/CD pipeline using GitHub Actions to automate testing processes\\n •\tEnhanced software reliability and reduced manual testing time\\n \\n ADDITIONAL EXPERIENCE \\n Hackathon Participant \tNovember 2022 \\n •\t1st place in AI challenge, demonstrating innovative problem-solving and teamwork skills",
    "latex": false
}