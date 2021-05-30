describe('Backend running - get all users', () => {
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
                expect(response.body).to.be.an('string');
                expect(response.statusCode).to.be.equal(200);
            });
        });
    });
});