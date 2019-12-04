import React, { Component } from "react";

class Item extends Component {
  render() {
    //console.log("P:", this.props);
    return (
      <div>
        <React.Fragment>{this.props.item.value}</React.Fragment>
        <React.Fragment> ${this.props.item.price}</React.Fragment>
        <span style={{ fontSize: 15 }} className={this.getBadge()}>
          {this.props.item.counter}
        </span>
        <button
          className="btn btn-secondary btn-sm m-1"
          onClick={() => this.props.onIn(this.props.item)}
        >
          +
        </button>
        <button
          className="btn btn-secondary btn-sm m-1"
          onClick={() => this.props.onDe(this.props.item)}
        >
          -
        </button>
        <button
          onClick={() => this.props.onDelete(this.props.item)}
          className="btn btn-danger btn-sm -2"
        >
          Delete
        </button>
      </div>
    );
  }
  getBadge() {
    let classes = "badge m-1 ";
    if (this.props.item.counter > 0) {
      classes += "badge-warning";
    } else {
      classes += "badge-primary";
    }
    return classes;
  }
}

export default Item;
