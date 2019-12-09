import React, { Component } from "react";
import MenuItem from "./MenuItem";
import { MenuProvider,MenuConsumer } from "./context";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'


import Item from "./Item";

class Menu extends Component {
  state = {
    menuItems: [],
    cart: [],
    total: 0
  };
  componentDidMount() {
    this.getMenuItems();
  }
  getMenuItems = () => {
    fetch("http://localhost:4000/menucat?category=drinks")
      .then(response => response.json())
      .then(response => this.setState({ menuItems: response.data }))
      .catch(err => console.error(err));
  };
  getItem = id => {
    const temp = this.state.menuItems.find(item => item.id === id);
    return temp;
  };
  //adding to cart
  handleAdd = id => {
    const temp = this.getItem(id);
    const index = this.state.menuItems.indexOf(temp);
    //console.log(index);
    const tempCart = [...this.state.cart];

    //disable adding button
    const tempItems = [...this.state.menuItems];
    const tempItem = tempItems[index];
    //console.log(tempItem);
    tempItem.inCart = 1;
    //adding this item to Cart
    tempCart.push({
      id: `${temp.id}`,
      value: `${temp.name}`,
      price: temp.price,
      counter: 1
    });
    const addPrice = this.state.total + temp.price;

    this.setState({ cart: tempCart });
    this.setState({ total: addPrice });
    //console.log(temp.id);
    //console.log(this.state.cart);
  };
  //handle for cart
  handleIn = item => {
    const temp = [...this.state.cart];
    const index = temp.indexOf(item);
    temp[index] = { ...item };
    temp[index].counter++;
    //if (temp[index].counter === 1) {
    //  this.state.cart.push(temp[index]);
    // }
    this.setState({ cart: temp });
    let i = temp[index].price;
    i = this.state.total + i;
    this.setState({ total: i });
  };
  handleDe = item => {
    const temp = [...this.state.cart];
    const index = temp.indexOf(item);
    temp[index] = { ...item };
    if (temp[index].counter > 0) {
      let i = temp[index].price;
      i = this.state.total - i;
      this.setState({ total: i });
    }
    temp[index].counter--;
    if (temp[index].counter < 0) {
      temp[index].counter = 0;
    }
    this.setState({ cart: temp });
  };
  handleDelete = item => {
    const temp = this.state.cart.filter(c => c.id !== item.id);
    // loop thro temp and compute total
    let i = 0;
    temp.map(item => (i = i + item.price * item.counter));
    this.setState({ total: i });
    this.setState({ cart: temp });

    // const tempI = this.state.menuItems.find(item => item.id === itemID);
    // console.log(tempI);

    // const index = this.state.menuItems.indexOf(temp);
    // console.log(index);
    // const tempItems = [...this.state.menuItems];
    //  console.log(tempItems);
    // console.log(item.id);

    // const tempI = this.state.menuItems.find(temp => temp.id === item.id);

    // console.log(tempI);
    // const index = this.state.menuItems.indexOf(tempI);
    //console.log(item.id-1);
    const tempItems = [...this.state.menuItems];
    const tempItem = tempItems[item.id - 1];
    //console.log(tempItem);
    tempItem.inCart = 0;
  };
  accTotal() {
    let i = 0;
    this.state.items.map(item => (i = i + item.price * item.counter));
    this.setState({ total: i });
  }

  
  render() {
    return (
      <div>
          <div style={{ display: "inline-block", width: "80%",top: "25%", }}>
        <div style={{ display: "inline-block", width: "65%" }}>
        <div className="d-flex flex-column"
                style={{
                  display: "inline-block",
                  width: "50%",
                  position: "absolute",
                  float:"center",
                  top: "8%",
                  left:"12%"
                }}
              >
      
      <ButtonGroup aria-label="Basic example">
  <Button href='/main' variant="secondary">All</Button>
  <Button href='/main/chef'variant="secondary">Chef's Special</Button>
  <Button href='/main/starters'variant="secondary">Starters</Button>
  <Button href='/main/entrees'variant="secondary">Entrees</Button>
  <Button href='/main/sides'href='/main/sides'variant="secondary">Sides</Button>
  <Button href='/main/drinks'href='/main/drinks'variant="secondary">Drinks</Button>
  <Button href='/main/desserts'variant="secondary">Desserts</Button>
</ButtonGroup>
</div>
<div
                style={{
                  display: "inline-block",
                  width: "100%",
                  position: "absolute",
                  top: "12%",
                  left:"0%"
                }}
              >
          {this.state.menuItems.map(item => {
            
              return (
                <MenuItem
                  key={item.id}
                  item={item}
                  onIn={this.handleAdd}
                ></MenuItem>
              );
            
        })}
        </div>
        </div>
        </div>

        <div
          style={{
            display: "inline-block",
            width: "30%",
            position: "absolute",
            top: "10%"
          }}
        >
          <div>
            <h3>Cart</h3>
            {this.state.cart.map(item => (
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
      </div>
    );
  }
}

export default Menu;
