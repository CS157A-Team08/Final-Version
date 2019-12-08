import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Navbar, Nav, NavDropdown, Form } from "react-bootstrap";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Self-Ordering</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/">
              <Nav.Link href="#home">Home</Nav.Link>
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

            <Link to="/main/staffbio">
              <Nav.Link href="#staffbio">Staff Directory</Nav.Link>
            </Link>
          </Nav>
          <Form inline>
            <Link to="/managelogin">
              <Button variant="outline-success">Add</Button>
            </Link>
            <Link to="/staff">
              <Button variant="outline-success">Staff Login</Button>
            </Link>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
