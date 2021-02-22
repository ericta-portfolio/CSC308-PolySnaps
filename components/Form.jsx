import React from "react";
import { useForm } from "react-hook-form";

function Form() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Name:
          <input type="text" name="name" ref={register} />
        </label>
        <br />
        <label>
          Major:
          <input type="text" name="major" ref={register} />
        </label>
        <br />
        <label>
          Hometown:
          <input type="text" name="hometown" ref={register} />
        </label>
        <br />
        <label>
          Hobbies:
          <input type="text" name="hobbies" ref={register} />
        </label>
        <br />
        <p>Gender:</p>
        <input
          type="radio"
          id="male"
          name="gender"
          value="male"
          ref={register}
        />
        <label htmlFor="male">Male</label>
        <br />
        <input
          type="radio"
          id="female"
          name="gender"
          value="female"
          ref={register}
        />
        <label htmlFor="female">Female</label>
        <br />
        <input
          type="radio"
          id="other"
          name="gender"
          value="other"
          ref={register}
        />
        <label htmlFor="other">Other</label>
        <br />
        <p>Year:</p>
        <input type="radio" id="year1" name="year" value="1" ref={register} />
        <label htmlFor="year1">1st Year</label>
        <br />
        <input type="radio" id="year2" name="year" value="2" ref={register} />
        <label htmlFor="year2">2nd Year</label>
        <br />
        <input type="radio" id="year3" name="year" value="3" ref={register} />
        <label htmlFor="year3">3rd Year</label>
        <br />
        <input type="radio" id="year4" name="year" value="4" ref={register} />
        <label htmlFor="year4">4th Year</label>
        <br />
        <input type="radio" id="year5" name="year" value="5" ref={register} />
        <label htmlFor="year5">5th Year</label>
        <br /> <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Form;
