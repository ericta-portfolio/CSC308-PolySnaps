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
        return {'user_id': "", 'user_email':"", 'user_pwd':""}

    def test1_add_user(self):
        tester = app.test_client(self)
        letters = string.ascii_lowercase
        email = ''.join(random.choice(letters) for i in range(10)) + "@calpoly.edu"
        pytest.user_email = email
        pytest.user_pwd = "123"
        response = tester.post('/newUser',json={
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
        self.assertEqual(response.status_code,201)

    def test1_add_user_fail(self):
        tester = app.test_client(self)
        response = tester.post('/newUser',json={}, content_type='application/json',
                              follow_redirects=True)
        self.assertEqual(response.status_code,404)
        
    def test1_profile_user(self):
        tester = app.test_client(self)
        id = pytest.user_id
        response = tester.put('/profileUser/' + str(id), json=
            {"_id": id,
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
        response = tester.put('/profileUser/' + id, json=
            {"_id": id,
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
        
    def test1_smoke(self):
        tester = app.test_client(self)
        response = tester.get('/test')
        self.assertEqual(response.data.decode('UTF-8'),"App is working perfectly")
        
    def test2_get_user(self):
        tester = app.test_client(self)
        response = tester.get('newUser')
        id = pytest.user_id
        response = tester.get('/getUser/' + id)
        self.assertEqual(response.status_code,200)
        
    def test2_get_user_fail1(self):
        tester = app.test_client(self)
        id = "0"
        response = tester.get('/getUser/' + id)
        self.assertEqual(response.status_code,400)
        
    def test2_get_user_fail2(self):
        tester = app.test_client(self)
        id = "123456789012345678901234"
        response = tester.get('/getUser/' + id)
        self.assertEqual(response.status_code,404)
        
    def test2_get_matches(self):
        tester = app.test_client(self)
        id = pytest.user_id
        response = tester.post('/matches', json={"id":id}, content_type='application/json',
            follow_redirects=True)
        self.assertEqual(response.status_code,200)
        
    def test2_get_matches_fail1(self):
        tester = app.test_client(self)
        id = "0"
        response = tester.post('/matches', json={"id":id}, content_type='application/json',
            follow_redirects=True)
        self.assertEqual(response.status_code,400)

    def test2_get_matches_fail2(self):
        tester = app.test_client(self)
        id = "123456789012345678901234"
        response = tester.post('/matches', json={"id":id}, content_type='application/json',
            follow_redirects=True)
        self.assertEqual(response.status_code,404)
        
    def test2_check_user(self):
        tester = app.test_client(self)
        email = pytest.user_email
        pwd = pytest.user_pwd
        response = tester.post('/users', json={"email":email,"password":pwd}, content_type='application/json', follow_redirects=True)
        self.assertEqual(response.status_code,200)
        
    def test2_check_user_fail1(self):
        tester = app.test_client(self)
        response = tester.post('/users', json={}, content_type='application/json',
            follow_redirects=True)
        self.assertEqual(response.status_code,400)

    def test2_check_user_fail2(self):
        tester = app.test_client(self)
        email = pytest.user_email
        pwd = "111"
        response = tester.post('/users', json={"email":email,"password":pwd}, content_type='application/json', follow_redirects=True)
        self.assertEqual(response.status_code,404)
        
    def test2_picture_upload(self):
        tester = app.test_client(self)
        id = pytest.user_id
        image = open("./prof.png")
        package = ImageObj(image, "testing")
        response = tester.put('/profile_pic_upload/' + id, data={"image":package}, follow_redirects=True)
        self.assertEqual(response.status_code,201)
        
    
        
#    # test for printing recipes list
#    def test2_show_recipes(self):
#        tester = app.test_client(self)
#        response = tester.get('/recipes')
#        self.assertEqual(response.status_code,200)
#
#    # Testing if get returns the right page
#    # need to post the data first
#    def test2_find_recipe(self):
#        tester = app.test_client(self)
#        response = tester.get('/recipes/Roasted%20Asparagus')
#        self.assertEqual(response.status_code, 200)
#        json_response = json.loads(response.get_data(as_text=True))
#
#    def test2_get_recipe_cached(self):
#        tester = app.test_client(self)
#        response = tester.get('/recipe')
#        self.assertEqual(response.status_code, 200)
#
#    # Testing proper error code
#    def test2_no_Recipe(self):
#        tester = app.test_client(self)
#        response = tester.get('/recipes/nonexistentrecipe1213123123123')
#        self.assertEqual(response.status_code, 404)
#
#    # Testing update recipe
#    def test3_update(self):
#        tester = app.test_client(self)
#        response = tester.post('/update', json={
#            "name": "Roasted Asparagus",
#            "time": "30 minutes",
#            "ingredients": [
#                {
#                    "quantity": "1 lb",
#                    "name": " asparagus"
#                },
#                {
#                    "quantity": "1 1/2 tbsp",
#                    "name": "olive oil"
#                },
#                {
#                    "quantity": "1/2 tsp",
#                    "name": "kosher salt"
#                }
#            ],
#            "steps": [
#                "Preheat oven to 4258F.",
#                "Cut off the woody bottom part of the asparagus spears and discard.",
#                "With a vegetable peeler, peel off the skin on the bottom 2-3 inches of the spears (this keeps the asparagus from being all.\",string.\", and if you eat asparagus you know what I mean by that).",
#                "Place asparagus on foil-lined baking sheet and drizzle with olive oil.",
#                "Sprinkle with salt.",
#                "With your hands, roll the asparagus around until they are evenly coated with oil and salt.",
#                "Roast for 10-15 minutes, depending on the thickness of your stalks and how tender you like them.",
#                "They should be tender when pierced with the tip of a knife.",
#                "The tips of the spears will get very brown but watch them to prevent burning.",
#                "They are great plain, but sometimes I serve them with a light vinaigrette if we need something acidic to balance out our meal."
#            ],
#            "imageURL": "http://img.sndimg.com/food/image/upload/w_266/v1/img/recipes/50/84/7/picMcSyVd.jpg",
#            "originalURL": "http://www.food.com/recipe/roasted-asparagus-50847",
#            "response":"true"
#        })
#        self.assertEqual(response.status_code, 201)
#
#    # Testing update recipe error
#    def test3_update_fail(self):
#        tester = app.test_client(self)
#        response = tester.post('/update', json={})
#        self.assertEqual(response.status_code, 400)
#
#    # test when we return empty myrecipes
#    def test3_myrecipe_get_fail(self):
#        tester = app.test_client(self)
#        response = tester.get('/myrecipes')
#        self.assertEqual(response.status_code,404)
#
#    def test4_myrecipe_post(self):
#        tester = app.test_client(self)
#        response = tester.post('/myrecipes',json={"name":"egg","time":"15 min"}, content_type='application/json',
#                              follow_redirects=True)
#        self.assertEqual(response.status_code,201)
#
#    def test4_myrecipe_post_fail(self):
#        tester = app.test_client(self)
#        response = tester.post('/myrecipes',json={}, content_type='application/json',
#                              follow_redirects=True)
#        self.assertEqual(response.status_code,400)
#
#     #test my recipes
#    def test5_myrecipe_get(self):
#        tester = app.test_client(self)
#        response = tester.get('/myrecipes')
#        self.assertEqual(response.status_code,200)
#
#    def test6_myrecipe_delete(self):
#        tester = app.test_client(self)
#        response = tester.delete('/myrecipes')
#        self.assertEqual(response.status_code,200)
#    #test shopping
#
#    def test6_shopping_post_fail(self):
#        tester = app.test_client(self)
#        response = tester.post('/shopping',json={}, content_type='application/json',
#                              follow_redirects=True)
#        self.assertEqual(response.status_code,400)
#
#    def test6_shopping_get_fail(self):
#        tester = app.test_client(self)
#        response = tester.get('/shopping')
#        self.assertEqual(response.status_code,404)
#
#    def test7_shopping_post(self):
#        tester = app.test_client(self)
#        response = tester.post('/shopping',json={"ingredients": [
#            {
#                "quantity": "1 lb",
#                "name": " asparagus"
#            },
#            {
#                "quantity": "1 1/2 tbsp",
#                "name": "olive oil"
#            },
#            {
#                "quantity": "1/2 tsp",
#                "name": "kosher salt"
#            }
#        ]}, content_type='application/json',
#                              follow_redirects=True)
#        self.assertEqual(response.status_code,201)
#
#    def test8_shopping_get(self):
#        tester = app.test_client(self)
#        response = tester.get('/shopping')
#        self.assertEqual(response.status_code,200)
#        response = tester.delete('/shopping')
#
#    def test9_shopping_delete(self):
#        tester = app.test_client(self)
#        response = tester.delete('/shopping')
#        self.assertEqual(response.status_code,200)
#
#    # Test delete by name
#    def test9_delete_name(self):
#        tester = app.test_client(self)
#        response = tester.post('/recipes',json={"name":"hamburger", "time":"15 min"}, content_type='application/json',
#                              follow_redirects=True)
#        response = tester.delete('/recipes/hamburger')
#        self.assertEqual(response.status_code, 200)
#
#    # test delete
#    def test9_delete(self):
#        tester = app.test_client(self)
#        response = tester.delete('/recipes')
#        self.assertEqual(response.status_code, 200)
#

class ImageObj:
    file = None
    filename = None
    def __init__(self, file, filename):
        self.file = file
        self.filename = filename

if __name__ == '__main__':
    unittest.main()

