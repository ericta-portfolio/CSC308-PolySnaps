import React, { useState } from "react";
import SignupForm from "./SignupForm";
import logo from "./logo3.png";
import axios from "axios";

function Signup() {
  
  const signup = (details) => {
    console.log(details);

    if (details.password === details.password2 && details.date !== null) {
      const baseURL = process.env.baseURL;
      const port = process.env.port;
      axios
        .post("http://localhost:" + port + "/newUser", details)
        .then(function (response) {
         window.location.href = baseURL + "/Login";
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
