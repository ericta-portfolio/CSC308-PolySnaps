import React, { useState } from "react";
// import Avatar from "./Avatar";
import { Image } from "antd";
import Detail from "../MatchesPage/Detail";
import ImgUpload from "../ImgUpload";
import axios from "axios";

function Card(props) {
  const [profileImage, setProfileImage] = useState({ image: "" });

  //FIX DUPLICATE CODE!!
  const getUserData = (idNum) => {
    var data = null;
    axios
      .get("http://localhost:5000/getUser/" + idNum)
      .then((res) => {
        console.log(res);
        data = res["data"];
        axios
          .get("http://localhost:5000/profile_pic_retrieve/" + data["_id"])
          .then((res) => {
            console.log(res);
            setProfileImage({
              image: res["data"],
            });
            console.log(res["data"]);
          });
        console.log("This is the state:");
        console.log(profileImage.image);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const romance = props.romance.join(", ");
  const friendship = props.friendship.join(", ");
  const hobbies = props.hobbies.join(", ");
  const partying = props.partying.join(", ");
  return (
    <div className="term">
      {console.log(props.id)}
      {profileImage.image == "" ? getUserData(props.id) : ""}
      <div className="top">
        <dt>
          <p
            className="name"
            style={{
              "margin-top": "50px",
              "font-family": "Copperplate",
              "font-size": "35px",
              "font-weight": "bold",
            }}
          >
            {props.first} {props.last}
          </p>
        </dt>
        <Image
          style={{ margin: "5px" }}
          width={300}
          src={profileImage.image}
          fallback="https://semantic-ui.com/images/wireframe/image.png"
        />
      </div>
      <div
        className="bottom"
        style={{
          "font-family": "Copperplate",
          "font-size": "20px",
          "font-weight": "200",
        }}
      >
        <dd>
          <Detail label="Gender" detailInfo={props.gender} />
          <Detail label="Major" detailInfo={props.major} />
          <Detail label="Personality" detailInfo={props.personality} />
          <Detail label="Spirituality" detailInfo={props.spirituality} />
          <Detail label="Romance" detailInfo={romance} />
          <Detail label="Hobbies" detailInfo={hobbies} />
          <Detail label="Friendship" detailInfo={friendship} />
          <Detail label="Partying" detailInfo={partying} />
          <Detail label="Score" detailInfo={props.score} />
        </dd>
      </div>
    </div>
  );
}

export default Card;
