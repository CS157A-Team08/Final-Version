
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

class EditStaff extends Component {
  state = {
    empID: "",
    name: "",
    phone: "",
    position: "",
    password: ""
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
  editStaff = () => {
    fetch(
      `http://localhost:4000/editStaff?empID=${this.state.empID}&name=${this.state.name}&phone=${this.state.phone}&position=${this.state.position}&password=${this.state.password}`
    );
  };

  componentDidMount() {
    const { empID } = this.props.location.state;
    this.setState({ empID: empID });
    this.getCurrStaff(empID);
  }

  getCurrStaff = (empID) => {
    fetch("http://localhost:4000/employee/" + empID)
      .then(response => response.json())
      .then(response => {
        console.log("***DEBUG MSG: Get Current Staff Selection for edit - state empID: " + this.state.empID );
        //this.setState({ currStaff: response.data[0] });
        this.setState({ name: response.data[0].name });
        this.setState({ phone: response.data[0].phone });
        this.setState({ position: response.data[0].position });
        this.setState({ password: response.data[0].password });
        //this.getShiftRec(empID);
        console.log("***DEBUG MSG: Get Current Staff Selection for edit - new current staff: " + response.data[0].name );
      })
      .catch(err => console.error(err));
  };

  render() {
    return (
      <div style={{ position: "absolute", left: "40%", top: "30%" }}>
        <h3>Edit staff information:</h3>
        <br/>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              value={this.state.phone}
              onChange={this.handlePhoneChange}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Position</Form.Label>
    <Form.Control as="select" value={this.state.position}
              onChange={this.handlePositionChange}>
                <option>Server</option>
      <option>Host</option>
      <option>Chef</option>
      <option>Kitchen Staff</option>
      <option>Manager</option>
      <option>Owner</option> 
    </Form.Control>
  </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </Form.Group>

        </Form>

        <Link to="/main/staffpage">
            <button
              type="submit"
              className="btn btn-outline-primary btn-lg"
              onClick={this.editStaff}
            >
              Submit
            </button>
        </Link>
        &ensp;
        <Link to="/main/staffpage">
            <button
              type="submit"
              className="btn btn-outline-primary btn-lg"
            >
              Cancel
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

export default EditStaff;
