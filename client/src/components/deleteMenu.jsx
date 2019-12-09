import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

class deleteMenu extends Component {
  state = {
    id: ""
  };
  handleEmpIDInput = event => {
    this.setState({ id: event.target.value });
  };
  deleteStaff = () => {
    fetch( `http://localhost:4000/deletemenu/${this.state.id}` );
  };

  componentDidMount() {
    const { id } = this.props.location.state;
    this.setState({ id:id });
  }

  render() {
    return (
      <div style={{ position: "absolute", left: "40%", top: "30%" }}>
        <h3>Menu Deletion Page</h3>
        <br/>

        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Enter ID of Menu to be deleted: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Employee ID"
              value={this.state.id}
              onChange={this.handleEmpIDInput}
            />
          </Form.Group>

        </Form>

        <Link to="/main/showMenu">
            <button
              type="submit"
              className="btn btn-outline-primary btn-lg"
              onClick={this.deleteStaff}
            >
              Delete Menu Item
            </button>
        </Link>
        &ensp;
        <Link to="/main/showMenu">
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

export default deleteMenu;
