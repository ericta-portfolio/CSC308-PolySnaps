import React from "react";

export default function Testimonial(props) {
  return (
    <div
      className="term"
      style={{
        height: "400px",
        width: "400px",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        float: "left"
      }}
    >
      <dt>
        <img
          className="testimonial-img"
          src={props.img}
          alt="testimonial-img"
          style={{
            borderRadius: "50%",
            width: "150px",
            height: "150px",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        />
        <h1>{props.name}</h1>
      </dt>
      <dd>{props.content}</dd>
    </div>
  );
}
