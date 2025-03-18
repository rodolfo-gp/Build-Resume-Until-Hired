from flask_cors import CORS
import cryptographic_helpers as ch
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
import os

from applicationMaterial import (CoverLetter, Resume)
from llm.gptPromptingutilities import gpt_prompter

app = Flask(__name__)
CORS(app)

# Load MongoDB URI from environment variables
app.config["MONGO_URI"] = os.getenv("MONGO_URI")
mongo = PyMongo(app)

@app.route("/", methods=['GET'])
def test():
    return "Hello From Flask"

@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.json
        if not data or "email" not in data or "password" not in data:
            return "Bad Request, Missing Data", 400

        hashed_email = ch.hash_email(data["email"])

        if not does_user_exist(hashed_email):
            hashed_password = ch.hash_password(data["password"])
            newUser = {"email": hashed_email, "password": hashed_password}

            try:
                mongo.db.users.insert_one(newUser)
                return "User Created Successfully", 201
            except Exception as e:
                print(f"Database Error: {e}")
                return "Database Insertion Error", 501
        else:
            return "User with that email already exists", 402
    except Exception as e:
        print(f"Error: {e}")
        return "Bad Request", 500

def does_user_exist(email):
    return mongo.db.users.find_one({"email": email}, {"_id": 0}) is not None

def does_user_exist_login(hashed_email, password_plain_text):
    user = mongo.db.users.find_one({"email": hashed_email}, {"_id": 0})
    return user and ch.compare_passwords(user["password"], password_plain_text)

@app.route('login', methods=['POST'])
def login():
    return_request = {
        "message": "",
        "status": False
    }
    try:
        data = request.json
        if not data or "email" not in data or "password" not in data:
            return_request["messege"] = "Bad Request, Missing Data"
            return jsonify(return_request), 400

        hashed_email = ch.hash_email(data["email"])
        if does_user_exist_login(hashed_email, data["password"]):
            return_request["messege"] = "Successful Login"
            return jsonify(return_request), 201
        else:
            return_request["messege"] = "Incorrect email or password"
            return jsonify(return_request), 400
    except Exception as e:
        print(f"Error: {e}")
        return_request["messege"] = "Bad request"
            return jsonify(return_request), 500
    

@app.route('/coverletter', methods=['POST'])
def generate_coverletter():
    data = request.json
    cover_letter = CoverLetter(data)
    prompt = cover_letter.createCoverLetterPrompt()
    output = gpt_prompter(prompt)
    print(output)
    return

@app.route('/resume', method=['POST'])
def generate_resume():

    return