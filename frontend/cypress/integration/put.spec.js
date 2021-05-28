describe('Backend running - getting users', () => {
    context('Given I have requested all users', () => {
        before(() => {
            cy.intercept({
                method: 'GET',
                url: 'http://localhost:5000/retrieve_all',
            }).as('retrieveCheck');
        });
        
        it('When I request all users, it returns a list of user objects', () => {
            cy.visit('http://localhost:5000/retrieve_all');
            cy.wait('@retrieveCheck').should(({request, response}) => {
                cy.request('PUT', 'http://localhost:5000/profileUser/' + response.body, 
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
                });
            });
        });
    });
});
