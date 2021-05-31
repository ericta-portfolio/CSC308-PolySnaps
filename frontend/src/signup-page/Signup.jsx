import React, { useState } from "react";
import SignupForm from "./SignupForm";
import logo from "./logo3.png";
import axios from "axios";

function Signup() {
  const signup = (details) => {
    console.log(details);
    document.getElementById("failed").innerHTML = null;
    if (details.password === details.password2) {
      if (details.date == null) {
        details.date = new Date();
      }
      axios
        .post("http://localhost:5000/newUser", details)
        .then(function (response) {
          const data = response.data;
          localStorage.setItem("id", data);
          window.location.href = "http://localhost:3000/ProfileForm";
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            // alert();
            document.getElementById("failed").innerHTML = error.response.data;
          }
        });
    } else {
      document.getElementById("failed").innerHTML = "Passwords do not match!";
    }
  };

  return (
    <div id="signupDiv" className="container">
      <img className="logoimg" src={logo} alt="PolySnaps Logo" />
      <SignupForm Signup={signup} />
    </div>
  );
}

export default Signup;
