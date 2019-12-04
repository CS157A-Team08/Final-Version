import React, { Component } from "react";
import pic from "./soda.jpg";
class P extends Component {
  state = {};
  componentDidMount() {
    this.getMenuItems();
  }
  getMenuItems = () => {
    fetch("http://localhost:4000/staffaccounts")
      .then(response => response.json())
      .then(response => this.setState({ staffAcc: response.data }))
      .catch(err => console.error(err));
  };
  render() {
    return (
      <div>
        <div style={{ position: "absolute", left: "40%", top: "30%" }}>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                value={this.state.name}
                onChange={this.handleNameChange}
              />
            </div>

            <div>
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="(xxx)-xxx-xxxx"
                value={this.state.phone}
                onChange={this.handlePhoneChange}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary btn-lg">
              Next
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default P;
