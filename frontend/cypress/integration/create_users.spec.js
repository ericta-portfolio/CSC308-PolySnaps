// import malenames from "../support/names/malenames";
// import femalenames from "../support/names/femalenames";
// import othernames from "../support/names/othernames"
// import lastname from "../support/names/lastname";
// import hobbies from "../../src/profile-form-FE/data/hobbies"
// import interests from "../../src/profile-form-FE/data/interests"
// import majors from "../../src/profile-form-FE/data/majors"
// import recreationals from "../../src/profile-form-FE/data/recreationals"
// import religions from "../../src/profile-form-FE/data/religions"

// //creating 8 users

// var getfn, getlastname, getgender, getpersonality, getmajor, getimage;
// var domain = "@calpoly.edu";
// var gender = ["Male", "Female", "Other"];
// var personality = ["Introvert", "Extrovert", "In Between"];
// var filepath;
// var wp = ["w1.jpeg","w2.jpeg","w3.jpeg","w4.jpeg","w5.jpeg","w6.jpeg","w7.jpeg","w8.jpeg"];
// var mp = ["m1.jpeg","m2.jpeg","m3.jpeg","m4.jpeg","m5.jpeg","m6.jpeg","m7.jpeg","m8.jpeg"];
// var op = ["o1.jpeg","o2.jpeg","o3.jpeg","o4.jpeg","o5.jpeg","o6.jpeg","o7.jpeg","o8.jpeg"];

// function getElement(list) {
//     return list[Math.floor(Math.random() * list.length)];
// }

// describe("Creating 8 users", () => {
//   beforeEach(() => {
//     cy.visit("http://localhost:3000/Signup");
//   });

//   it("User 1", () => {
//     getpersonality = getElement(personality);
//     getmajor = getElement(majors);
//     getgender = getElement(gender);

//     if (getgender === "Female"){
//         getfn = getElement(femalenames);
//         getlastname = getElement(lastname);
//     } else if (getgender === "Male") {
//         getfn = getElement(malenames);
//         getlastname = getElement(lastname);
//     } else {
//         getfn = getElement(othernames);
//         getlastname = getElement(lastname);
//     }

//     cy.get("[name=first]").type(getfn);
//     cy.get("[name=last]").type(getlastname);
//     cy.get("[name=email]").type(getfn.concat(getlastname, domain));
//     cy.get("select").select(getgender);
//     cy.get("[name=password]").type("123");
//     cy.get("[name=password2]").type("123");
//     cy.get("form").submit();
//     cy.location("pathname").should("match", /\/ProfileForm$/);

//     if (getgender === "Female"){
//         getimage = wp[1];
//         filepath = 'images/female/'.concat(getimage);
//     } else if (getgender === "Male") {
//         getimage = mp[1];
//         filepath = 'images/male/'.concat(getimage);
//     } else {
//         getimage = op[1];
//         filepath = 'images/other/'.concat(getimage);
//     }

//     cy.get('input[type="file"]').attachFile(filepath)
//     cy.get("[id=uploadimg]").contains("Upload").click();
//     cy.get("[value=".concat(getpersonality, "]")).first().check();
//     cy.get("[name=major]").check(getmajor);

//     cy.get('[id=romance]').check(getElement(interests),{ force: true });

//     cy.get('[name=friendship]').check(getElement(interests),{ force: true });
//     cy.get('[name=friendship]').check(getElement(interests),{ force: true });

//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });

//     cy.get("[name=spirituality]").check(getElement(religions));

//     cy.get('[name=partying]').check(getElement(recreationals),{ force: true });
//     cy.get('[name=partying]').check(getElement(recreationals),{ force: true });

//     cy.get("[type=submit]").contains("Submit").click();
//     cy.location("pathname").should("match", /\/MatchesPage$/);
//   });

//   it("User 2", () => {
//     getpersonality = getElement(personality);
//     getmajor = getElement(majors);
//     getgender = getElement(gender);

//     if (getgender === "Female"){
//         getfn = getElement(femalenames);
//         getlastname = getElement(lastname);
//     } else if (getgender === "Male") {
//         getfn = getElement(malenames);
//         getlastname = getElement(lastname);
//     } else {
//         getfn = getElement(othernames);
//         getlastname = getElement(lastname);
//     }

