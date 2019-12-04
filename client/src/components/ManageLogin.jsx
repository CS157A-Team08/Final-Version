import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";

import { Link } from "react-router-dom";

class ManageLogin extends Component {
  state = {
    staffAcc: [],
    validInfor: false
  };

  render() {
    return (
      <div style={{ position: "absolute", left: "40%", top: "30%" }}>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="email" placeholder="Enter Username" />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Form>

        <Link to="/managemenu">
          <button type="button" className="btn btn-outline-primary btn-lg">
            Login
          </button>
        </Link>
      </div>
    );
  }
}

export default ManageLogin;
