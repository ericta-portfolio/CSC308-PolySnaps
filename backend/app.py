from flask import Flask
from flask_pymongo import PyMongo
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask import jsonify, request, url_for
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

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
        global CACHE
        CACHE = user
        resp = jsonify("User Added Successfully")
        resp.status_code = 201
        return resp
    return not_found()


@app.route('/newUser', methods=['GET', 'POST'])
def get_users():
    if request.method == 'GET':
        users = db_operations.find()
        # users = map(stringify_userid, users)
        return dumps(users)
    if request.method == 'POST':
        print("hello")
        _json = request.get_json()
        _email = _json['email']
        _password = _json['password']
        _gender = _json['gender']
        _first = _json['first']
        _last = _json['last']
        _date = _json['date']
        _hashed_password = generate_password_hash(_password)
        db_operations.insert({
            'email': _email,
            'password': _hashed_password,
            'gender': _gender,
            'first': _first,
            'last': _last,
            'date': _date
        })
        resp = jsonify("User Added Successfully")
        resp.status_code = 200
        return resp
    return not_found()

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
                global CACHE
                CACHE = get_info
                resp = jsonify("User found successfully!")
                # resp = dumps(user)
                resp.status_code = 200
                return resp
            else:
                print("Wrong Password!")
                return not_found()

@app.route('/cache', methods=['GET'])
def get_cache():
    print("this happened")
    global CACHE
    CACHE["_id"] = str(CACHE["_id"])
    return jsonify(CACHE), 200

@app.route('/upload/<id>', methods=['POST', 'PUT'])
def upload(id):
    if 'image' in request.files:
        print("inside upload")
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
        global CACHE
        #update cache
        CACHE = user
        resp = jsonify("picture added and user updated successfully!")
        resp.status_code = 201
        return resp
    return not_found()

#send file
@app.route('/file/<filename>')
def file(filename):
    return mongo.send_file(filename)

@app.route('/profile/<id>', methods=['GET'])
def profile(id):
    if request.method == 'GET':
        _id = id
        user = db_operations.find_one({
                '_id': ObjectId(_id)
        })
        if user:
            # resp = jsonify(url_for('file', filename= user['image']))
            filename= user['image']
            # resp = jsonify()
            # resp.status_code = 201
            return mongo.send_file(filename)
            # return f'''
            # <img src="{url_for('file', filename= user['image_name'])}">
            # '''
    return not_found()
    # return f'''
    #     <h1>{username}</h1>
    #     <img src="{url_for('file', filename= user['image_name'])}">
    # '''


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
