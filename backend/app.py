from flask import Flask
from flask_pymongo import PyMongo
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask import jsonify, request
from flask_cors import CORS

app = Flask(__name__)

#CORS stands for Cross Origin Requests.
CORS(app) #Here we'll allow requests coming from any domain. Not recommended for production environment.

app.config["MONGO_URI"] = "mongodb+srv://polysnaps:cpw2021@cluster0.2oaoq.mongodb.net/mydatabase?retryWrites=true&w=majority"
mongo = PyMongo(app) #initializing the app variable

#Configuring collection name we are going to work with
#db_operations = mongo.db.<COLLECTION_NAME>
db_operations = mongo.db.newUsers
db_operations2 = mongo.db.profiles

cache = None

#All the routings in our app will be mentioned here.
@app.route('/test')
def test():
    return "App is working perfectly"

@app.route('/profileUser/<id>', methods=['PUT'])
def add_info_users(id):
    # if _name and _major and _hometown and _gender and _year and request.method == 'GET':
    #     resp = jsonify("User found successfully!")
    #     resp.status_code = 200
    #     return resp
    # elif _name and _major and _hometown and _gender and _year and request.method == 'POST':
    if request.method == 'PUT':
        _id = id
        _json = request.get_json()
        _personality = _json['personality']
        _romance = _json['romance']
        _friendship = _json['friendship']
        _hobbies = _json['hobbies']
        _spirituality = _json['spirituality']
        _partying = _json['partying']
#        id = db_operations2.insert({
#            'personality': _personality,
#            'romance': _romance,
#            'friendship': _friendship,
#            'hobbies': _hobbies,
#            'spirituality': _spirituality,
#            'partying': _partying
#        })
        oprt = db_operations.update_one({
            '_id': ObjectId(
                _id['$oid']) if '$oid' in _id else ObjectId(_id)
                },
                {
                    '$set' : {
                        'personality': _personality,
                        'romance': _romance,
                        'friendship': _friendship,
                        'hobbies': _hobbies,
                        'spirituality': _spirituality,
                        'partying': _partying
                    }
                }
        )
        user = db_operations.find_one({
            '_id': ObjectId(_id)
        })
        global cache
        cache = user
        resp = jsonify("User Added Successfully")
        resp.status_code = 201
        return resp
    else:
        return not_found()

#@app.route('/update/<id>', methods=['PUT'])
#def update_user(id):
#    _id = id
#    _json = request.json
#    _name = _json['name']
#    _email = _json['email']
#    _password = _json['password']
#
#    if _name and _email and _password and _id and request.method == 'PUT':
#        _hashed_password = generate_password_hash(_password)
#        oprt = db_operations.update_one({
#            '_id': ObjectId(
#                _id['$oid']) if '$oid' in _id else ObjectId(_id)
#                },
#                {
#                    '$set' : {
#                        'name': _name,
#                        'email': _email,
#                        'password': _hashed_password
#                    }
#                }
#            )
#        resp = jsonify("User updated successfully!")
#        resp.status_code = 200
#        return resp
#    else:
#        return not_found()

@app.route('/newUser', methods=['GET', 'POST'])
def get_users():
    _json = request.get_json()
    _email = _json['email']
    _password = _json['password']
    _gender = _json['gender']
    _first = _json['first']
    _last = _json['last']
    _date = _json['date']
    if _email and _password and _gender and _first and _last and _date and request.method == 'GET':
        resp = jsonify("User found successfully!")
        resp.status_code = 200
        return resp
    elif _email and _password and _gender and _first and _last and _date and request.method == 'POST':
        id = db_operations.insert({
            'email': _email,
            'password': _password,
            'gender': _gender,
            'first': _first,
            'last': _last,
            'date': _date
        })
        resp = jsonify("User Added Successfully")
        resp.status_code = 200
        return resp
    else:
        return not_found()
    
@app.route('/users', methods=['POST'])
def check_user():
    if(request.method == 'POST'):
        _json = request.get_json()
        _email = _json['email']
        _password = _json['password']
        if (_email and _password):
            user = db_operations.find_one({
                'email': _email,
                'password': _password
            })
            if user:
                global cache
                cache = user
                resp = jsonify("User found successfully!")
                # resp = dumps(user)
                resp.status_code = 200
                return resp
            else:
                return not_found()
                
#@app.route('/user/<id>', methods=['GET', 'DELETE'])
#def get_user():
#    if request.method == 'GET':
#        user = db_operations.find_one({
#            '_id': ObjectId(id)
#        })
#        if user:
#            cache = user
#            resp = jsonify("User found successfully!")
#            resp.status_code = 200
#            return resp
#        else:
#            return not_found()
#    elif request.method == 'DELETE':
#        oprt = db_operations.delete_one({
#        '_id': ObjectId(id)
#        })
#        if oprt:
#            resp = jsonify("User deleted successfully!")
#            resp.status_code = 200
#            return resp
#        else:
#            return not_found()

@app.route('/cache', methods=['GET'])
def get_cache():
    print("this happened")
    global cache
    cache["_id"] = str(cache["_id"])
    return jsonify(cache), 200
#    global cache
#    if cache is not None:
#        return cache
#    return jsonify({"error":"recipe not found"}), 404

@app.errorhandler(404)
def not_found(error=None):
    message={
        'status': 404,
        'message': 'Error! Try Again! ' + request.url
    }
    resp = jsonify(message)
    resp.status_code = 404
    return resp

#def filter(user):
#

if __name__ == "__main__":
    app.run(debug=True)

