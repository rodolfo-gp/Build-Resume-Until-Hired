from flask_cors import CORS
import cryptographic_helpers as ch
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
import os

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

@app.route('/Login', methods=['POST'])
def login():
    try:
        data = request.json
        if not data or "email" not in data or "password" not in data:
            return "Bad Request, Missing Data", 400
        
        hashed_email = ch.hash_email(data["email"])
        if does_user_exist_login(hashed_email, data["password"]):
            return "Successful Login", 201
        else:
            return "Incorrect email or password", 401
    except Exception as e:
        print(f"Error: {e}")
        return "Bad Request", 500
