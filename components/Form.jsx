import React from "react";

function Form() {
  return (
    <div>
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <br />
        <label>
          Major:
          <input type="text" name="major" />
        </label>
        <br />
        <label>
          Hometown:
          <input type="text" name="hometown" />
        </label>
        <br />
        <label>
          Hobbies:
          <input type="text" name="hobbies" />
        </label>
        <br />
        <p>Gender:</p>
        <input type="radio" id="male" name="gender" value="male" />
        <label for="male">Male</label>
        <br />
        <input type="radio" id="female" name="gender" value="female" />
        <label for="female">Female</label>
        <br />
        <input type="radio" id="other" name="gender" value="other" />
        <label for="other">Other</label>
        <br />
        <p>Year:</p>
        <input type="radio" id="year1" name="age" value="1" />
        <label for="year1">1st Year</label>
        <br />
        <input type="radio" id="year2" name="age" value="2" />
        <label for="year2">2nd Year</label>
        <br />
        <input type="radio" id="year3" name="age" value="3" />
        <label for="year3">3rd Year</label>
        <br />
        <input type="radio" id="year4" name="age" value="4" />
        <label for="year4">4th Year</label>
        <br /> <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Form;
