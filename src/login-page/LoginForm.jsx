import React, { useState } from "react";

function LoginForm({ Login, error }) {
  const [details, setDetails] = useState({ email: "", password: "" });
  const submitHandler = (e) => {
    e.preventDefault();
    Login(details);
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="form-inner">
        <div className="form-group">
          <input
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
        <input type="submit" value="Log In" />
      </div>
    </form>
  );
}

export default LoginForm;
