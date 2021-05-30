import React, { useState } from "react";
import { Button } from "react-bootstrap";
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
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          // alert();
          document.getElementById("failed").innerHTML = error.response.data;
        }
      });
  };

  const [details, setDetails] = useState({ email: "", password: "" });
  const submitHandler = (e) => {
    e.preventDefault();
    Login(details);
  };

  const signup = () => {
    window.location.href = "http://localhost:3000/Signup";
  };

  return (
    <div className="container">
      <img className="logoimg" src={logo} alt="PolySnaps Logo" />
      <h1
      style={{
        "font-family": "Copperplate",
        "font-size" : "50px"
        }}>Sign In</h1>
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
                  email: e.target.value,
                })
              }
              pattern=".+@calpoly.edu"
              title="Must be a CalPoly email!"
              value={details.email}
            />
          </div>
          <div className="form-group">
            <input
              style={{ "margin-left": "calc(50% - 125px)" }}
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              onChange={(e) =>
                setDetails({
                  ...details,
                  password: e.target.value,
                })
              }
              value={details.password}
            />
          </div>

          <p
            style={{
              "font-weight": "350",
              "white-space": "nowrap",
            }}
            id="failed"
          ></p>
          <Button className="button" type="submit" id="loginbtn" onClick={submitHandler}>
            Log In
          </Button>
          <a id="signupbtn" href="http://localhost:3000/Signup">Need an account?</a>
          {/* <span> */}
          {/* <Button type="submit" id="loginbtn" onClick={submitHandler}>
              Log In
            </Button> */}
          {/* <a href="http://localhost:3000/Signup">Need an account?</a> */}
          {/* <Button type="submit" id="signupbtn" onClick={signup}>
              Sign Up
            </Button> */}
          {/* </span> */}
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