//     cy.get("[name=first]").type(getfn);
//     cy.get("[name=last]").type(getlastname);
//     cy.get("[name=email]").type(getfn.concat(getlastname, domain));
//     cy.get("select").select(getgender);
//     cy.get("[name=password]").type("123");
//     cy.get("[name=password2]").type("123");
//     cy.get("form").submit();
//     cy.location("pathname").should("match", /\/ProfileForm$/);

//     if (getgender === "Female"){
//         getimage = wp[2];
//         filepath = 'images/female/'.concat(getimage);
//     } else if (getgender === "Male") {
//         getimage = mp[2];
//         filepath = 'images/male/'.concat(getimage);
//     } else {
//         getimage = op[2];
//         filepath = 'images/other/'.concat(getimage);
//     }

//     cy.get('input[type="file"]').attachFile(filepath)
//     cy.get("[id=uploadimg]").contains("Upload").click();
//     cy.get("[value=".concat(getpersonality, "]")).first().check();
//     cy.get("[name=major]").check(getmajor);

//     cy.get('[id=romance]').check(getElement(interests),{ force: true });

//     cy.get('[name=friendship]').check(getElement(interests),{ force: true });
//     cy.get('[name=friendship]').check(getElement(interests),{ force: true });

//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });

//     cy.get("[name=spirituality]").check(getElement(religions));

//     cy.get('[name=partying]').check(getElement(recreationals),{ force: true });
//     cy.get('[name=partying]').check(getElement(recreationals),{ force: true });

//     cy.get("[type=submit]").contains("Submit").click();
//     cy.location("pathname").should("match", /\/MatchesPage$/);
//   });

//   it("User 3", () => {
//     getpersonality = getElement(personality);
//     getmajor = getElement(majors);
//     getgender = getElement(gender);

//     if (getgender === "Female"){
//         getfn = getElement(femalenames);
//         getlastname = getElement(lastname);
//     } else if (getgender === "Male") {
//         getfn = getElement(malenames);
//         getlastname = getElement(lastname);
//     } else {
//         getfn = getElement(othernames);
//         getlastname = getElement(lastname);
//     }

//     cy.get("[name=first]").type(getfn);
//     cy.get("[name=last]").type(getlastname);
//     cy.get("[name=email]").type(getfn.concat(getlastname, domain));
//     cy.get("select").select(getgender);
//     cy.get("[name=password]").type("123");
//     cy.get("[name=password2]").type("123");
//     cy.get("form").submit();
//     cy.location("pathname").should("match", /\/ProfileForm$/);

//     if (getgender === "Female"){
//         getimage = wp[3];
//         filepath = 'images/female/'.concat(getimage);
//     } else if (getgender === "Male") {
//         getimage = mp[3];
//         filepath = 'images/male/'.concat(getimage);
//     } else {
//         getimage = op[3];
//         filepath = 'images/other/'.concat(getimage);
//     }

//     cy.get('input[type="file"]').attachFile(filepath)
//     cy.get("[id=uploadimg]").contains("Upload").click();
//     cy.get("[value=".concat(getpersonality, "]")).first().check();
//     cy.get("[name=major]").check(getmajor);

//     cy.get('[id=romance]').check(getElement(interests),{ force: true });

//     cy.get('[name=friendship]').check(getElement(interests),{ force: true });
//     cy.get('[name=friendship]').check(getElement(interests),{ force: true });

//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });

//     cy.get("[name=spirituality]").check(getElement(religions));

//     cy.get('[name=partying]').check(getElement(recreationals),{ force: true });
//     cy.get('[name=partying]').check(getElement(recreationals),{ force: true });

//     cy.get("[type=submit]").contains("Submit").click();
//     cy.location("pathname").should("match", /\/MatchesPage$/);
//   });

//   it("User 4", () => {
//     getpersonality = getElement(personality);
//     getmajor = getElement(majors);
//     getgender = getElement(gender);

