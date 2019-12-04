import React, { Component } from "react";
import { MenuConsumer } from "./context";

class SingleOrder extends Component {
  state = {
    orders: []
  };
  componentDidMount() {
    this.getOrderItems();
  }
  getOrderItems = () => {
    fetch("http://localhost:4000/customerorder")
      .then(response => response.json())
      .then(response => this.setState({ orders: [...response.data] }))
      .catch(err => console.error(err));
  };

  render() {
    const orderStyle = {
      backgroundColor: "white",
      margin: "auto",
      width: "50%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      border: "1px solid #efefef",
      boxShadow:
        ("0 1px 1px rgba(0, 0, 0, 15)",
        "0 10px 0px #eee",
        "0 10px 1px rgba(0, 0, 0, 15)",
        "0 20px 0px #eee",
        "0 20px 1px rgba(0, 0, 0, 15)"),
      padding: 30,
      borderBottom: "1 solid #cecece"
    };

    return (
      <MenuConsumer>
        {value => {
          console.log(this.state.orders.id);

          return (
            <div style={orderStyle}>
              <h1>Order#01{this.state.orders.id}</h1>

              <p style={{ fontSize: 25 }}>
                Order Details: {this.state.orders.phone}
                <hr />
              </p>

              {value.cart.map(item => {
                return (
                  <p style={{ fontSize: 20 }}>
                    {item.value} X {item.counter}
                  </p>
                );
              })}
            </div>
          );
        }}
      </MenuConsumer>
    );
  }
}

export default SingleOrder;
