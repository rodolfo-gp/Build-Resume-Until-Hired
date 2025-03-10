import cryptographic_helpers as ch
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo 



app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/SENG401BRUHDB"
mongo = PyMongo(app)


@app.route("/")
def test():
    users = list(mongo.db.users.find({}, {"_id": 0}))  # Convert cursor to list and exclude ObjectId
    return jsonify(users)

@app.route('/signup', methods=['POST'])
def signup():
    
    try:
        data = request.json #recieves plain text data
        if ("email" not in data and not data["email"]) or ("password" not in data and not data["password"]):
            return "Bad Request, Missing Data", 400
               
        hashed_email = ch.hash_email(data["email"])
        
        if not does_user_exist(hashed_email):
            #create new user
            hashed_password = ch.hash_password(data["password"])
            newUser = {
                "email": hashed_email,
                "password": hashed_password
            }
            
            try: #insert new user into db
                mongo.db.users.insert_one(newUser)
                return "User Created Succesfully", 201
            except:
                return "Database Insertion Error", 501
                
        else:
            return "User with that email already exists", 402
            
    except: #if the json request is broken in any way or wrong content type then request is bad
        return "Bad Request", 500

def does_user_exist(email):
    query = mongo.db.users.find_one({"email": email}, {"_id": 0})
    if query:
        return True
    else:
        return False

def does_user_exist_login(hashed_email, password_plain_text):
    user = mongo.db.users.find_one({"email": hashed_email}, {"_id": 0})
    if user:
        return ch.compare_passwords(user["password"], password_plain_text) #is passwords are the same then succesful login
    else:
        return False
       
@app.route('/Login', methods=['POST'])
def login():
    try:
        data = request.json #recieves plain text data
        if ("email" not in data and not data["email"]) or ("password" not in data and not data["password"]):
            return "Bad Request, Missing Data", 400
               
        hashed_email = ch.hash_email(data["email"])
        
        if does_user_exist_login(hashed_email, data["password"]):
            
            return "Succesfull Login", 201
                
        else:
            return "Incorrect email or password", 401
            
    except: #if the json request is broken in any way or wrong content type then request is bad
        return "Bad Request", 500
        
        
    return "hello"   
if __name__ == '__main__':
    app.run(debug=True)
