// Given I have submitted a profile update object,
// When the object is sent to the profileUser port
// Then a response code of 201 should be returned along with an id string

describe('Backend running - getting users', () => {
    context('Given I have requested all users', () => {
        before(() => {
            cy.intercept({
                method: 'GET',
                url: 'http://localhost:5000/retrieve_all',
            }).as('retrieveCheck');
        });
        it('When I submit an updated profile object, the database should be updated', () => {
            cy.visit('http://localhost:5000/retrieve_all');
            cy.wait('@retrieveCheck').should(({request, response}) => {
                cy.request('PUT', 'http://localhost:5000/profileUser/' + JSON.parse(response.body)[0]["_id"],
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
