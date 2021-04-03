import React, { useState } from "react";
import LoginForm from "./LoginForm";
import logo from "./logo3.png";

function App() {
  const adminUser = {
    email: "admin@calpoly.edu",
    password: "admin123"
  };

  const [user, setUser] = useState({ email: "" });
  const [error, setError] = useState("");

  const Login = (details) => {
    console.log(details);

    if (
      details.email === adminUser.email &&
      details.password === adminUser.password
    ) {
      console.log("Loggged in");
      setUser({
        email: details.email
      });
    } else {
      console.log("Details do not match!");
    }
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
      {user.email !== "" ? (
        <div className="welcome">
          <h2>Welcome to PolySnaps!</h2>
          <button onClick={Logout}> Logout</button>
        </div>
      ) : (
        <LoginForm Login={Login} error={error} />
      )}
    </div>
  );
}

export default App;
