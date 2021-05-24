import React, { useState } from "react";
import hobbiesList from "./data/hobbies.js";
import religionsList from "./data/religions.js";
import interestsList from "./data/interests.js";
import recreationalsList from "./data/recreationals.js";
import majorsList from "./data/majors.js";
import axios from 'axios';
import './profile.css';

export default function ReactForm() {
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
      const id = localStorage.getItem("id");
      axios
        .put("http://localhost:5000/profileUser/" + id, profile)
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
  <label className="format-titles">  
    <div>
      <h1> Fill out Profile Form Below: </h1>
      {/* Gender */}
      <h1>Gender:</h1>
      <label className="gender-input">
      <h1>Gender:</h1>
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
      </label>
      <br />

      {/* Personality */}
      <h1>Personality:</h1>
      <label className="person-input">
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
      </label>
      <br />

      {/* Major */}
      <h1>Major:</h1>
      {majorsList.map((majorItem) => (
        <div>
           <label className="major-input">
          <input
            checked={major === majorItem}
            onChange={majorChange}
            type="radio"
            value={majorItem}
          />
          <label className="form-input">{majorItem}</label>
          </label>
        </div>
      ))}

      {/* Romance */}
      <h1>Romantic Interests:</h1>
      {interestsList.map((interest) => (
        <div>
          <label className="romance-input">
          <input
            onChange={romanceChange}
            type="checkbox"
            placeholder={interest}
            value={interest}
          />
          <label className="form-input">{interest}</label>
          </label>
        </div>
      ))}

      {/* Friendship */}
      <h1>Friendship Interest:</h1>
      {interestsList.map((interest) => (
        <div>
          <label className="friend-input">
          <input
            onChange={friendshipChange}
            type="checkbox"
            placeholder={interest}
            value={interest}
          />
          <label className="form-input">{interest}</label>
          </label>
        </div>
      ))}

      {/* Hobbies */}
      <h1>Hobbies:</h1>
      {hobbiesList.map((hobby) => (
        <div>
          <label className="hobb-input">
          <input
            onChange={hobbiesChange}
            type="checkbox"
            placeholder={hobby}
            value={hobby}
          />
          <label className="form-input">{hobby}</label>
          </label>
        </div>
      ))}

      {/* Spirituality */}
      <h1>Spirituality:</h1>
      {religionsList.map((religion) => (
        <div>
          <label className="spirit-input">
          <input
            checked={spirituality === religion}
            onChange={spiritualityChange}
            type="radio"
            value={religion}
          />
          <label className="form-input">{religion}</label>
          </label>
        </div>
      ))}

      {/* Partying */}
      <h1>Party Favors:</h1>
      {recreationalsList.map((recreational) => (
        <div>
          <label className="party-input">
          <input
            onChange={recreationalChange}
            type="checkbox"
            placeholder={recreational}
            value={recreational}
          />
          <label className="form-input">{recreational}</label>
          </label>
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
      <h3>
      <button onClick={handleSubmit} type="submit">
        Submit
      </button>
      </h3>
    </div>
  </label>
  );
}
