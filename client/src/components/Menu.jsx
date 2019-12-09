import React, { Component,ImageBackground } from "react";
import MenuItem from "./MenuItem";
import Login from "./Login";
import Item from "./Item";
import { MenuProvider,MenuConsumer } from "./context";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'


class Menu extends Component {
  state = {
    cus:""
  
  };

  componentDidMount() {
    this.findCustomer();
  }
  findCustomer = () => {
    fetch(
      `http://localhost:4000/customerorder`
    ).then(response => response.json())
    .then(response => { this.setState({cus:response.data[0].customerID});
  
  });
};
addorder = () => {
  fetch(
    `http://localhost:4000/addorder?customer=${this.state.cus}`
  )
};



 
  render() {
    return (
      
      <MenuConsumer>
        {value => {
          return (
            <div>
             
              <div style={{ display: "inline-block", width: "100%",top: "25%", }}>
                
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
                {value.menuItems.map(item => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    onIn={value.handleAdd}
                  ></MenuItem>
                ))}
                </div>
              </div>

              <div
                style={{
                  display: "inline-block",
                  width: "30%",
                  position: "absolute",
                  top: "10%",
                  left:"80%"
                }}
              >
        <div>
        
                  <h3>Cart</h3>
                  {value.cart.map(item => (

                    <Item
                      key={item.id}
                      onDelete={value.handleDelete}
                      onIn={value.handleIn}
                      onDe={value.handleDe}
                      item={item}
                    ></Item>
                  ))}
                </div>
                <div>
              
                  <h3>total: ${value.total}</h3>
                  <Link to={{
                                                pathname: "/main/payment",
                                                state: {
                                                    total: value.total
                                                }
                                            }}>
                  <button
                    className="btn btn-primary btn-lg m-2"
                    onClick={() =>{ console.log(this.state.cus);
                    this.addorder();}}
                  >
                    Submit
                  </button>
                 </Link> 
                </div>
              </div>
            </div>
          );
        }}
      </MenuConsumer>
    );
  }
}

export default Menu;
