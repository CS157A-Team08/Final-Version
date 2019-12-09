import React, { Component } from "react";


class MenuItem extends Component {
  render() {
    return (
      <div style={{ display: "inline-block", width: "25%", margin: 30 }}>
        <div>
          <img
            alt={this.props.item.name}
            src={this.props.item.imageURL}
            style={{ width: 200, height: 200 }}
          />
        </div>
        <React.Fragment>{this.props.item.name}</React.Fragment>
        <React.Fragment> ${this.props.item.price}</React.Fragment>

        <button
          className="btn btn-secondary btn-sm m-1"
          disabled={this.props.item.inCart ? true : false}
          onClick={() => {
            this.props.onIn(this.props.item.id);
          }}
        >
          {this.props.item.inCart ? (
            <p className="mb-0">In Cart</p>
          ) : (
            <p className="mb-0">+</p>
          )}
        </button>
      </div>
    );
  }
}

export default MenuItem;
