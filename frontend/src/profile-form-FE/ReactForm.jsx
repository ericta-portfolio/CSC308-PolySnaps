import React, { useState } from "react";
import hobbiesList from "./data/hobbies.js";
import religionsList from "./data/religions.js";
import interestsList from "./data/interests.js";
import recreationalsList from "./data/recreationals.js";
import majorsList from "./data/majors.js";
import axios from "axios";
import ImgUpload from "../ImgUpload";
import "./profileform-radio.css";
import "./profileform-checkbox.css";

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
      major: major !== "" ? major : runError("Major"),
      personality:
        personality !== "" ? personality : runError("Personality Type"),
      romance: romance.length !== 0 ? romance : runError("Romantic Interests"),
      friendship:
        friendship.length !== 0 ? friendship : runError("Friendship Interests"),
      hobbies: hobbies.length !== 0 ? hobbies : runError("Hobby"),
      spirituality:
        spirituality !== "" ? spirituality : runError("Spirituality"),
      partying: partying.length !== 0 ? partying : runError("Party Favor"),
    };

    if (submit) {
      const id = localStorage.getItem("id");
      axios
        .put("http://localhost:5000/profileUser/" + id, profile)
        .then(function (response) {
          console.log(response);
          const data = response.data;
          localStorage.setItem("id", data);
          window.location.href = "http://localhost:3000/MatchesPage";
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

  function deselectRecreational(event) {
    const changedItem = event.target.value;
    var recr = document.getElementsByClassName("recreationals");
    var deselectRec = document.getElementById("deselectRec");
    if (deselectRec.checked) {
      for (var i = 0; i < recr.length; i++) {
        recr[i].checked = false;
      }
    }
    if (!partying.includes(changedItem)) {
      setPartying((prevVal) => {
        return [...prevVal, changedItem];
      });
    } else {
      setPartying(partying.filter((option) => option !== changedItem));
    }
  }

  return (
    <>
      <h1 className="titleofPage"> Fill out Profile Form Below </h1>
      {/* <h1>Upload Your Profile Picture:</h1> */}
      <ImgUpload />
      <div className="moveEverything">
        {/* Personality */}
        <h1 className="titles">Personality:</h1>
        <label className="container2">
          Introvert
          <input
            checked={personality === "Introvert"}
            onChange={personalityChange}
            type="radio"
            value="Introvert"
          />
          <span className="checkmark"></span>
        </label>
        <br />
        <label className="container2">
          Extrovert
          <input
            checked={personality === "Extrovert"}
            onChange={personalityChange}
            type="radio"
            value="Extrovert"
          />
          <span className="checkmark"></span>
        </label>
        <br />
        <label className="container2">
          In Between
          <input
            checked={personality === "In Between"}
            onChange={personalityChange}
            type="radio"
            value="In Between"
          />
          <span className="checkmark"></span>
        </label>
        <br />

        {/* Major */}
        <h1 className="titles">Major:</h1>
        {majorsList.map((majorItem) => (
          <div>
            <label className="container2">
              {majorItem}
              <input
                name="major"
                checked={major === majorItem}
                onChange={majorChange}
                type="radio"
                value={majorItem}
              />
              <span className="checkmark"></span>
            </label>
          </div>
        ))}

        {/* Romance */}
        <h1 className="titles">Romantic Interests:</h1>
        {interestsList.map((interest) => (
          <div>
            <label className="containerbox">
              {interest}
              <input
                id="romance"
                onChange={romanceChange}
                type="checkbox"
                placeholder={interest}
                value={interest}
              />
              <span className="checkmarkbox"></span>
            </label>
          </div>
        ))}

        {/* Friendship */}
        <h1 className="titles">Friendship Interest:</h1>
        {interestsList.map((interest) => (
          <div>
            <label className="containerbox">
              {interest}
              <input
                name="friendship"
                onChange={friendshipChange}
                type="checkbox"
                placeholder={interest}
                value={interest}
              />
              <span className="checkmarkbox"></span>
            </label>
          </div>
        ))}

        {/* Hobbies */}
        <h1 className="titles">Hobbies:</h1>
        {hobbiesList.map((hobby) => (
          <div>
            <label className="containerbox">
              {hobby}
              <input
                name="hobbies"
                onChange={hobbiesChange}
                type="checkbox"
                placeholder={hobby}
                value={hobby}
              />
              <span className="checkmarkbox"></span>
            </label>
          </div>
        ))}

        {/* Spirituality */}
        <h1 className="titles">Spirituality:</h1>
        {religionsList.map((religion) => (
          <div>
            <label className="container2">
              {religion}
              <input
                name="spirituality"
                checked={spirituality === religion}
                onChange={spiritualityChange}
                type="radio"
                value={religion}
              />
              <span className="checkmark"></span>
            </label>
          </div>
        ))}

        {/* Partying */}
        <h1 className="titles">Party Favors:</h1>
        {recreationalsList.map((recreational) => {
          if (recreational != "None") {
            return (
              <div>
                <label className="containerbox">
                  {recreational}
                  <input
                    name="partying"
                    onChange={recreationalChange}
                    type="checkbox"
                    className="recreationals"
                    placeholder={recreational}
                    value={recreational}
                  />
                  <span className="checkmarkbox"></span>
                </label>
              </div>
            );
          } else {
            return (
              <div>
                <label className="containerbox">
                  {recreational}
                  <input
                    name="noparty"
                    onChange={deselectRecreational}
                    type="checkbox"
                    placeholder={recreational}
                    value={recreational}
                    id="deselectRec"
                  />
                  <span className="checkmarkbox"></span>
                </label>
              </div>
            );
          }
        })}

        <br />

        {/* Incomplete Submission Handler + Submit Button */}
        {error[0] && (
          <div>
            <span id="incompleteform">
              Incomplete Submission, what's your {error[1]}?
            </span>
            <button onClick={() => setError(false)}>Close</button>
          </div>
        )}
        <h3>
          <button className="submitbtn" onClick={handleSubmit} type="submit">
            Submit
          </button>
        </h3>
      </div>
    </>
  );
}
