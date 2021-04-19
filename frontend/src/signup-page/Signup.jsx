import React, { useState } from "react";
import SignupForm from "./SignupForm";
import logo from "./logo3.png";
import axios from "axios";

function Signup() {
  
  const signup = (details) => {
    console.log(details);

    if (details.password === details.password2 && details.date !== null) {
      axios
        .post("http://localhost:5000/newUser", details)
        .then(function (response) {
         window.location.href = "http://localhost:3000/Login";
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
