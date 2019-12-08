import React, { Component } from "react";
import Item from "./item";

class Cart extends Component {
  state = {

    cart: [],
    total: 15.5
  };

  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
    this.handleIn = this.handleIn.bind(this);
    this.handleDe = this.handleDe.bind(this);
  }

  handleIn(item) {
    const temp = [...this.state.items];
    const index = temp.indexOf(item);
    temp[index] = { ...item };
    temp[index].counter++;
    if (temp[index].counter === 1) {
      this.state.cart.push(temp[index]);
    }
    this.setState({ items: temp });
    let i = temp[index].price;
    i = this.state.total + i;
    this.setState({ total: i });
  }
  handleDe(item) {
    const temp = [...this.state.items];
    const index = temp.indexOf(item);
    temp[index] = { ...item };
    temp[index].counter--;
    if (temp[index].counter < 0) {
      temp[index].counter = 0;
    }
    this.setState({ items: temp });
    let i = temp[index].price;
    i = this.state.total - i;
    this.setState({ total: i });
  }
  handleDelete(itemID) {
    const temp = this.state.items.filter(c => c.id !== itemID);
    // loop thro temp and compute total
    let i = 0;
    temp.map(item => (i = i + item.price * item.counter));
    this.setState({ total: i });
    this.setState({ items: temp });
  }
  accTotal() {
    let i = 0;
    this.state.items.map(item => (i = i + item.price * item.counter));
    this.setState({ total: i });
  }

  render() {
    return (
      <div
        style={{
          display: "inline-block",
          width: "10%",
          position: "absolute",
          top: "10%"
        }}
      >
        <div>
          <h3>Cart</h3>
          {this.state.items.map(item => (
            <Item
              key={item.id}
              onDelete={this.handleDelete}
              onIn={this.handleIn}
              onDe={this.handleDe}
              item={item}
            ></Item>
          ))}
        </div>
        <div>
          <h3>total: ${this.state.total}</h3>
          <button className="btn btn-primary btn-lg m-2">Submit</button>
        </div>
      </div>
    );
  }
}

export default Cart;
