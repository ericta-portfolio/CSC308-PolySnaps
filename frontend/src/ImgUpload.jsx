import React, { Component } from "react";
import axios from "axios";
import 'antd/dist/antd.css'
import { Avatar } from 'antd';
import "./styles.css"

class ImgUpload extends Component {

  // talk to prof... this is duplicate code!
  getUserData = (idNum) => {
    var data = null;
    axios.get('http://localhost:5000/getUser/' + idNum)
    .then(res => {
      console.log(res);
      data = res["data"]
      axios
      .get("http://localhost:5000/profile_pic_retrieve/" + data["_id"])
        .then((res) => {
            console.log(res);
            this.setState({
            profileImage: res["data"]
          })
          console.log(res["data"]);
      })
      console.log("This is the state:");
      console.log(this.state.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  state={
    profileImage: "",
    selectedFile: null,
  }

  fileSelectedHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
    console.log(event.target.files[0]);
  };

  fileUploadHandler = () => {
    var data = null;
    const id = localStorage.getItem("id")
    axios.get('http://localhost:5000/getUser/' + id)
    .then(res => {
      console.log(res);
      data = res["data"];
      console.log(data);

      const fd = new FormData();
      fd.append("image", this.state.selectedFile, this.state.selectedFile.name);
      //needs to send an http request
      axios
        .put("http://localhost:5000/profile_pic_upload/" + data["_id"], fd, {
          onUploadProgress: (progressEvent) => {
            console.log(
              "Upload Progress:" +
                Math.round((progressEvent.loaded / progressEvent.total) * 100) +
                "%"
            );
          }
        })
        .then((res) => {
          console.log(res);
          axios
          .get("http://localhost:5000/profile_pic_retrieve/" + data["_id"])
            .then((res) => {
               console.log(res);
               this.setState({
                profileImage: res["data"]
              })
              console.log(res["data"]);
              return res["data"]
          })
          .catch(function (error) {
            console.log(error);
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    
    })
    .catch(function (e) {
    //Not handling the error. Just logging into the console.
      console.log(e);
    });
  };

  render() {
    return (
      <div>
      {(this.state.profileImage == "") ? this.getUserData(localStorage.getItem("id")) : ""}
      <Avatar 
        className="moveImg"
        style={{ "margin-top": "5px" }}
        size={350} 
        icon="img"
        src={this.state.profileImage}
        />
        <input
          // style={{"width":"200px",
          // "position": "relative",
          // "left": "40px"}}
          type="file"
          onChange={this.fileSelectedHandler}
          ref={(fileInput) => (this.fileInput = fileInput)}
        />
        <button 
        className="btn2 upload"
        onClick={this.fileUploadHandler}>Upload</button>
        <div>
        </div>
      </div>
    );
  }
}

export default ImgUpload;
