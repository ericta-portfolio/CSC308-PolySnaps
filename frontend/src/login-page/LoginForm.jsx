import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import "./styles.css";
import "./login.css";
import logo from "./logo3.png";
import axios from "axios";

function LoginForm() {

  const Login = (details) => {
    document.getElementById("failed").innerHTML = null;
    axios
      .post("http://localhost:5000/users", details)
      .then(function (response) {
        const data = response.data;
        localStorage.setItem("id", data);
        window.location.href = "http://localhost:3000/ProfileForm";
      })
      .catch(function (e) {
        document.getElementById("failed").innerHTML = "Incorrect username or password";
      });
  };

  const [details, setDetails] = useState({ email: "", password: "" });
  const submitHandler = (e) => {
    e.preventDefault();
    Login(details);
  };

  const signup = () => {
    window.location.href = "http://localhost:3000/Signup";
  }
  return (
    <div className="container">
      <img className="logoimg" src={logo} alt="PolySnaps Logo" />
    <form onSubmit={submitHandler}>
      <div className="form-inner">
        <div className="form-group">
          <input
            style={{ "margin-left": "calc(50% - 125px)" }}
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            onChange={(e) =>
              setDetails({
                ...details,
                email: e.target.value
              })
            }
            pattern=".+@calpoly.edu"
            title="Must be a CalPoly email!"
            value={details.email}
          />
        </div>
        <div className="form-group">
          <input
            style={{"margin-left": "calc(50% - 125px)" }}
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            onChange={(e) =>
              setDetails({
                ...details,
                password: e.target.value
              })
            }
            value={details.password}
          />
        </div>

        <p id="failed"></p>
        <span>
        <Button type="submit" id="loginbtn" onClick={submitHandler}>Log In</Button>
        <Button type="submit" id="signupbtn" onClick={signup}>Sign Up</Button>
        </span>
      </div>
    </form>
    </div>
  );
}

export default LoginForm;
