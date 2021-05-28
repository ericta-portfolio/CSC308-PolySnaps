describe('Backend running - post new user', () => {
    context('Given I have submitted a signup form', () => {
        it('When I request all users, it returns a list of user objects', () => {
            cy.request('GET', 'http://localhost:5000/retrieve_all')
              .then((response) => {
                    var id = response.body[0]["_id"];
                    print(id);
                    describe('backend running - update user profile', () => {
                        it('When sending a user object for insertion', () => {
                        cy.request('PUT', 'http://localhost:5000/profileUser/' + id, 
                        {
                            "major": "Engineering",
                            "personality": "Introvert",
                            "romance": ["Men", "Other"],
                            "friendship": ["Men", "Women"],
                            "hobbies": ["Hiking", "Bonfires"],
                            "spirituality": "Agnostic",
                            "partying": ["Cannabis"]
                        }).then((response) => {
                              expect(response.status).to.be.equal(201);
                              expect(response.body).to.be.an('string');
                        })
                  })
              });
            });
        });
    });
});