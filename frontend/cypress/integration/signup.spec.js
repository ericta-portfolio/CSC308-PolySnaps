describe("/Signup", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/Signup");
  });

  it("Form not complete", () => {
    cy.get("form").contains("Sign Up").click();
    cy.get("[id=failed]").contains("Please fill out the entire form!");
  });

  it("using an existing email", () => {
    cy.get("[name=first]").type("Leticia");
    cy.get("[name=last]").type("Siqueira");
    cy.get("[name=email]").type("lalvessi@calpoly.edu");
    cy.get('select').select("Other");
    cy.get("[name=password]").type("whatever");
    cy.get("[name=password2]").type("whatever{enter}");
    cy.get("[type=submit]").contains("Sign Up").click();
    cy.get("[id=failed]").contains("Account already exists! Please sign-in :)");
  });

  it("Password confirmation rejected", () => {
    cy.get("[name=first]").type("JayJay");
    cy.get("[name=last]").type("the Jet Plane");
    cy.get("[name=email]").type("jjplane@calpoly.edu");
    cy.get('select').select("Other");
    cy.get("[name=password]").type("whatever");
    cy.get("[name=password2]").type("nope");
    cy.get("[type=submit]").contains("Sign Up").click();
    cy.get("[id=failed]").contains("Passwords do not match!");
  });

  //check for emails that aren't calpoly

  it("Successful Sign up", () => {
    cy.get("[name=first]").type("Cat");
    cy.get("[name=last]").type("in the Hat");
    cy.get("[name=email]").type("cinhat@calpoly.edu");
    cy.get('select').select("Other");
    cy.get("[name=password]").type("123");
    cy.get("[name=password2]").type("123");
    cy.get("[type=submit]").contains("Sign Up").click();
    cy.location("pathname").should("match", /\/Login/);
  });
});
