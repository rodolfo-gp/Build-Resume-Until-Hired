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
    return_request = {
        "message": "",
        "status": False
    }
    required_fields = ["email", "password"]
    try:
        #Check missing fields
        data = request.json
        if check_missing_or_blank_fields(data, required_fields):
            return_request["message"] = "Bad Request, Missing required fields"
            return jsonify(return_request), 400
        
        #check user email isnt already used
        hashed_email = ch.hash_email(data["email"])    
        if does_user_exist(hashed_email):
            return_request["message"] = "User with that email already exists"
            return jsonify(return_request), 400
            
        #Insert new user operation
        hashed_password = ch.hash_password(data["password"])
        newUser = {"email": hashed_email, "password": hashed_password}
        try:
            mongo.db.users.insert_one(newUser)
            return_request["message"] = "User Created Successfully"
            return_request["status"] = True
            return jsonify(return_request), 
        
        except Exception as e:
            print(f"Database Error: {e}")
            return_request["message"] = "Database Error: " + e
            return jsonify(return_request), 501
        
    except Exception as e:
        print(f"Error: {e}")

        return_request["message"] = e
        return jsonify(return_request), 500


def does_user_exist(email):
    return mongo.db.users.find_one({"email": email}, {"_id": 0}) is not None

def valid_credentials(hashed_email, password_plain_text):
    user = mongo.db.users.find_one({"email": hashed_email}, {"_id": 0})
    return user and ch.compare_passwords(user["password"], password_plain_text)


@app.route('/login', methods=['POST'])
def login():
    return_request = {
        "message": "",
        "status": False
    }
    required_fields = ["email", "password"]
    try:
        #Check missing fields
        data = request.json
        if check_missing_or_blank_fields(data, required_fields):
            return_request["message"] = "Bad Request, Missing required fields"
            return jsonify(return_request), 400
        
        #validate credentials
        hashed_email = ch.hash_email(data["email"])
        if not valid_credentials(hashed_email, data["password"]):
            return_request["message"] = "Incorrect email or password"
            return jsonify(return_request), 400

            
        return_request["message"] = "Successful Login"
        return_request["status"] = True
        return jsonify(return_request), 200
    
    except Exception as e:
        print(f"Error: {e}")
        return_request["message"] = "Bad request"
        return jsonify(return_request), 500

def check_missing_or_blank_fields(data, required_fields):
    '''returns true if a field is missing or is blank in the data json given from request'''
    if any(field not in data or data.get(field) in ["", None] for field in required_fields):
        return True
    return False

@app.route('/cv', methods=['POST'])
def get_user_cvs():
    return_request = {
        "message": "",
        "status": False,
        "documents": []
    }
    required_fields = ["email", "password"]
    
    try:
        #Check missing fields and blank
        data = request.json
        if check_missing_or_blank_fields(data, required_fields):
            return_request["message"] = "Bad Request, Missing required fields"
            return jsonify(return_request), 400
        
        #validate user
        hashed_email = ch.hash_email(data["email"])
        if not valid_credentials(hashed_email, data["password"]):
            return_request["message"] = "Invalid user credentials"
            return jsonify(return_request), 400
        
        #get user document operation
        try:
            user_cvs_list = list(mongo.db.user_cvs.find({"email": hashed_email}, {"_id":0}))
            if user_cvs_list:
                
                return_request["message"] = "successfully retrived documents"
                return_request["status"] = True
                return_request["documents"] = user_cvs_list
            else:
                return_request["message"] = "No user documents"
                
            return jsonify(return_request), 200
        
        except Exception as e:
            print(f"Database Error: {e}")
            return_request["message"] = "Database Error: " + e
            return jsonify(return_request), 501
          
          
    except Exception as e:
        print(f"Error: {e}")
        return_request["message"] = e
        return jsonify(return_request), 500
    
@app.route('/cv/save', methods=['POST'])
def save_cv():
    return_request = {
        "message": "",
        "status": False
    }
    required_fields = ["email", "password", "latex", "doc_tittle", "doc_body"]
    
    try:
        #Check missing fields
        data = request.json
        if check_missing_or_blank_fields(data, required_fields):
            return_request["message"] = "Bad Request, Missing required fields"
            return jsonify(return_request), 400
        
        #validate user
        hashed_email = ch.hash_email(data["email"])
        if not valid_credentials(hashed_email, data["password"]):
            return_request["message"] = "Invalid user credentials"
            return jsonify(return_request), 400
        
        #Insert new user document operation
        hashed_password = ch.hash_password(data["password"])
        new_document = {
            "email": hashed_email, 
            "latex": data["latex"],
            "doc_tittle": data["doc_tittle"],
            "doc_body": data["doc_body"],
            "id": 0
            }
        try:
            document_count = mongo.db.user_cvs.count_documents({"email": hashed_email})
            new_document["id"] = document_count + 1
            mongo.db.user_cvs.insert_one(new_document)
            return_request["message"] = "New document created successfully"
            return_request["status"] = True
            return jsonify(return_request), 200
        
        except Exception as e:
            print(f"Database Error: {e}")
            return_request["message"] = "Database Error: " + e
            return jsonify(return_request), 501
          
          
    except Exception as e:
        print(f"Error: {e}")
        return_request["message"] = e
        return jsonify(return_request), 500
    
@app.route('/coverletter', methods=['POST'])
def generate_coverletter():
    data = request.json
    cover_letter = CoverLetter(data)
    prompt = cover_letter.createCoverLetterPrompt()
    output = gpt_prompter(prompt)
    print(output)
    return

@app.route('/resume', methods=['POST'])
def generate_resume():

    return