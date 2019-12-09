import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

class AddStaff extends Component {
  state = {
    empID: "",
    name: "",
    phone: "",
    position: "",
    password: ""
  };
  handleEmpIDChange = event => {
    this.setState({ empID: event.target.value });
  };
  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };
  handlePhoneChange = event => {
    this.setState({ phone: event.target.value });
  };
  handlePositionChange = event => {
    this.setState({ position: event.target.value });
  };
  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };
  addStaff = () => {
    fetch(
      `http://localhost:4000/addStaff?empID=${this.state.empID}&name=${this.state.name}&phone=${this.state.phone}
      &position=${this.state.position}&password=${this.state.password}`
    );
  };

  render() {
    return (
      <div style={{ position: "absolute", left: "40%", top: "30%" }}>
        <h3>Add new staff information:</h3>
        <br/>

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

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Position</Form.Label>
            <Form.Control
              type="text"
              placeholder="position"
              value={this.state.position}
              onChange={this.handlePositionChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </Form.Group>

        </Form>

        <Link to="/main/staffpage">
            <button
              type="submit"
              className="btn btn-outline-primary btn-lg"
              onClick={this.addStaff}
            >
              Add Staff
            </button>
        </Link>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        </div>

    );
  }
}

export default AddStaff;
