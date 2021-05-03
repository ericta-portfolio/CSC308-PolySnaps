import React, { useState } from "react";
import hobbiesList from "./data/hobbies.js";
import religionsList from "./data/religions.js";
import interestsList from "./data/interests.js";
import recreationalsList from "./data/recreationals.js";
import majorsList from "./data/majors.js";
import axios from 'axios';

export default function ReactForm() {
  axios.get('http://localhost:5000/cache')
  .then(res => {
    data = res["data"];
  })
  .catch(function (e) {
    //Not handling the error. Just logging into the console.
    console.log(e);
  });
  let submit = true;
  const [error, setError] = useState([false]);
  const [gender, setGender] = useState("");
  const [major, setMajor] = useState("");
  const [personality, setPersonality] = useState("");
  const [romance, setRomance] = useState([]);
  const [friendship, setFriendship] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [spirituality, setSpirituality] = useState("");
  const [partying, setPartying] = useState([]);
  var data = null;

  function handleSubmit() {
    function runError(param) {
      setError([true, param]);
      submit = false;
    }

    const profile = {
      gender: gender !== "" ? gender : runError("Gender"),
      major: major !== "" ? major : runError("Major"),
      personality:
        personality !== "" ? personality : runError("Personality Type"),
      romance: romance.length !== 0 ? romance : runError("Romantic Interests"),
      friendship:
        friendship.length !== 0 ? friendship : runError("Friendship Interests"),
      hobbies: hobbies.length !== 0 ? hobbies : runError("Hobby"),
      spirituality:
        spirituality !== "" ? spirituality : runError("Spirituality"),
      partying: partying.length !== 0 ? partying : runError("Party Favor")
    };

    if (submit) {
      axios
        .put("http://localhost:5000/profileUser/" + data["_id"], profile)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (e) {
          console.log(e);
        });
    } else {
      submit = true;
    }
  }
  function majorChange(event) {
    setMajor(event.target.value);
  }

  function genderChange(event) {
    setGender(event.target.value);
  }

  function personalityChange(event) {
    setPersonality(event.target.value);
  }

  function romanceChange(event) {
    const changedItem = event.target.value;

    if (!romance.includes(changedItem)) {
      setRomance((prevVal) => {
        return [...prevVal, changedItem];
      });
    } else {
      setRomance(romance.filter((option) => option !== changedItem));
    }
  }

  function friendshipChange(event) {
    const changedItem = event.target.value;

    if (!friendship.includes(changedItem)) {
      setFriendship((prevVal) => {
        return [...prevVal, changedItem];
      });
    } else {
      setFriendship(friendship.filter((option) => option !== changedItem));
    }
  }

  function hobbiesChange(event) {
    const changedItem = event.target.value;

    if (!hobbies.includes(changedItem)) {
      setHobbies((prevVal) => {
        return [...prevVal, changedItem];
      });
    } else {
      setHobbies(hobbies.filter((option) => option !== changedItem));
    }
  }

  function spiritualityChange(event) {
    setSpirituality(event.target.value);
  }

  function recreationalChange(event) {
    const changedItem = event.target.value;

    if (!partying.includes(changedItem)) {
      setPartying((prevVal) => {
        return [...prevVal, changedItem];
      });
    } else {
      setPartying(partying.filter((option) => option !== changedItem));
    }
  }

  return (
    <div>
      {/* Gender */}
      <h1>Gender: {gender}</h1>
      <input
        checked={gender === "Male"}
        onChange={genderChange}
        type="radio"
        value="Male"
      />
      <label className="form-input">Male</label>
      <br />
      <input
        checked={gender === "Female"}
        onChange={genderChange}
        type="radio"
        value="Female"
      />
      <label className="form-input">Female</label>
      <br />
      <input
        checked={gender === "Other"}
        onChange={genderChange}
        type="radio"
        value="Other"
      />
      <label className="form-input">Other</label>
      <br />

      {/* Personality */}
      <h1>Personality: {personality}</h1>
      <input
        checked={personality === "Introvert"}
        onChange={personalityChange}
        type="radio"
        value="Introvert"
      />
      <label className="form-input">Introvert</label>
      <br />
      <input
        checked={personality === "Extrovert"}
        onChange={personalityChange}
        type="radio"
        value="Extrovert"
      />
      <label className="form-input">Extrovert</label>
      <br />
      <input
        checked={personality === "In Between"}
        onChange={personalityChange}
        type="radio"
        value="In Between"
      />
      <label className="form-input">In Between</label>
      <br />

      {/* Major */}
      <h1>Major: {major}</h1>
      {majorsList.map((majorItem) => (
        <div>
          <input
            checked={major === majorItem}
            onChange={majorChange}
            type="radio"
            value={majorItem}
          />
          <label className="form-input">{majorItem}</label>
        </div>
      ))}

      {/* Romance */}
      <h1>Romantic Interests: {romance}</h1>
      {interestsList.map((interest) => (
        <div>
          <input
            onChange={romanceChange}
            type="checkbox"
            placeholder={interest}
            value={interest}
          />
          <span className="form-input">{interest}</span>
        </div>
      ))}

      {/* Friendship */}
      <h1>Friendship Interest: {friendship}</h1>
      {interestsList.map((interest) => (
        <div>
          <input
            onChange={friendshipChange}
            type="checkbox"
            placeholder={interest}
            value={interest}
          />
          <span className="form-input">{interest}</span>
        </div>
      ))}

      {/* Hobbies */}
      <h1>Hobbies: {hobbies}</h1>
      {hobbiesList.map((hobby) => (
        <div>
          <input
            onChange={hobbiesChange}
            type="checkbox"
            placeholder={hobby}
            value={hobby}
          />
          <span className="form-input">{hobby}</span>
        </div>
      ))}

      {/* Spirituality */}
      <h1>Spirituality: {spirituality}</h1>
      {religionsList.map((religion) => (
        <div>
          <input
            checked={spirituality === religion}
            onChange={spiritualityChange}
            type="radio"
            value={religion}
          />
          <label className="form-input">{religion}</label>
        </div>
      ))}

      {/* Partying */}
      <h1>Party Favors: {partying}</h1>
      {recreationalsList.map((recreational) => (
        <div>
          <input
            onChange={recreationalChange}
            type="checkbox"
            placeholder={recreational}
            value={recreational}
          />
          <span className="form-input">{recreational}</span>
        </div>
      ))}

      <br />

      {/* Incomplete Submission Handler + Submit Button */}
      {error[0] && (
        <div>
          <span>Incomplete Submission, what's your {error[1]}?</span>
          <button onClick={() => setError(false)}>Close</button>
        </div>
      )}
      <button onClick={handleSubmit} type="submit">
        Submit
      </button>
    </div>
  );
}
