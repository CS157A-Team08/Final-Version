import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";

import { Link } from "react-router-dom";

class StaffLogin2 extends Component {
  state = {
    staffAcc: [],
    route: "/main/staff2", //ini as current page
    username: "",
    password: ""
  };
  componentDidMount() {
    this.getAccounts();
  }

  getAccounts = () => {
    fetch("http://localhost:4000/staffaccounts")
      .then(response => response.json())
      .then(response => this.setState({ staffAcc: response.data }))
      .catch(err => console.error(err));
  };
  handleUserName = event => {
    this.setState({ username: event.target.value });
  };
  handlePass = event => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <div style={{ position: "absolute", left: "40%", top: "30%" }}>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Username"
              value={this.state.username}
              onChange={this.handleUserName}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handlePass}
            />
          </Form.Group>
        </Form>

        <Link to={this.state.route}>
          <button
            type="button"
            className="btn btn-outline-primary btn-lg"
            onClick={() => {
              let temp = 1;
              const accounts = [...this.state.staffAcc];
              const name = this.state.username;
              const pass = this.state.password;
              for (let i = 0; i < accounts.length; i++) {
                if (
                  accounts[i].name === name &&
                  accounts[i].password === pass
                ) {
                  console.log("here you go");
                  temp = 5;
                }
              }
              if (temp === 5) {
                //change the route here to order page
                this.setState({ route: "/main/showorders" });
                console.log(
                  accounts[0].username +
                    " " +
                    name +
                    " " +
                    accounts[0].password +
                    " " +
                    pass
                );
              } else {
                alert("Incorrect Username or Password");
              }
            }}
          >
            Login
          </button>
        </Link>
      </div>
    );
  }
}

export default StaffLogin2;
