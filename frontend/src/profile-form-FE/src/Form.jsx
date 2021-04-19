import React from "react";
import axios from "axios";

export default class PersonList extends React.Component {
  state = {
    name: "",
    major: "",
    hometown: "",
    hobbies: "",
    gender: "",
    year: ""
  };

  handleChange = (event) => {
    console.log(event.target.name);
    console.log(event.target.value);
    // *BUG* need to ask prof how to get this working *BUG*
    // const currentProp = event.target.name;
    // this.setState({ {currentProp}: event.target.name.value });
    switch (event.target.name) {
      case "name":
        this.setState({ name: event.target.value });
        break;
      case "major":
        this.setState({ major: event.target.value });
        break;
      case "hometown":
        this.setState({ hometown: event.target.value });
        break;
      case "hobbies":
        this.setState({ hobbies: event.target.value });
        break;
      case "gender":
        this.setState({ gender: event.target.value });
        break;
      case "year":
        this.setState({ year: event.target.value });
        break;
      default:
        console.log("there's been an oopsies");
        break;
    }
  };

  handleSubmit = (event) => {
    console.log(event);

    const user = {
      name: this.state.name,
      major: this.state.major,
      hometown: this.state.hometown,
      hobbies: this.state.hobbies,
      gender: this.state.gender,
      year: this.state.year
    };

    console.log(user);
    axios.post(`http://localhost:5000/user`, user).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Major:
            <input type="text" name="major" onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Hometown:
            <input type="text" name="hometown" onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Hobbies:
            <input type="text" name="hobbies" onChange={this.handleChange} />
          </label>
          <br />
          <p>Gender:</p>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            onChange={this.handleChange}
          />
          <label htmlFor="male">Male</label>
          <br />
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            onChange={this.handleChange}
          />
          <label htmlFor="female">Female</label>
          <br />
          <input
            type="radio"
            id="other"
            name="gender"
            value="other"
            onChange={this.handleChange}
          />
          <label htmlFor="other">Other</label>
          <br />
          <p>Year:</p>
          <input
            type="radio"
            id="year1"
            name="year"
            value="1"
            onChange={this.handleChange}
          />
          <label htmlFor="year1">1st Year</label>
          <br />
          <input
            type="radio"
            id="year2"
            name="year"
            value="2"
            onChange={this.handleChange}
          />
          <label htmlFor="year2">2nd Year</label>
          <br />
          <input
            type="radio"
            id="year3"
            name="year"
            value="3"
            onChange={this.handleChange}
          />
          <label htmlFor="year3">3rd Year</label>
          <br />
          <input
            type="radio"
            id="year4"
            name="year"
            value="4"
            onChange={this.handleChange}
          />
          <label htmlFor="year4">4th Year</label>
          <br />
          <input
            type="radio"
            id="year5"
            name="year"
            value="5"
            onChange={this.handleChange}
          />
          <label htmlFor="year5">5th Year</label>
          <br /> <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
