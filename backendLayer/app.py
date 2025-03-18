from flask_cors import CORS
import cryptographic_helpers as ch
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
import os
import json
import datetime

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
    return_request = {
        "message": "",
        "status": False
    }
    try:
        data = request.json
        if not data or "email" not in data or "password" not in data:

            return_request["message"] = "Bad Request, Missing Data"
            return jsonify(return_request), 400

        hashed_email = ch.hash_email(data["email"])

        if not does_user_exist(hashed_email):
            hashed_password = ch.hash_password(data["password"])
            newUser = {"email": hashed_email, "password": hashed_password}

            try:
                mongo.db.users.insert_one(newUser)
                return_request["message"] = "User Created Successfully"
                return_request["status"] = True
                return jsonify(return_request), 201

            except Exception as e:
                print(f"Database Error: {e}")
                return_request["message"] = "Database Insertion Error"
                return jsonify(return_request), 501
        else:
            return_request["message"] = "User with that email already exists"
            return jsonify(return_request), 400
    except Exception as e:
        print(f"Error: {e}")
        return_request["message"] = e
        return jsonify(return_request), 500

def does_user_exist(email):
    return mongo.db.users.find_one({"email": email}, {"_id": 0}) is not None

def does_user_exist_login(hashed_email, password_plain_text):
    user = mongo.db.users.find_one({"email": hashed_email}, {"_id": 0})
    return user and ch.compare_passwords(user["password"], password_plain_text)

@app.route('/login', methods=['POST'])
def login():
    return_request = {
        "message": "",
        "status": False
    }
    try:
        data = request.json
        if not data or "email" not in data or "password" not in data:
            return_request["message"] = "Bad Request, Missing Data"
            return jsonify(return_request), 400

        hashed_email = ch.hash_email(data["email"])
        if does_user_exist_login(hashed_email, data["password"]):
            return_request["message"] = "Successful Login"
            return_request["status"] = True
            return jsonify(return_request), 200
        else:
            return_request["message"] = "Incorrect email or password"
            return jsonify(return_request), 400
    except Exception as e:
        print(f"Error: {e}")
        return_request["message"] = "Bad request"
        return jsonify(return_request), 500


@app.route('/coverletter', methods=['POST'])
def generate_coverletter():
    return_request = {
        "doc_title": datetime.datetime.now(),
        "doc_body": "",
        "latex" : False
    }
    try:
        data = request.get_json()
        if data is None:
            return_request["doc_body"] = "Bad Request, Missing Data"
            return jsonify(return_request), 400

        cover_letter = CoverLetter(json.dumps(data))
        prompt = cover_letter.createCoverLetterPrompt()
        output = gpt_prompter(prompt)
        return_request["doc_body"] = output
        return_request["latex"] = cover_letter.latex
        return jsonify(return_request), 200
    except Exception as e:
        print(f"Error: {e}")
        return_request["doc_body"] = "Bad request"
        return jsonify(return_request), 500


@app.route('/resume', methods=['POST'])
def generate_resume():
    data = request.get_json()
    cover_letter = Resume(json.dumps(data))
    prompt = cover_letter.createResumeLetterPrompt()
    output = gpt_prompter(prompt)
    return output