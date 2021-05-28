const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

describe('Backend running - post new user', () => {
    context('Given I have submitted a signup form', () => {
        it('When sending a user object for insertion', () => {
            cy.request('POST', 'http://localhost:5000/newUser', 
            {
                "email": generateString(10) + "@calpoly.edu",
                "password": "123",
                "password2": "123",
                "gender": "Male",
                "last": "User",
                "first": "Test",
                "date": "1999-08-17T20:50:30.000Z"
            }).then((response) => {
                  expect(response.status).to.be.equal(201);
                  expect(response.body).to.be.an('string');
            })
        });
    });
});