import React, { useState } from "react";
import LoginForm from "./LoginForm";
import logo from "./logo3.png";
import axios from "axios"

function LoginPage() {
  const adminUser = {
    email: "admin@calpoly.edu",
    password: "admin123"
  };

  const [user, setUser] = useState({ email: "" });
  const [error, setError] = useState("");

  const Login = (details) => {
    console.log(details);
    console.log("Logged in");
    console.log(details.email);
    console.log(details.password);
    axios
      .post("https://polysnaps-be.herokuapp.com/users", details)
      .then(function (response) {
        const data = response.data;
        localStorage.setItem("id", data);
        window.location.href = "https://polysnaps-fe.herokuapp.com/ProfileForm";
      })
      .catch(function (e) {
        document.getElementById("failure").innerHTML = e;
      });
  };

  const Logout = () => {
    console.log("Logout");
    setUser({
      email: ""
    });
  };

  return (
    <div className="container">
      <img src={logo} alt="PolySnaps Logo" />
        <LoginForm Login={Login} error={error} />
    </div>
  );
}

export default LoginPage;