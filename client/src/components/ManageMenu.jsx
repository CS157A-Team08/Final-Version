import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

class ManageMenu extends Component {
  state = {
    id: 17,
    name: "",
    price: 0,
    imageURL: "",
    category: ""
  };
  handleIDChange = event => {
    this.setState({ id: event.target.value });
  };
  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };
  handlePriceChange = event => {
    this.setState({ price: event.target.value });
  };
  handleImageChange = event => {
    this.setState({ imageURL: event.target.value });
  };

  handleCategoryChange = event => {
    this.setState({ category: event.target.value });
  };
  addToMenu = () => {
    fetch(
      `http://localhost:4000/managemenu?id=${this.state.id}&name=${this.state.name}&price=${this.state.price}
      &imageURL=${this.state.imageURL}&category=${this.state.category}`
    );
  };
  render() {
    return (
      <div style={{ position: "absolute", left: "40%", top: "10%" }}>
        Add a Menu Item<br/><br/>
        <Form>
       

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Item Name"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Price"
              value={this.state.price}
              onChange={this.handlePriceChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>imageURL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter ImageURL"
              value={this.state.imageURL}
              onChange={this.handleImageChange}
            />
          </Form.Group>

          <Form.Group category="formBasicEmail">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="recommendation/Seeafood/Sides/Drinks"
              value={this.state.category}
              onChange={this.handleCategoryChange}
            />
          </Form.Group>
          <Link to="/main/showMenu">
            <button
              type="submit"
              className="btn btn-outline-primary btn-lg"
              onClick={this.addToMenu}
            >
              Done
            </button>
          </Link>
        </Form>
      </div>
    );
  }
}

export default ManageMenu;
