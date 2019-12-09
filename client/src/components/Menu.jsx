import React, { Component,ImageBackground } from "react";
import MenuItem from "./MenuItem";
import Login from "./Login";
import Item from "./Item";
import { MenuProvider,MenuConsumer } from "./context";




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
              <div style={{ display: "inline-block", width: "100%" }}>
                
                {value.menuItems.map(item => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    onIn={value.handleAdd}
                  ></MenuItem>
                ))}
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
                  <button
                    className="btn btn-primary btn-lg m-2"
                    onClick={() =>{ console.log(this.state.cus);
                    this.addorder();}}
                  >
                    Submit
                  </button>
                  
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
