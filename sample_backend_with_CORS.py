from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS
import string
import random

app = Flask(__name__)

#CORS stands for Cross Origin Requests.
CORS(app) #Here we'll allow requests coming from any domain. Not recommended for production environment.

users = {
    'users_list':
    [
        {
            'id': 'xyz789',
            'name': 'Charlie',
            'job': 'Janitor',
        },
        {
            'id': 'abc123',
            'name': 'Mac',
            'job': 'Bouncer',
        },
        {
            'id': 'ppp222',
            'name': 'Mac',
            'job': 'Professor',
        },
        {
            'id': 'yat999',
            'name': 'Dee',
            'job': 'Aspring actress',
        },
        {
            'id': 'zap555',
            'name': 'Dennis',
            'job': 'Bartender',
        }
    ]
}


@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/users', methods=['GET', 'POST'])
def get_users():
    if request.method == 'GET':
        search_username = request.args.get('name')
        search_job = request.args.get('job')
        if search_username and search_job :
            return find_users_by_name_job(search_username, search_job)  
        elif search_username :
            return find_users_by_name(search_username) 
        return users
    elif request.method == 'POST':
        userToAdd = request.get_json()
        userToAdd['id'] = generate_id()
        users['users_list'].append(userToAdd)
        resp = jsonify(userToAdd), 201
        #resp.status_code = 201 #another way to set the response http status code 
        return resp

@app.route('/users/<id>', methods=['GET', 'DELETE'])
def get_user(id):
    if id :
        for user in users['users_list']:
            if user['id'] == id:
                if request.method == 'GET':
                    return user
                elif request.method == 'DELETE':
                    users['users_list'].remove(user)
                    resp = jsonify(),204
                    return resp
        resp = jsonify({"Msg": "User not found with provided id."}), 404
        return resp
    return users

def find_users_by_name_job(name, job):
    subdict = {'users_list' : []}
    for user in users['users_list']:
        if user['name'] == name and user['job'] == job:
            subdict['users_list'].append(user)
    return subdict  


def find_users_by_name(name):
    subdict = {'users_list' : []}
    for user in users['users_list']:
        if user['name'] == name:
            subdict['users_list'].append(user)
    return subdict  

def generate_id():
    lettersAndDigits = string.ascii_letters + string.digits
    return ''.join((random.choice(lettersAndDigits) for i in range(6)))