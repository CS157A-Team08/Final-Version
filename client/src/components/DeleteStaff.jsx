import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

class DeleteStaff extends Component {
  state = {
    empID: ""
  };
  handleEmpIDInput = event => {
    this.setState({ empID: event.target.value });
  };
  deleteStaff = () => {
    fetch( `http://localhost:4000/deleteStaff/${this.state.empID}` );
  };

  componentDidMount() {
    const { empID } = this.props.location.state;
    this.setState({ empID: empID });
  }

  render() {
    return (
      <div style={{ position: "absolute", left: "40%", top: "30%" }}>
        <h3>Staff Deletion Page</h3>
        <br/>

        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Enter ID of employee to be deleted: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Employee ID"
              value={this.state.empID}
              onChange={this.handleEmpIDInput}
            />
          </Form.Group>

        </Form>

        <Link to="/main/staffpage">
            <button
              type="submit"
              className="btn btn-outline-primary btn-lg"
              onClick={this.deleteStaff}
            >
              Delete Staff
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

export default DeleteStaff;
