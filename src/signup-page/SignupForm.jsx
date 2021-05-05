import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function SignupForm({ Signup }) {
  const [startDate, setStartDate] = useState(new Date());
  const [details, setDetails] = useState({
    email: "",
    password: "",
    password2: "",
    gender: "",
    last: "",
    first: "",
    date: new Date().now 
  });
  const submitHandler = (e) => {
    e.preventDefault();
    Signup(details);
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="form-inner">
        <div className="form-group">
          <input
            type="text"
            placeholder="First Name"
            name="first"
            id="first"
            onChange={(e) =>
              setDetails({
                ...details,
                first: e.target.value
              })
            }
            value={details.first}
            class="textFields"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Last Name"
            name="last"
            id="last"
            onChange={(e) =>
              setDetails({
                ...details,
                last: e.target.value
              })
            }
            value={details.last}
            class="textFields"
          />
        </div>
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
            class="textFields"
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
            class="textFields"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            id="password2"
            onChange={(e) =>
              setDetails({
                ...details,
                password2: e.target.value
              })
            }
            value={details.password2}
            class="textFields"
          />
        </div>
        <div>
          <DatePicker
            selected={startDate}
            value={startDate}
            id="date"
            onChange={(date) => {
              setStartDate(date);
              setDetails({
                ...details,
                date: date
              });
            }}
          />
        </div>
        <div>
          <select
            value={details.gender}
            onChange={(e) =>
              setDetails({
                ...details,
                gender: e.target.value
              })
            }
          >
            <option value="Selector">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <input id="signupSubmit" type="submit" value="Sign Up" />
      </div>
    </form>
  );
}

export default SignupForm;
