import React, { Component } from "react";
import MenuItem from "./MenuItem";

import Item from "./Item";
import { MenuConsumer } from "./context";

class Menu extends Component {
  render() {
    return (
      <MenuConsumer>
        {value => {
          return (
            <div>
              <div style={{ display: "inline-block", width: "65%" }}>
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
                  top: "10%"
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
                    onClick={() => console.log(value.cart)}
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
