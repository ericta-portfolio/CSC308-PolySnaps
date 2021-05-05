import React from "react";
import { Navbar, Nav } from 'react-bootstrap';
import "./Navbar.css"
import logo from "../signup-page/logo4.png";
//remember to add react-bootstrap as a dependency

function Navbarr()
{
  return (
    <>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"></link>
    <div>
    <Navbar bg="primary" variant="dark" id="navbarID">
            <Navbar.Brand href="/" id="brand"><img id="logo" src={logo} alt="PolySnaps Logo" /></Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/Signup" id="link0">Signup</Nav.Link>
                    <Nav.Link href="/Login" id="link2">Login</Nav.Link>
                    <Nav.Link href="/ProfileForm" id="link1">Profile Form</Nav.Link>
                    <Nav.Link href="/MatchesPage" id="link3">Matches Page</Nav.Link>
                </Nav>
    </Navbar>
    </div>
    </>
  )
}

export default Navbarr;