//     if (getgender === "Female"){
//         getfn = getElement(femalenames);
//         getlastname = getElement(lastname);
//     } else if (getgender === "Male") {
//         getfn = getElement(malenames);
//         getlastname = getElement(lastname);
//     } else {
//         getfn = getElement(othernames);
//         getlastname = getElement(lastname);
//     }

//     cy.get("[name=first]").type(getfn);
//     cy.get("[name=last]").type(getlastname);
//     cy.get("[name=email]").type(getfn.concat(getlastname, domain));
//     cy.get("select").select(getgender);
//     cy.get("[name=password]").type("123");
//     cy.get("[name=password2]").type("123");
//     cy.get("form").submit();
//     cy.location("pathname").should("match", /\/ProfileForm$/);

//     if (getgender === "Female"){
//         getimage = wp[4];
//         filepath = 'images/female/'.concat(getimage);
//     } else if (getgender === "Male") {
//         getimage = mp[4];
//         filepath = 'images/male/'.concat(getimage);
//     } else {
//         getimage = op[4];
//         filepath = 'images/other/'.concat(getimage);
//     }

//     cy.get('input[type="file"]').attachFile(filepath)
//     cy.get("[id=uploadimg]").contains("Upload").click();
//     cy.get("[value=".concat(getpersonality, "]")).first().check();
//     cy.get("[name=major]").check(getmajor);

//     cy.get('[id=romance]').check(getElement(interests),{ force: true });

//     cy.get('[name=friendship]').check(getElement(interests),{ force: true });
//     cy.get('[name=friendship]').check(getElement(interests),{ force: true });

//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });

//     cy.get("[name=spirituality]").check(getElement(religions));

//     cy.get('[name=partying]').check(getElement(recreationals),{ force: true });
//     cy.get('[name=partying]').check(getElement(recreationals),{ force: true });

//     cy.get("[type=submit]").contains("Submit").click();
//     cy.location("pathname").should("match", /\/MatchesPage$/);
//   });

//   it("User 5", () => {
//     getpersonality = getElement(personality);
//     getmajor = getElement(majors);
//     getgender = getElement(gender);

//     if (getgender === "Female"){
//         getfn = getElement(femalenames);
//         getlastname = getElement(lastname);
//     } else if (getgender === "Male") {
//         getfn = getElement(malenames);
//         getlastname = getElement(lastname);
//     } else {
//         getfn = getElement(othernames);
//         getlastname = getElement(lastname);
//     }

//     cy.get("[name=first]").type(getfn);
//     cy.get("[name=last]").type(getlastname);
//     cy.get("[name=email]").type(getfn.concat(getlastname, domain));
//     cy.get("select").select(getgender);
//     cy.get("[name=password]").type("123");
//     cy.get("[name=password2]").type("123");
//     cy.get("form").submit();
//     cy.location("pathname").should("match", /\/ProfileForm$/);

//     if (getgender === "Female"){
//         getimage = wp[5];
//         filepath = 'images/female/'.concat(getimage);
//     } else if (getgender === "Male") {
//         getimage = mp[5];
//         filepath = 'images/male/'.concat(getimage);
//     } else {
//         getimage = op[5];
//         filepath = 'images/other/'.concat(getimage);
//     }

//     cy.get('input[type="file"]').attachFile(filepath)
//     cy.get("[id=uploadimg]").contains("Upload").click();
//     cy.get("[value=".concat(getpersonality, "]")).first().check();
//     cy.get("[name=major]").check(getmajor);

//     cy.get('[id=romance]').check(getElement(interests),{ force: true });

//     cy.get('[name=friendship]').check(getElement(interests),{ force: true });
//     cy.get('[name=friendship]').check(getElement(interests),{ force: true });

//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });

//     cy.get("[name=spirituality]").check(getElement(religions));

//     cy.get('[name=partying]').check(getElement(recreationals),{ force: true });
//     cy.get('[name=partying]').check(getElement(recreationals),{ force: true });

//     cy.get("[type=submit]").contains("Submit").click();
//     cy.location("pathname").should("match", /\/MatchesPage$/);
//   });

//   it("User 6", () => {
//     getpersonality = getElement(personality);
//     getmajor = getElement(majors);
//     getgender = getElement(gender);

