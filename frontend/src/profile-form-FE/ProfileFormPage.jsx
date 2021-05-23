import React from "react";
import ReactForm from "./ReactForm";
import ImgUpload from "../ImgUpload";

function ProfileFormPage() {
  return (
    <div>
      <h1>Upload Your Profile Picture:</h1>
      <ImgUpload />
      <h1> Profile Form: </h1>
      <ReactForm />
    </div>
  );
}

export default ProfileFormPage;
