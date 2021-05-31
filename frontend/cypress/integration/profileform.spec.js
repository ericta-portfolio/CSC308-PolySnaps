
describe("/ProfileForm", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/Login");
  });

  it("greets with Sign in", () => {
    cy.contains("h1", "Sign In");
  });

//Given: I successfully log in
//When: I press the log in button
//Then: I get redirected to the Profile Form page
  it("Successful Log In", () => {
    cy.get("[name=email]").type("kperry@calpoly.edu");
    cy.get("[name=password]").type("123");
    cy.get("[type=submit]").contains("Log In").click();
    cy.location("pathname").should("match", /\/ProfileForm$/);
  });

//Given: I successfully fill out the entire form
//When: I press the Submit button
//Then: I get redirected to the Matches page
  it("filling out entire form", () => {
    cy.get("[name=email]").type("kperry@calpoly.edu");
    cy.get("[name=password]").type("123");
    cy.get("[type=submit]").contains("Log In").click();
    cy.location("pathname").should("match", /\/ProfileForm$/);
    cy.get("[value=Introvert]").first().check();
    cy.get("[name=major]").first().check();
    cy.get('[type="checkbox"]').check({ force: true });
    cy.get("[name=spirituality]").first().check();
    cy.get("[type=submit]").contains("Submit").click();
    cy.location("pathname").should("match", /\/MatchesPage$/);
  });

//Given: I fill out part of the form
//When: I press the Submit button
//Then: the page displays a message detailing a missing item
  it("filling out part of form 1", () => {
    cy.get("[name=email]").type("kperry@calpoly.edu");
    cy.get("[name=password]").type("123");
    cy.get("[type=submit]").contains("Log In").click();
    cy.location("pathname").should("match", /\/ProfileForm$/);
    cy.get("[value=Introvert]").first().check();
    cy.get("[name=major]").first().check();
    cy.get('[type="checkbox"]').check({ force: true });
    cy.get("[type=submit]").contains("Submit").click();
    cy.get("[id=incompleteform]").contains(
      "Incomplete Submission, what's your Spirituality?"
    );
  });

//Given: I fill out part of the form
//When: I press the Submit button
//Then: the page displays a message detailing a missing item
  it("filling out part of form 2", () => {
    cy.get("[name=email]").type("kperry@calpoly.edu");
    cy.get("[name=password]").type("123");
    cy.get("[type=submit]").contains("Log In").click();
    cy.location("pathname").should("match", /\/ProfileForm$/);
    cy.get("[type=submit]").contains("Submit").click();
    cy.get("[id=incompleteform]").contains(
      "Incomplete Submission, what's your Party Favor?"
    );
  });

//Given: I select a file for the profile image
//When: I press the upload button
//Then: the page should load the image 
  it("Testing picture uploading", () => {
    cy.get("[name=email]").type("kperry@calpoly.edu");
    cy.get("[name=password]").type("123");
    cy.get("[type=submit]").contains("Log In").click();
    cy.location("pathname").should("match", /\/ProfileForm$/);
    cy.get("[value=Introvert]").first().check();
    cy.get("[name=major]").first().check();
    cy.get('[type="checkbox"]').check({ force: true });
    cy.get("[name=spirituality]").first().check();

    const filepath = 'images/woman3.jpeg'
    cy.get('input[type="file"]').attachFile(filepath)
    cy.get("[id=uploadimg]").contains("Upload").click();
  });
});
