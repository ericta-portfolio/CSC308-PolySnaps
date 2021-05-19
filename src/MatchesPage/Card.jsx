import React from "react";
import Avatar from "./Avatar";
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
        <p className="name">
          {props.first} {props.last}
        </p>
        <Avatar img={props.img} />
      </div>
      <div className="bottom">
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
