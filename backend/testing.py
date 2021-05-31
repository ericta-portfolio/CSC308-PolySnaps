import unittest
from flask import json
import flask_unittest
from app import app
import random
import string
import pytest


class TestStringMethods(unittest.TestCase):
    user_id = None

    def pytest_namespace():
        return {'user_id': "", 'user_email': "", 'user_pwd': ""}

    def test1_add_user(self):
        tester = app.test_client(self)
        letters = string.ascii_lowercase
        email = ''.join(random.choice(letters)
                        for i in range(10)) + "@calpoly.edu"
        pytest.user_email = email
        pytest.user_pwd = "123"
        response = tester.post('/newUser', json={
            "email": email,
            "password": "123",
            "password2": "123",
            "gender": "Male",
            "last": "User",
            "first": "Test",
            "date": "1999-08-17T20:50:30.000Z"
        }, content_type='application/json',
            follow_redirects=True)
        pytest.user_id = str(response.data.decode('UTF-8'))
        self.assertEqual(response.status_code, 201)

    def test1_add_user_fail1(self):
        tester = app.test_client(self)
        response = tester.post('/newUser', json={}, content_type='application/json',
                               follow_redirects=True)
        self.assertEqual(response.status_code, 400)

    def test1_add_user_fail2(self):
        tester = app.test_client(self)
        email = pytest.user_email
        response = tester.post('/newUser', json={
            "email": email,
            "password": "123",
            "password2": "123",
            "gender": "Male",
            "last": "User",
            "first": "Test",
            "date": "1999-08-17T20:50:30.000Z"
        }, content_type='application/json', follow_redirects=True)
        self.assertEqual(response.status_code, 400)

    def test1_profile_user(self):
        tester = app.test_client(self)
        id = pytest.user_id
        response = tester.put('/profileUser/' + str(id), json={"_id": id,
                                                               "friendship": [
                                                                   "Men",
                                                                   "Women"
                                                               ],
                                                               "gender": "Male",
                                                               "hobbies": [
                                                                   "Beachgoing"
                                                               ],
                                                               "major": "Business",
                                                               "partying": [
                                                                   "Designer"
                                                               ],
                                                               "personality": "Extrovert",
                                                               "romance": [
                                                                   "Women"
                                                               ],
                                                               "spirituality": "Hindu"}, content_type='application/json',
                              follow_redirects=True)
        self.assertEqual(response.status_code, 201)

    def test1_profile_user_fail(self):
        tester = app.test_client(self)
        id = "0"
        response = tester.put('/profileUser/' + id, json={"_id": id,
                                                          "friendship": [
                                                              "Men",
                                                              "Women"
                                                          ],
                                                          "gender": "Male",
                                                          "hobbies": [
                                                              "Beachgoing"
                                                          ],
                                                          "major": "Business",
                                                          "partying": [
                                                              "Designer"
                                                          ],
                                                          "personality": "Extrovert",
                                                          "romance": [
                                                              "Women"
                                                          ],
                                                          "spirituality": "Hindu"}, content_type='application/json',
                              follow_redirects=True)
        self.assertEqual(response.status_code, 404)

    def test0_smoke(self):
        tester = app.test_client(self)
        response = tester.get('/test')
        self.assertEqual(response.data.decode(
            'UTF-8'), "App is working perfectly")

    def test9_smoke(self):
        tester = app.test_client(self)
        response = tester.get('/test')
        self.assertEqual(response.data.decode(
            'UTF-8'), "App is working perfectly")

    def test3_get_user(self):
        tester = app.test_client(self)
        response = tester.get('retrieve_all')
        id = pytest.user_id
        response = tester.get('/getUser/' + id)
        self.assertEqual(response.status_code, 200)

    def test3_get_user_fail1(self):
        tester = app.test_client(self)
        id = "0"
        response = tester.get('/getUser/' + id)
        self.assertEqual(response.status_code, 400)

    def test3_get_user_fail2(self):
        tester = app.test_client(self)
        id = "123456789012345678901234"
        response = tester.get('/getUser/' + id)
        self.assertEqual(response.status_code, 404)

    def test3_get_matches(self):
        tester = app.test_client(self)
        id = pytest.user_id
        response = tester.post('/matches', json={"id": id}, content_type='application/json',
                               follow_redirects=True)
        self.assertEqual(response.status_code, 200)

    def test3_get_matches_fail1(self):
        tester = app.test_client(self)
        id = "0"
        response = tester.post('/matches', json={"id": id}, content_type='application/json',
                               follow_redirects=True)
        self.assertEqual(response.status_code, 400)

    def test3_get_matches_fail2(self):
        tester = app.test_client(self)
        id = "123456789012345678901234"
        response = tester.post('/matches', json={"id": id}, content_type='application/json',
                               follow_redirects=True)
        self.assertEqual(response.status_code, 404)

    def test3_check_user(self):
        tester = app.test_client(self)
        email = pytest.user_email
        pwd = pytest.user_pwd
        response = tester.post('/users', json={"email": email, "password": pwd},
                               content_type='application/json', follow_redirects=True)
        self.assertEqual(response.status_code, 200)

    def test3_check_user_fail1(self):
        tester = app.test_client(self)
        response = tester.post('/users', json={}, content_type='application/json',
                               follow_redirects=True)
        self.assertEqual(response.status_code, 400)

    def test3_check_user_fail2(self):
        tester = app.test_client(self)
        email = pytest.user_email
        pwd = "111"
        response = tester.post('/users', json={"email": email, "password": pwd},
                               content_type='application/json', follow_redirects=True)
        self.assertEqual(response.status_code, 404)

    def test3_reject_user1(self):
        tester = app.test_client(self)
        id = pytest.user_id
        response = tester.post('/rejectMatch/' + id, json={
                               "match": "123456789012345678901234"}, content_type='application/json', follow_redirects=True)
        self.assertEqual(response.status_code, 201)

    def test3_reject_user2(self):
        tester = app.test_client(self)
        id = pytest.user_id
        response = tester.post('/rejectMatch/' + id, json={
                               "match": "123456789012345678901235"}, content_type='application/json', follow_redirects=True)
        self.assertEqual(response.status_code, 201)

    def test3_reject_user_fail(self):
        tester = app.test_client(self)
        id = pytest.user_id
        response = tester.post(
            '/rejectMatch/' + id, json={"match": "0"}, content_type='application/json', follow_redirects=True)
        self.assertEqual(response.status_code, 400)

    def test3_accept_user1(self):
        tester = app.test_client(self)
        id = pytest.user_id
        response = tester.post('/acceptMatch/' + id, json={
                               "match": "123456789012345678901234"}, content_type='application/json', follow_redirects=True)
        self.assertEqual(response.status_code, 201)

    def test3_accept_user2(self):
        tester = app.test_client(self)
        id = pytest.user_id
        response = tester.post('/acceptMatch/' + id, json={
                               "match": "123456789012345678901235"}, content_type='application/json', follow_redirects=True)
        self.assertEqual(response.status_code, 201)

    def test3_accept_user_fail(self):
        tester = app.test_client(self)
        id = pytest.user_id
        response = tester.post(
            '/acceptMatch/' + id, json={"match": "0"}, content_type='application/json', follow_redirects=True)
        self.assertEqual(response.status_code, 400)

    def test2_get_accepted(self):
        tester = app.test_client(self)
        id = pytest.user_id
        response = tester.get('/getAccepted/' + id)
        self.assertEqual(response.status_code, 200)

    def test4_get_accepted(self):
        tester = app.test_client(self)
        id = pytest.user_id
        response = tester.get('/getAccepted/' + id)
        self.assertEqual(response.status_code, 200)

    def test4_get_accepted_fail(self):
        tester = app.test_client(self)
        id = "0"
        response = tester.get('/getAccepted/' + id)
        self.assertEqual(response.status_code, 400)

class ImageObj:
    file = None
    filename = None

    def __init__(self, file, filename):
        self.file = file
        self.filename = filename


if __name__ == '__main__':
    unittest.main()
