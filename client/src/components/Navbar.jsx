import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Navbar, Nav, NavDropdown, Form } from "react-bootstrap";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">MYSQL DINER</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/main">
              <Nav.Link href="/main">Menu</Nav.Link>
            </Link>

            <NavDropdown title="Category" id="basic-nav-dropdown">
              <Link to="/main">
                {" "}
                <NavDropdown.Item href="#action/3.1">All</NavDropdown.Item>
              </Link>
              <NavDropdown.Divider />
              <Link to="/main/recommendation">
                {" "}
                <NavDropdown.Item href="#action/3.1">
                  Recommendation
                </NavDropdown.Item>
              </Link>
              <Link to="/main/seafood">
                {" "}
                <NavDropdown.Item href="#action/3.2">Seafood</NavDropdown.Item>
              </Link>
              <Link to="/main/sides">
                {" "}
                <NavDropdown.Item href="#action/3.3">Sides</NavDropdown.Item>
              </Link>

              <Link to="/main/drinks">
                <NavDropdown.Item href="#action/3.4">Drinks</NavDropdown.Item>
              </Link>
            </NavDropdown>

            <Link to="/main/staffpage">
              <Nav.Link href="#staffpage">Staff Directory</Nav.Link>
            </Link>
          
          <Link to="/main/showMenu">
              <Nav.Link href="#showMenu">Menu Directory</Nav.Link>
            </Link>
          </Nav>
          <Form inline>
        
            <Link to="/main/staff1">
              <Button variant="outline-dark">Manage</Button>
            </Link>
          
          <Link to="/main/staff2">
              <Button variant="outline-dark">Staff</Button>
            </Link>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
