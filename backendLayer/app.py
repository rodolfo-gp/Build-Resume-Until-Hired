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
            user_cvs_list = list(mongo.db.user_cvs.find({"email": hashed_email}, {"_id":0,"email":0, "doc_body":0}))
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

@app.route('/cv/user', methods=['POST'])
def get_specific_user_document():
    return_request = {
        "message": "No document found",
        "status": False,
        "document": {}
    }
    required_fields = ["email", "password", "doc_id"]
    
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
        
        #Insert get user document operation
        try:
            doc_id = int(data["doc_id"])  

            document_found = mongo.db.user_cvs.find_one(
                {"email": hashed_email, "id": doc_id},  # Query doc_id as an integer
                {"_id": 0, "email": 0}  # Exclude _id and email fields
            )

            if document_found:
                return_request["message"] = "Document found"
                print(document_found)
                return_request["status"] = True
                return_request["document"] = document_found
                return jsonify(return_request), 200
            else:
                return jsonify(return_request), 400
            
        except Exception as e:
            print(f"Database Error: {e}")
            return_request["message"] = "Database Error: " + e
            return jsonify(return_request), 501
          
          
    except Exception as e:
        print(f"Error: {e}")
        return_request["message"] = e
        return jsonify(return_request), 500
    
@app.route('/cv/user', methods=['DELETE'])
def delete_user_document():
    return_request = {
        "message": "No document found",
        "status": False
    }
    required_fields = ["email", "password", "doc_id"]
    
    try:
        # Check missing fields
        data = request.json
        if check_missing_or_blank_fields(data, required_fields):
            return_request["message"] = "Bad Request, Missing required fields"
            return jsonify(return_request), 400
        
        # Validate user credentials
        hashed_email = ch.hash_email(data["email"])
        if not valid_credentials(hashed_email, data["password"]):
            return_request["message"] = "Invalid user credentials"
            return jsonify(return_request), 400
        
        try:
            doc_id = int(data["doc_id"])
            
            # Attempt to delete the document
            delete_result = mongo.db.user_cvs.delete_one({"email": hashed_email, "id": doc_id})

            if delete_result.deleted_count > 0:
                return_request["message"] = "Document deleted successfully"
                return_request["status"] = True
                return jsonify(return_request), 200
            else:
                return_request["message"] = "Document not found"
                return jsonify(return_request), 404  
            
        except Exception as e:
            print(f"Database Error: {e}")
            return_request["message"] = f"Database Error: {str(e)}"
            return jsonify(return_request), 500
          
    except Exception as e:
        print(f"Error: {e}")
        return_request["message"] = str(e)
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
        return_request["doc_body"] = output.replace("\n", "\\n ")
        return_request["latex"] = cover_letter.latex
        return jsonify(return_request), 200
    except Exception as e:
        print(f"Error: {e}")
        return_request["doc_body"] = "Bad request"
        return jsonify(return_request), 500


@app.route('/resume', methods=['POST'])
def generate_resume():
    return_request = {
        "doc_title": datetime.datetime.now(),
        "doc_body": "",
        "latex" : False
    }
    try:
        data = request.get_json()
        cover_letter = Resume(json.dumps(data))
        prompt = cover_letter.createResumeLetterPrompt()
        output = gpt_prompter(prompt)
        return_request["doc_body"] = output.replace("\n", "\\n ")
        return_request["latex"] = cover_letter.latex
        return jsonify(return_request), 200
    except Exception as e:
        print(f"Error: {e}")
        return_request["doc_body"] = "Bad request"
        return jsonify(return_request), 500