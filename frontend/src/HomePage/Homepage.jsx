import React from "react";
import Testimonial from "./Testimonial";
import testimonials from "./testimonials";

export default function Homepage() {
  function createTestimonial(testimonial) {
    return (
      <Testimonial
        key={testimonial.id}
        img={testimonial.img}
        name={testimonial.name}
        content={testimonial.content}
      />
    );
  }

  return (
    <div>    
      <div
        style={{
          display: "flex",
          flexDirection: "row"
        }}
      >
        <img
          style={{ width: "50%", margin: "60px" }}
          src="https://www.calpoly.edu/sites/calpoly.edu/files/inline-images/grandAveWelcome.jpg"
          alt="homepage-pic"
        />
        <div style={{ width: "50%", margin: "60px 20px" }}>
          <h1
          style={{
            "font-family":"Open Sans",
            "font-weight" : "300",
            "font-size" : "50px"
          }}>Welcome to PolySnaps!</h1>
          <span
          style={{
            "font-family":"Open Sans",
            "font-weight" : "300",
            "font-size" : "23px"
          }}>
            Life is often lonely and it is bleak, though it is better to be
            spent together. There is a need for community in every person, and
            it often goes unmet. PolySnaps makes it easier for students at Cal
            Poly to create and foster intimate friendships and relationships
            with a simple matching algorithm based on interests and majors; its
            scope is limited to Cal Poly SLO students. Users can sign up for an
            account, fill out a profile questionnaire, and match with other
            users that have similarities to themselves.
          </span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row"
        }}
      >
        {testimonials.map(createTestimonial)}
      </div>
    </div>
  );
}
