from flask import Flask
from flask_pymongo import PyMongo
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask import jsonify, request, url_for
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
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

#All the routings in our app will be mentioned here.
@app.route('/test')
def test():
    return "App is working perfectly"

@app.route('/profileUser/<id>', methods=['PUT'])
def add_info_users(id):
    _id = id
    _json = request.get_json()
    try:
        _personality = _json['personality']
        _romance = _json['romance']
        _friendship = _json['friendship']
        _hobbies = _json['hobbies']
        _spirituality = _json['spirituality']
        _partying = _json['partying']
        _major = _json['major']
        _id = ObjectId(_id)
    except :
        return not_found()
    db_operations.update_one({
        '_id': _id
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
    return user["_id"], 201

@app.route('/newUser', methods=['GET','POST'])
def get_users():
    if request.method == 'GET':
        users = db_operations.find()
        # users = map(stringify_userid, users)
        return dumps(users), 200
    else:
        _json = request.get_json()
        try:
            _email = _json['email']
            _password = _json['password']
            _gender = _json['gender']
            _first = _json['first']
            _last = _json['last']
            _date = _json['date']
        except:
            return not_found()
        _hashed_password = generate_password_hash(_password)
        
        db_operations.insert({
            'email': _email,
            'password': _hashed_password,
            'gender': _gender,
            'first': _first,
            'last': _last,
            'date': _date
        })
        user = db_operations.find_one({
            'email': _email,
            'password': _hashed_password
        })
        user = stringify_userid(user)
        return user["_id"], 201
    
@app.route('/matches', methods=['POST'])
def get_matches():
    _json = request.get_json()
    _id = _json['id']
    users = list(db_operations.find())
    if users:
        users = list(map(stringify_userid, users))
        users = list(filter(lambda x: "romance" in x.keys(), users))
    user = db_operations.find_one({
        '_id': ObjectId(_id)
    })
    if user:
        if "romance" in user.keys():
            users = list(filter(lambda x: "romance" in x.keys(), users))
            users = list(map(lambda x: get_scores(x, user), users))
            users = list(filter(lambda x: x["score"] >= 0 and str(x["_id"]) != _id, users))
            users = sorted(users, key=lambda k: k["score"], reverse=True)
            return dumps(users), 200
    return "no profile info", 404

@app.route('/users', methods=['POST'])
def check_user():
    if request.method == 'POST':
        _json = request.get_json()
        _email = _json['email']
        _password = _json['password']
        get_info = db_operations.find_one({
                'email': _email
        })
        if (get_info):
            _stored_password = get_info['password']
            if (check_password_hash(_stored_password, _password)):
                if get_info:
                    user = stringify_userid(get_info)
                    return user["_id"], 200
            else:
                print("Wrong Password!")
                return not_found()
    return not_found()
            
@app.route('/getUser/<id>', methods=['GET'])
def get_user(id):
    try:
        id = ObjectId(id)
    except:
        return id, 400
    user = db_operations.find_one({
        '_id': ObjectId(id)
    })
    if user:
        user = stringify_userid(user)
        user["password"] = None
        return user, 200
    return not_found()

@app.route('/profile_pic_upload/<id>', methods=['POST', 'PUT'])
def upload(id):
    if 'image' in request.files:
        #create a file object
        image = request.files['image']
        _id = id
        #save_file params (file_name, "actual file data (binary data)")
        user = db_operations.find_one({
            '_id': ObjectId(_id)
        })
        if user and request.method == 'PUT':
            mongo.save_file(image.filename, image)
            db_operations.update_one({
                '_id': ObjectId(
                    _id['$oid']) if '$oid' in _id else ObjectId(_id)
                    },
                    {
                        '$set' : {
                            'image' : image.filename
                    }
            }
        )
        resp = jsonify("picture added and user updated successfully!")
        resp.status_code = 201
        return resp
    return not_found()

#send file
@app.route('/file/<filename>')
def file(filename):
    return mongo.send_file(filename)

@app.route('/profile_pic_retrieve/<id>', methods=['GET'])
def profile(id):
    if request.method == 'GET':
        _id = id
        user = db_operations.find_one({
                '_id': ObjectId(_id)
        })
        if user:
            filename= user['image']
            return ("http://localhost:5000/file/" + str(filename))
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
    
def stringify_userid(user):
    user["_id"] = str(user["_id"])
    user["password"] = None
    return user
    
def get_scores(user, match):
    user["score"] = compareProfiles(user, match)
    return user

if __name__ == "__main__":
    app.run(debug=True)
