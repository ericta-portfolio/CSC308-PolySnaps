

import React, { Component } from "react";
import Card from "./Card";
import profiles from "./profiles";
import axios from "axios";

export default class MatchesPage extends Component {
  state = {
    profiles: [],
    response: false
  };

  componentDidMount() {
    this.setState({ profiles: profiles, response: true });
    // axios
    //   .get("http://localhost:5000/newUsers")
    //   .then((res) => {
    //     const profileList = res.data;
    //     this.setState({ profiles: profileList, response: true });
    //   })
    //   .catch(function (error) {
    //     //Not handling the error. Just logging into the console.
    //     console.log(error);
    //   })
  }

  render() {
    return (
      <div>
        <h1 className="heading">My Matches</h1>
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
        return p.id !== id;
      })
    });
  };

  createCard = (profile) => {
    return (
      <div>
        <button>Accept</button>
        <button onClick={() => this.removeCard(profile.id)}>Reject</button>
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
      </div>
    );
  };
}
