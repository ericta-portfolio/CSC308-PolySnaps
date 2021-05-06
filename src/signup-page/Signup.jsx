import React, { useState } from "react";
import SignupForm from "./SignupForm";
import logo from "./logo3.png";
import axios from "axios";

function Signup() {
  const beURL = "https://polysnaps-api.herokuapp.com";
  const feURL = "https://polysnaps-fe.herokuapp.com";
  const signup = (details) => {
    
    console.log(details);
    
    if (details.password === details.password2 && details.date !== null) {
      axios
        .post(beURL + "/newUser", details)
        .then(function (response) {
          // window.location.href = feURL + "/Login";
          console.log(response);
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
