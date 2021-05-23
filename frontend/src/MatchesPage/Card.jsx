import React from "react";
// import Avatar from "./Avatar";
import { Image } from 'antd';
import Detail from "./Detail";

function Card(props) {
  const romance = props.romance.join(", ");
  const friendship = props.friendship.join(", ");
  const hobbies = props.hobbies.join(", ");
  const partying = props.partying.join(", ");
  return (
    <div className="card">
      <div className="top">
        <p className="mid"> {props.id} </p>
        <p className="name"
        style={{ 
          "margin-top": "50px", 
          "font-family": "Copperplate",
          "font-size" : "35px",
          "font-weight" : "bold"
         }}>
          {props.first} {props.last}
        </p>
        <Image 
        style={{ "margin": "5px" }}
        width={200} 
        src="error" 
        fallback="https://semantic-ui.com/images/wireframe/image.png" />
      </div>
      <div className="bottom"
      style={{ 
          "font-family": "Copperplate",
          "font-size" : "20px",
          "font-weight" : "200"
         }}>
        <Detail label="Gender" detailInfo={props.gender} />
        <Detail label="Major" detailInfo={props.major} />
        <Detail label="Personality" detailInfo={props.personality} />
        <Detail label="Spirituality" detailInfo={props.spirituality} />
        <Detail label="Romance" detailInfo={romance} />
        <Detail label="Hobbies" detailInfo={hobbies} />
        <Detail label="Friendship" detailInfo={friendship} />
        <Detail label="Partying" detailInfo={partying} />
        <Detail label="Score" detailInfo={props.score} />
      </div>
    </div>
  );
}

export default Card;
