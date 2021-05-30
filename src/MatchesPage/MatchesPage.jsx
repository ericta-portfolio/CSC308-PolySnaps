import React, { Component } from "react";
import Card from "./Card";
import axios from "axios";
import "./matches.css";

export default class MatchesPage extends Component {
  state = {
    profiles: [],
    response: false,
    failure: false,
  };

  componentDidMount() {
    const id = localStorage.getItem("id");
    const jsonId = { id: id };
    axios
      .post("https://polysnaps-be.herokuapp.com/matches", jsonId)
      .then((res) => {
        const profileList = res.data;
        this.setState({
          profiles: profileList,
          response: true,
          failure: false,
        });
      })
      .catch((error) => {
        //Not handling the error. Just logging into the console.
        this.setState({ profiles: [], response: true, failure: true });
      });
  }

  render() {
    if (!this.state.response) {
      return null;
    }
    if (this.state.profiles.length === 0 || this.state.failure) {
      return (
        <h4
          style={{
            "font-family": "Copperplate",
            "text-align": "center",
          }}
        >
          No matches found
        </h4>
      );
    }
    return (
      <div>
        <h1
          className="heading"
          style={{
            "font-family": "Copperplate",
            "text-align": "center",
          }}
        >
          My Matches
        </h1>
        <dl className="dictionary">
          {this.state.profiles.map(this.createCard)}{" "}
        </dl>
      </div>
    );
  }

  removeCard = (id) => {
    console.log(this.state.profiles);
    this.setState({
      profiles: this.state.profiles.filter(function (p) {
        return p._id !== id;
      }),
    });
  };

  reject = (id) => {
    axios
      .post(
        "https://polysnaps-be.herokuapp.com/rejectMatch/" +
          localStorage.getItem("id"),
        { match: id }
      )
      .then((res) => {
        console.log("rejected");
      });
  };

  accept = (id) => {
    axios
      .post(
        "https://polysnaps-be.herokuapp.com/acceptMatch/" +
          localStorage.getItem("id"),
        { match: id }
      )
      .then((res) => {
        console.log("rejected");
      });
    axios
      .post(
        "https://polysnaps-be.herokuapp.com/rejectMatch/" +
          localStorage.getItem("id"),
        { match: id }
      )
      .then((res) => {
        console.log("rejected");
      });
  };

  createCard = (profile) => {
    return (
      <div key={profile._id}>
        <dl className="dictionary">
          <Card
            key={profile._id}
            id={profile._id}
            first={profile.first}
            last={profile.last}
            gender={profile.gender}
            major={profile.major}
            personality={profile.personality}
            romance={profile.romance}
            friendship={profile.friendship}
            hobbies={profile.hobbies}
            spirituality={profile.spirituality}
            partying={profile.partying}
            score={profile.score}
          />
          <button
            className="button-accept"
            styles={{
              position: "relative",
              top: "700px",
            }}
            onClick={() => {
              this.accept(profile._id);
              this.removeCard(profile._id);
            }}
          >
            Accept
          </button>
          <button
            className="button-reject"
            onClick={() => {
              this.reject(profile._id);
              this.removeCard(profile._id);
            }}
          >
            Reject
          </button>
        </dl>
      </div>
    );
  };
}
