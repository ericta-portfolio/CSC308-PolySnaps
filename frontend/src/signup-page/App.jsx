import React, { useState } from "react";
import SignupForm from "./SignupForm";
import logo from "./logo3.png";
import axios from "axios";

function Signup() {
  const signup = (details) => {
    console.log(details);

    if (details.password === details.password2) {
      axios
        .post("http://localhost:5000/newUser", details)
        .then(function (response) {
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
    <div className="container">
      <img src={logo} alt="PolySnaps Logo" />
      {user.email !== "" ? (
        <div className="welcome">
          <h2>Welcome to PolySnaps!</h2>
        </div>
      ) : (
        <SignupForm Signup={signup} error={error} />
      )}
    </div>
  );
}

export default Signup;
