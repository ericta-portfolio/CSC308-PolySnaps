import React, { Component } from "react";
import Card from "./Card";
import profiles from "../profiles";
import axios from "axios";

export default class App extends Component {
  state = {
    profiles: [],
    response: false
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/newUsers")
      .then((res) => {
        const profileList = res.data;
        this.setState({ profiles: profileList, response: true });
      })
      .catch(function (error) {
        //Not handling the error. Just logging into the console.
        console.log(error);
      });
  }

  render() {
    if (!this.state.response) {
      return;
    }
    return (
      <div>
        <h1 className="heading">My Matches</h1>
        <dl className="dictionary">{profiles.map(createCard)} </dl>
      </div>
    );
  }
}

function createCard(profile) {
  return (
    <Card
      //this key must be written like that!
      // it can be  string, number, but it must be unique across
      // all of the repeated components
      key={profile.id}
      //has to be the name inside the contact (contact.NAMEINCONTACT)
      id={profile.id}
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
      img={profile.imgURL}
    />
  );
}
