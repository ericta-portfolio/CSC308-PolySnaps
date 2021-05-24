import React from "react";
import ReactForm from "./ReactForm";
import ImgUpload from "../ImgUpload";
import './profile.css';

function ProfileFormPage() {
  return (
    <div>
      <label className="prof-input">
      <h1>Upload Your Profile Picture:</h1>
      <ImgUpload />
      {/* <h2> Insert: </h2> */}
      </label>
      <ReactForm />
     
      
    </div>
  );
}

export default ProfileFormPage;
