from flask import Flask
from flask_pymongo import PyMongo
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask import jsonify, request
from flask_cors import CORS
from compareProfiles import compareProfiles

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb+srv://polysnaps:cpw2021@cluster0.2oaoq.mongodb.net/mydatabase?retryWrites=true&w=majority"
app.config['CORS_HEADERS'] = 'Content-Type'
#CORS stands for Cross Origin Requests.
CORS(app) #Here we'll allow requests coming from any domain.
# Not recommended for production environment.

mongo = PyMongo(app) #initializing the app variable

## Configuring collection name we are going to work with
## db_operations = mongo.db.<COLLECTION_NAME>
db_operations = mongo.db.newUsers
db_operations2 = mongo.db.profiles

CACHE = None

#All the routings in our app will be mentioned here.
@app.route('/test')
def test():
    return "App is working perfectly"

@app.route('/profileUser/<id>', methods=['PUT'])
def add_info_users(id):
    if request.method == 'PUT':
        _id = id
        _json = request.get_json()
        _personality = _json['personality']
        _romance = _json['romance']
        _friendship = _json['friendship']
        _hobbies = _json['hobbies']
        _spirituality = _json['spirituality']
        _partying = _json['partying']
        _major = _json['major']
        db_operations.update_one({
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
                        'partying': _partying,
                        'major': _major
                    }
                }
        )
        user = db_operations.find_one({
            '_id': ObjectId(_id)
        })
        user = stringify_userid(user)
        return user["_id"]
    return not_found()

@app.route('/newUser', methods=['GET','POST'])
def get_users():
    if request.method == 'GET':
        users = db_operations.find()
        users = map(stringify_userid, users)
        return dumps(users)
    if request.method == 'POST':
        _json = request.get_json()
        _email = _json['email']
        _password = _json['password']
        _gender = _json['gender']
        _first = _json['first']
        _last = _json['last']
        _date = _json['date']
#         _hashed_password = generate_password_hash(_password)
        db_operations.insert({
            'email': _email,
            'password': _password,
            'gender': _gender,
            'first': _first,
            'last': _last,
            'date': _date
        })
        user = db_operations.find_one({
            'email': _email,
            'password': _password
        })
        user = stringify_userid(user)
        return user["_id"], 200
    return not_found()
    
@app.route('/matches', methods=['POST'])
def get_matches():
    _json = request.get_json()
    _id = _json['id']
    users = list(db_operations.find())
    users = list(filter(lambda x: "romance" in x.keys(), users))
    user = db_operations.find_one({
        '_id': ObjectId(_id)
    })
    users = list(map(lambda x: get_scores(x, user), users))
    users = list(filter(lambda x: x["score"] > 0 and x["_id"] != ObjectId(_id), users))
    return dumps(users), 200

@app.route('/users', methods=['POST'])
def check_user():
    _json = request.get_json()
    _email = _json['email']
    _password = _json['password']
    if (_email and _password):
        user = db_operations.find_one({
            'email': _email,
            'password': _password
        })
        if user:
            user = stringify_userid(user)
            return user["_id"], 200
        else:
            return not_found()
            
@app.route('/getUser', methods=['POST'])
def get_user():
    _json = request.get_json()
    _id = _json["id"]
    user = db_operations.find_one({
        '_id': ObjectId(_id)
    })
    user = stringify_userid(user)
    user["password"] = None
    return user, 200

@app.errorhandler(404)
def not_found(error=None):
    message={
        'status': 404,
        'message': 'Error! Try Again! ' + request.url
    }
    resp = jsonify(message)
    resp.status_code = 404
    return resp
    
def stringify_userid(user):
    user["_id"] = str(user["_id"])
    return user
    
def get_scores(x, user):
    user["score"] = compareProfiles(x, user)
    user["password"] = None
    return user

if __name__ == "__main__":
    app.run(debug=True)
