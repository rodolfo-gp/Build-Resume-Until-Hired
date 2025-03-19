# Deployment Process Overview

The deployment process involves setting up a Flask API server with a MongoDB database using Docker, both locally and on an AWS EC2 instance. Locally, Docker Compose is used to build and run the services. For AWS deployment, the code is uploaded to the instance, containers are rebuilt, and Nginx is used as a reverse proxy for HTTPS communication. The process ensures secure and scalable deployment with SSL certificates.

# **Flask API & MongoDB with Docker**

This guide explains how to run the **Flask API server** and **MongoDB** locally using Docker, as well as deploy the project to an **AWS EC2 instance** for production.

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
for the scp comamnd you would use your instances .pem file, ip and directory to store the files.
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