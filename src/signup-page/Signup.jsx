import React, { useState } from "react";
import SignupForm from "./SignupForm";
import logo from "./logo3.png";
import axios from "axios";

function Signup() {
  const beURL = "https://polysnaps-be.herokuapp.com";
  const feURL = "https://polysnaps-fe.herokuapp.com";
  const signup = (details) => {
    
    console.log(details);

    if (details.password === details.password2 && details.date !== null) {
      axios
        .get(beURL + "/test")
        .then(function (response) {
         console.log(response.text)
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log("Details do not match!");
    }
  };

  return (
    <div id="signupDiv" className="container">
      <img src={logo} alt="PolySnaps Logo" />
      <SignupForm Signup={signup} />
    </div>
  );
}

export default Signup;
