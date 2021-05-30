describe("/Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/Login");
  });

  it("greets with Sign in", () => {
    cy.contains("h1", "Sign In");
  });

  it("links to /Signup", () => {
    cy.contains("Need an account?").should(
      "have.attr",
      "href",
      "http://localhost:3000/Signup"
    );
  });

    it("requires email and password", () => {
        cy.get('form').contains('Log In').click()
        cy.get("[id=failed]").contains("Email and Password left blank!");
    });

  it("requires existing email", () => {
    cy.get("[name=email]").type("notvaliduser@gmail.com");
    cy.get("[name=password]").type("invalid{enter}");
    cy.get("[id=failed]").contains("Incorrect username or password");
  });

  it("Successful Log In", () => {
    cy.get("[name=email]").type("lalvessi@calpoly.edu");
    cy.get("[name=password]").type("123{enter}");
    cy.location("pathname").should("match", /\/ProfileForm$/);
  });
});