//     if (getgender === "Female"){
//         getfn = getElement(femalenames);
//         getlastname = getElement(lastname);
//     } else if (getgender === "Male") {
//         getfn = getElement(malenames);
//         getlastname = getElement(lastname);
//     } else {
//         getfn = getElement(othernames);
//         getlastname = getElement(lastname);
//     }

//     cy.get("[name=first]").type(getfn);
//     cy.get("[name=last]").type(getlastname);
//     cy.get("[name=email]").type(getfn.concat(getlastname, domain));
//     cy.get("select").select(getgender);
//     cy.get("[name=password]").type("123");
//     cy.get("[name=password2]").type("123");
//     cy.get("form").submit();
//     cy.location("pathname").should("match", /\/ProfileForm$/);

//     if (getgender === "Female"){
//         getimage = wp[6];
//         filepath = 'images/female/'.concat(getimage);
//     } else if (getgender === "Male") {
//         getimage = mp[6];
//         filepath = 'images/male/'.concat(getimage);
//     } else {
//         getimage = op[6];
//         filepath = 'images/other/'.concat(getimage);
//     }

//     cy.get('input[type="file"]').attachFile(filepath)
//     cy.get("[id=uploadimg]").contains("Upload").click();
//     cy.get("[value=".concat(getpersonality, "]")).first().check();
//     cy.get("[name=major]").check(getmajor);

//     cy.get('[id=romance]').check(getElement(interests),{ force: true });

//     cy.get('[name=friendship]').check(getElement(interests),{ force: true });
//     cy.get('[name=friendship]').check(getElement(interests),{ force: true });

//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });

//     cy.get("[name=spirituality]").check(getElement(religions));

//     cy.get('[name=partying]').check(getElement(recreationals),{ force: true });
//     cy.get('[name=partying]').check(getElement(recreationals),{ force: true });

//     cy.get("[type=submit]").contains("Submit").click();
//     cy.location("pathname").should("match", /\/MatchesPage$/);
//   });

//   it("User 7", () => {
//     getpersonality = getElement(personality);
//     getmajor = getElement(majors);
//     getgender = getElement(gender);

//     if (getgender === "Female"){
//         getfn = getElement(femalenames);
//         getlastname = getElement(lastname);
//     } else if (getgender === "Male") {
//         getfn = getElement(malenames);
//         getlastname = getElement(lastname);
//     } else {
//         getfn = getElement(othernames);
//         getlastname = getElement(lastname);
//     }

//     cy.get("[name=first]").type(getfn);
//     cy.get("[name=last]").type(getlastname);
//     cy.get("[name=email]").type(getfn.concat(getlastname, domain));
//     cy.get("select").select(getgender);
//     cy.get("[name=password]").type("123");
//     cy.get("[name=password2]").type("123");
//     cy.get("form").submit();
//     cy.location("pathname").should("match", /\/ProfileForm$/);

//     if (getgender === "Female"){
//         getimage = wp[7];
//         filepath = 'images/female/'.concat(getimage);
//     } else if (getgender === "Male") {
//         getimage = mp[7];
//         filepath = 'images/male/'.concat(getimage);
//     } else {
//         getimage = op[7];
//         filepath = 'images/other/'.concat(getimage);
//     }

//     cy.get('input[type="file"]').attachFile(filepath)
//     cy.get("[id=uploadimg]").contains("Upload").click();
//     cy.get("[value=".concat(getpersonality, "]")).first().check();
//     cy.get("[name=major]").check(getmajor);

//     cy.get('[id=romance]').check(getElement(interests),{ force: true });

//     cy.get('[name=friendship]').check(getElement(interests),{ force: true });
//     cy.get('[name=friendship]').check(getElement(interests),{ force: true });

//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });
//     cy.get('[name=hobbies]').check(getElement(hobbies),{ force: true });

//     cy.get("[name=spirituality]").check(getElement(religions));

//     cy.get('[name=partying]').check(getElement(recreationals),{ force: true });
//     cy.get('[name=partying]').check(getElement(recreationals),{ force: true });

//     cy.get("[type=submit]").contains("Submit").click();
//     cy.location("pathname").should("match", /\/MatchesPage$/);
//   });
// });
