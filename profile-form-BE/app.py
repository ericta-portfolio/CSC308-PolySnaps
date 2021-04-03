from flask import Flask
from flask_pymongo import PyMongo
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask import jsonify, request
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

#CORS stands for Cross Origin Requests.
CORS(app) #Here we'll allow requests coming from any domain. Not recommended for production environment.

app.secret_key = "secretkey"
app.config["MONGO_URI"] = "mongodb+srv://polysnaps:cpw2021@cluster0.2oaoq.mongodb.net/mydatabase?retryWrites=true&w=majority"
mongo = PyMongo(app) #initializing the app variable

#Configuring collection name we are going to work with
#db_operations = mongo.db.<COLLECTION_NAME>
db_operations = mongo.db.users

#All the routings in our app will be mentioned here.
@app.route('/test')
def test():
    return "App is working perfectly"

@app.route('/user', methods=['GET', 'POST'])
def get_users():
    _json = request.get_json()
    _name = _json['name']
    _major = _json['major']
    _hometown = _json['hometown']
    _hobbies = _json['hobbies']
    _gender = _json['gender']
    _year = _json['year']
    if _name and _major and _hometown and _gender and _year and request.method == 'GET':
        resp = jsonify("User found successfully!")
        resp.status_code = 200
        return resp
    elif _name and _major and _hometown and _gender and _year and request.method == 'POST':
        id = db_operations.insert({
            'name': _name,
            'major': _major,
            'hometown': _hometown,
            'hobbies': _hobbies,
            'gender': _gender,
            'year': _year
        })
        resp = jsonify("User Added Successfully")
        resp.status_code = 200
        return resp
    else:
        return not_found()

@app.route('/user/<id>', methods=['GET', 'DELETE'])
def get_user():
    if request.method == 'GET':
        user = db_operations.find_one({
            '_id': ObjectId(id)
        })
        if user:
            resp = dumps(user)
            return resp
        else: 
            return not_found()
    elif request.method == 'DELETE':
        oprt = db_operations.delete_one({
        '_id': ObjectId(id)
        })
        if oprt:
            resp = jsonify("User deleted successfully!")
            resp.status_code = 200
            return resp
        else: 
            return not_found()        


# @app.route('/add', methods=['POST'])
# def add_user():
#     _json = request.json
#     _name = _json['name']
#     _email = _json['email']
#     _password = _json['pwd']

#     if _name and _email and _password and request.method == 'POST':
#         _hashed_password =  generate_password_hash(_password)
#         id = db_operations.insert({
#             'name': _name,
#             'email': _email,
#             'password':_hashed_password
#         })
    #     resp = jsonify("User Added Successfully")
    #     resp.status_code = 200

    #     return resp
    # else:
    #     return not_found()

# @app.route('/users')
# def users():
#     users = db_operations.find()
#     resp = dumps(users)
#     return resp

# @app.route('/users/<id>')
# def user(id):
#     user = db_operations.find_one({
#         '_id': ObjectId(id)
#     })
#     if user:
#         resp = dumps(user)
#         return resp
#     else: 
#         return not_found()

# @app.route('/delete/<id>', methods=['DELETE'])
# def delete_user(id):
#     oprt = db_operations.delete_one({
#         '_id': ObjectId(id)
#     })
#     if oprt:
#         resp = jsonify("User deleted successfully!")
#         resp.status_code = 200
#         return resp
#     else: 
#         return not_found()

@app.route('/update/<id>', methods=['PUT'])
def update_user(id):
    _id = id
    _json = request.json
    _name = _json['name']
    _email = _json['email']
    _password = _json['password']

    if _name and _email and _password and _id and request.method == 'PUT':
        _hashed_password = generate_password_hash(_password)
        oprt = db_operations.update_one({
            '_id': ObjectId(
                _id['$oid']) if '$oid' in _id else ObjectId(_id)
                },
                {
                    '$set' : {
                        'name': _name,
                        'email': _email,
                        'password': _hashed_password
                    }
                }
            )
        resp = jsonify("User updated successfully!")
        resp.status_code = 200
        return resp
    else: 
        return not_found()


@app.errorhandler(404)
def not_found(error=None):
    message={
        'status': 404,
        'message': 'Error! Try Again! ' + request.url
    }
    resp = jsonify(message)
    resp.status_code = 404
    return resp

if __name__ == "__main__":
    app.run(debug=True)
