from flask import Flask, jsonify
from flask_pymongo import PyMongo  # Correct import

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/SENG401BRUHDB"
mongo = PyMongo(app)


@app.route("/")
def home_page():
    users = list(mongo.db.users.find({}, {"_id": 0}))  # Convert cursor to list and exclude ObjectId
    return jsonify(users)

if __name__ == '__main__':
    app.run(debug=True)
