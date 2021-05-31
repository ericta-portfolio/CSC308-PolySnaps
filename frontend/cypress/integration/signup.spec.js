import othernames from "../support/names/othernames"
import lastname from "../support/names/lastname";

var getfn, getlastname;
var domain = "@calpoly.edu";

function getElement(list) {
  return list[Math.floor(Math.random() * list.length)]; 
}

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
    cy.get("[name=password]").type("123");
    cy.get("[name=password2]").type("123");
    cy.get("form").submit();
    cy.get("[id=failed]").contains("Account already exists! Please sign-in :)");
  });

  it("Password confirmation rejected", () => {
    cy.get("[name=first]").type("JayJay");
    cy.get("[name=last]").type("the Jet Plane");
    cy.get("[name=email]").type("jjplane@calpoly.edu");
    cy.get('select').select("Other");
    cy.get("[name=password]").type("whatever");
    cy.get("[name=password2]").type("nope");
    cy.get("form").submit();
    cy.get("[id=failed]").contains("Passwords do not match!");
  });

  //check for emails that aren't calpoly

  it("Successful Sign up", () => {
    getfn = getElement(othernames);
    getlastname = getElement(lastname);

    cy.get("[name=first]").type(getfn);
    cy.get("[name=last]").type(getlastname);
    cy.get("[name=email]").type(getfn.concat(getlastname, domain));
    cy.get('select').select("Other");
    cy.get("[name=password]").type("123");
    cy.get("[name=password2]").type("123");
    cy.get("form").submit();
    cy.location("pathname").should("match", /\/ProfileForm$/);
  });
});