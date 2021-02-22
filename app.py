from flask import Flask, jsonify, request, redirect
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://polysnaps:cpw2021@cluster0.2oaoq.mongodb.net/mydatabase?retryWrites=true&w=majority"
mongo = PyMongo(app)

#All the routings in our app will be mentioned here.
@app.route('/test')
def test():
    return "App is working perfectly"

#Configuring collection name we are going to work with
#db_operations = mongo.db.<COLLECTION_NAME>
db_operations = mongo.db.users

#CRUD Operations

#Create

@app.route('/create')
def create():
    new_user = {'Name' : 'Leticia', 'Age' : 15}
    db_operations.insert_one(new_user)
    result = {'result' : 'Created successfully'}
    return result

@app.route('/create-many')
def create_many():
    new_user_1 = {'Name' : 'Polina', 'Age' : 10}
    new_user_2 = {'Name' : 'Eric', 'Age' : 20}
    new_user_3 = {'Name' : 'Andy', 'Age' : 30}
    new_users = [new_user_1, new_user_2, new_user_3]
    db_operations.insert_many(new_users)
    result = {'result' : 'Created successfully'}
    return result

#Read
@app.route('/read')
def read():
    users = db_operations.find()
    output = [{'Name' : user['Name'], 'Age' : user['Age']} for user in users]
    #print(output)
    return jsonify(output)

@app.route('/read-with-filter')
def read_with_filter():
    filt = {'Name' : 'Leticia'}
    users = db_operations.find(filt)
    output = [{'Name' : user['Name'], 'Age' : user['Age']} for user in users]
    #print(output)
    return jsonify(output)

@app.route('/read-one')
def read_one():
    filt = {'Name' : 'Polina'}
    user = db_operations.find_one(filt)
    output = {'Name' : user['Name'], 'Age' : user['Age']}
    #print(output)
    return jsonify(output)

#Update

@app.route('/update')
def update():
    updated_user = {"$set": {'Age' : 30}}
    filt = {'Name' : 'Eric'}
    db_operations.update_one(filt, updated_user)
    result = {'result' : 'Updated successfully'}
    return result

@app.route('/update-many')
def update_many():
    updated_user = {"$set": {'Age' : 30}}
    filt = {'Name' : 'Bob'}
    db_operations.update_many(filt, updated_user)
    result = {'result' : 'Updated successfully'}
    return result

@app.route('/update-if-exist-or-insert')
def update_if_exist_or_insert():
    updated_user = {"$set": {'Age' : 30}}
    filt = {'Name' : 'Bob'}
    db_operations.update_one(filt, updated_user, upsert=True)
    result = {'result' : 'Done successfully'}
    return result

#Delete

@app.route('/delete')
def delete():
    filt = {'Name' : 'Leticia'}
    db_operations.delete_one(filt)
    result = {'result' : 'Deleted successfully'}
    return result

@app.route('/delete-many')
def delete_many():
    filt = {'Name' : 'Polina'}
    db_operations.delete_many(filt)
    result = {'result' : 'Deleted successfully'}
    return result

if __name__ == '__main__':
    app.run(debug=True)