import React, { Component } from "react";
import Card from "../MatchesPage/Card";
import axios from "axios";

export default class MatchesPage extends Component {
  state = {
    profiles: [],
    response: false,
    failure: false
  };

  componentDidMount() {
    const id = localStorage.getItem("id");
    axios
      .get("http://localhost:5000/getAccepted/" + id)
      .then((res) => {
        const profileList = res.data;
        this.setState({ profiles: profileList, response: true, failure:false} );
      })
      .catch((error) => {
        //Not handling the error. Just logging into the console.
        this.setState({ profiles: [], response: true, failure: true });
      })
  }

  render() {
    if (!this.state.response) {
      return null;
    }
    if (this.state.failure || this.state.profiles === "no accepted matches") {
      return (<h4>No accepted matches found</h4>);
    }
    return (
      <div>
        <h1 className="heading"
        style={{ 
          "font-family": "Copperplate"}}>My Accepted Matches</h1>
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
      })
    });
  };

  createCard = (profile) => {
    return (
      <div key={profile._id}>
        <Card
          //this key must be written like that!
          // it can be  string, number, but it must be unique across
          // all of the repeated components
          key={profile._id}
          //has to be the name inside the contact (contact.NAMEINCONTACT)
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
      </div>
    );
  };
}
