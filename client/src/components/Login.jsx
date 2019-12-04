import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";

import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    name: "",
    phone: ""
  };
  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };
  handlePhoneChange = event => {
    this.setState({ phone: event.target.value });
  };
  addCustomer = () => {
    fetch(
      `http://localhost:4000/login?name=${this.state.name}&phone=${this.state.phone}`
    );
  };

  render() {
    return (
      <div style={{ position: "absolute", left: "40%", top: "30%" }}>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="(xxx)-xxx-xxxx"
              value={this.state.phone}
              onChange={this.handlePhoneChange}
            />
          </Form.Group>
          <Link to="/main">
            <button
              type="submit"
              className="btn btn-outline-primary btn-lg"
              onClick={this.addCustomer}
            >
              Next
            </button>
          </Link>
        </Form>
      </div>
    );
  }
}

export default Login;
