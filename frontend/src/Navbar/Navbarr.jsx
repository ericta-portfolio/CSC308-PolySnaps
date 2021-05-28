import { React, Component } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import "./Navbar.css";
import logo from "../signup-page/logo4.png";
//remember to add react-bootstrap as a dependency

export default class Navbarr extends Component {
  login() {
    window.location.href = "http://localhost:3000/Login";
  }

  logout() {
    // send to home page
    localStorage.setItem("id", "null");
    this.setState({ funct: this.login.bind(this), text: "Log In" });
    window.location.href = "http://localhost:3000/";
  }

  state = {
    funct: undefined,
    text: undefined,
  };

  componentDidMount() {
    if (localStorage.getItem("id") == "null") {
      this.setState({ funct: this.login.bind(this), text: "Log In" });
    } else {
      this.setState({ funct: this.logout.bind(this), text: "Log Out" });
    }
  }
  render() {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
          crossorigin="anonymous"
        ></link>
        <div>
          {(localStorage.getItem("id") == "null") ? (
            <Navbar bg="primary" variant="dark" id="navbarID">
              <Navbar.Brand href="/" id="brand">
                <img
                  className="logoimg"
                  id="logo"
                  src={logo}
                  alt="PolySnaps Logo"
                />
              </Navbar.Brand>
                <Button variant="secondary" onClick={this.state.funct} id="log">
                  {this.state.text}
                </Button>
            </Navbar>
          ) : (
            <Navbar bg="primary" variant="dark" id="navbarID">
              <Navbar.Brand href="/" id="brand">
                <img
                  className="logoimg"
                  id="logo"
                  src={logo}
                  alt="PolySnaps Logo"
                />
              </Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link href="/ProfileForm" id="link0">
                  Profile Form
                </Nav.Link>
                <Nav.Link href="/MatchesPage" id="link1">
                  Matches Page
                </Nav.Link>
                <Nav.Link href="/AcceptedPage" id="link2">
                  Accepted Matches
                </Nav.Link>
                <Button variant="secondary" onClick={this.state.funct} id="log">
                  {this.state.text}
                </Button>
              </Nav>
            </Navbar>
          )}
        </div>
      </>
    );
  }
}
