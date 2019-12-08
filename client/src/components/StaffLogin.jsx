import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";

import { Link } from "react-router-dom";
import { throws } from "assert";

class StaffLogin extends Component {
  state = {
    staffAcc: [],
    password:"",
    validInfor: false
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  stafflogin = () => {
    fetch(
      `http://localhost:4000/stafflogin?password=${this.state.password}`
    ).then(response => response.json())
    .then(response => { 
      console.log(response.data[0]);
      if(response.data[0].password==this.state.password)
        console.log('success');
      else
        console.log('fail');
    })

  };
  render

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
            <Form.Control type="password" placeholder="Password" onChange={this.handlePasswordChange}/>
            
          </Form.Group>
        </Form>

        <Link to="/order">
          <button type="button" className="btn btn-outline-primary btn-lg "onClick={this.stafflogin}>
            Login
          </button>
        </Link>
      </div>
    );
  }
}

export default StaffLogin;
