describe("/Logout", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/Login");
    });
    
//Given: I successfully log in
//When: I press the log out button
//Then: I get redirected to the Homepage and I'm logged out.
    it("log out successfully", () => {
        cy.get("[name=email]").type("lalvessi@calpoly.edu");
        cy.get("[name=password]").type("123");
        cy.get("[type=submit]").contains("Log In").click();
        cy.location("pathname").should("match", /\/ProfileForm$/);
        cy.get('[name=logoutbutton]').contains('Log Out').click()
        cy.location("pathname").should("match", /\/$/);
    });

  });
