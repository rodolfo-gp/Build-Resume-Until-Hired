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
       
    
if __name__ == '__main__':
    app.run(debug=True)
