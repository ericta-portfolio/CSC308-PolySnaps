describe("/Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/Login");
  });

//Given: I am on the Log In page
//When: I click "Need an account?"
//Then: it redirects me to the Sign Up page
  it("links to /Signup", () => {
    cy.contains("Need an account?").should(
      "have.attr",
      "href",
      "http://localhost:3000/Signup"
    );
  });

//Given: I am on the Log In page and haven't inputted credentials
//When: I click the Log In button
//Then: the page displays "Email and Password left blank!"
    it("requires email and password", () => {
        cy.get('form').contains('Log In').click()
        cy.get("[id=failed]").contains("Email and Password left blank!");
    });

//Given: I am on the Log In page and I input a nonexistent email
//When: I click the Log In button
//Then: the page displays "Incorrect username or password"
  it("requires existing email", () => {
    cy.get("[name=email]").type("notvaliduser@gmail.com");
    cy.get("[name=password]").type("invalid");
    cy.get("[type=submit]").contains("Log In").click();
    cy.get("[id=failed]").contains("Incorrect username or password");
  });

//Given: I am on the Log In page and input an existing email and the correct password
//When: I click the Log In button
//Then: it redirects me to the Profile Form page
  it("Successful Log In", () => {
    cy.get("[name=email]").type("lalvessi@calpoly.edu");
    cy.get("[name=password]").type("123");
    cy.get("[type=submit]").contains("Log In").click();
    cy.location("pathname").should("match", /\/ProfileForm$/);
  });
});
