import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

class editMenu extends Component {
  state = {
    itemID: "",
    name: "",
    url: "",
    price: "",
    category: ""
  };
  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };
  handlePhoneChange = event => {
    this.setState({ price: event.target.value });
  };
  handlePositionChange = event => {
    this.setState({ url: event.target.value });
  };
  handlePasswordChange = event => {
    this.setState({ category: event.target.value });
  };
  editmenu  = () => {
      console.log(this.state);
    fetch(
      `http://localhost:4000/editmenu?itemID=${this.state.itemID}&name=${this.state.name}&imageURL=${this.state.url}&price=${this.state.price}&category=${this.state.category}`
    );
  };

  componentDidMount() {
    const { id } = this.props.location.state;
    this.setState({ itemID: id });
    this.getCurrStaff(id);
  }

  getCurrStaff = (id) => {
    fetch("http://localhost:4000/menu/" + id)
      .then(response => response.json())
      .then(response => {
        console.log("***DEBUG MSG: Get Current Staff Selection for edit - state empID: " + this.state.id );
        //this.setState({ currStaff: response.data[0] });
        this.setState({ name: response.data[0].name });
        this.setState({ price: response.data[0].price });
        this.setState({ url: response.data[0].imageURL });
        this.setState({ category: response.data[0].category });
        //this.getShiftRec(empID);
        console.log("***DEBUG MSG: Get Current Staff Selection for edit - new current staff: " + response.data[0].name );
      })
      .catch(err => console.error(err));
  };

  render() {
    return (
      <div style={{ position: "absolute", left: "40%", top: "30%" }}>
        <h3>Edit Menu item:</h3>
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
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              value={this.state.price}
              onChange={this.handlePhoneChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              value={this.state.url}
              onChange={this.handlePositionChange}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Category</Form.Label>
    <Form.Control as="select" value={this.state.category}
              onChange={this.handlePasswordChange}>
                <option>Specialtites</option>
      <option>Starters</option>
      <option>Entrees</option>
      <option>Sides</option>
      <option>Drinks</option>
      <option>Desserts</option> 
    </Form.Control>
  </Form.Group>

        </Form>

        <Link to="/main/showMenu">
            <button
              type="submit"
              className="btn btn-outline-primary btn-lg"
              onClick={this.editmenu}
            >
              Submit
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

export default editMenu;
