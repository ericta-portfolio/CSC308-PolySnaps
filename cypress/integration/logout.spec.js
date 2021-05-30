describe("/Logout", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/Login");
    });
  
    it("greets with Sign in", () => {
      cy.contains("h1", "Sign In");
    });
  
    it("Successful Log In", () => {
        cy.get("[name=email]").type("lalvessi@calpoly.edu");
        cy.get("[name=password]").type("123{enter}");
        cy.location("pathname").should("match", /\/ProfileForm$/);
      });

    it("log out successfully", () => {
        cy.get('[id=log]').contains('Log Out').click()
        cy.location("pathname").should("match", /\/$/);
    });
    
  });
  