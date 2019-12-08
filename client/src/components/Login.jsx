import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";

import { Link } from "react-router-dom";
import { runInThisContext } from "vm";
var cus;
class Login extends Component {
  state = {
    name: "",
    phone: "",
    id:""
  
  };
  constructor() {
    super();
    this.addCustomer=this.addCustomer.bind(this);
  }
  
  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };
  handlePhoneChange = event => {
    this.setState({ phone: event.target.value });
  };
  addCustomer = () => {
    fetch(
      `http://localhost:4000/signup?name=${this.state.name}&phone=${this.state.phone}`
    ).then(response => response.json())
    .then(response => { this.cus=response.data[0].customerID;console.log(this.cus);
    this.setState({id:response.data[0].customerID});
  });

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
console.log(cus);
export default Login;
