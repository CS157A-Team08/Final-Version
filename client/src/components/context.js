import React, { Component } from "react";

const MenuContext = React.createContext();
//Provider
//Consumer

class MenuProvider extends Component {
  state = {
    menuItems: [],
    cart: [],
    total: 0,
    order: []
  };
  componentDidMount() {
    this.getMenuItems();
    this.getOrderItems();
  }
  getMenuItems = () => {
    fetch("http://localhost:4000/menu")
      .then(response => response.json())
      .then(response => this.setState({ menuItems: response.data }))
      .catch(err => console.error(err));
  };
  getOrderItems = () => {
    fetch("http://localhost:4000/customerorder")
      .then(response => response.json())
      .then(response => this.setState({ order: response.data }))
      .catch(err => console.error(err));
  };
  getItem = id => {
    const temp = this.state.menuItems.find(item => item.id === id);
    return temp;
  };

  addToCartCCC = id => {
    let temp = [...this.state.menuItems];
    const index = temp.indexOf(this.getItem(id));
    const item = temp[index];
    //1 or false?
    item.inCart = 1;
    //item.count = 1;
    //const price = item.price;
    //item.total = price;

    this.setState(() => {
      return (
        { menuItems: temp, cart: [...this.state.cart, item] },
        () => {
          console.log(this.state.cart);
        }
      );
    });
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

    this.setState(() => {
      return { cart: tempCart };
    });
    this.setState(() => {
      return {
        total: addPrice
      };
    });
    fetch(`http://localhost:4000/tempadd?id=${temp.id}`);
      
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
    fetch(`http://localhost:4000/tempin?id=${item.id}`);
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
    fetch(`http://localhost:4000/tempde?id=${item.id}`);
  };
  handleDelete = item => {
    const temp = this.state.cart.filter(c => c.id !== item.id);
    fetch(`http://localhost:4000/tempdelete?id=${item.id}`);
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
      <MenuContext.Provider
        value={{
          ...this.state,
          handleAdd: this.handleAdd,
          handleIn: this.handleIn,
          handleDe: this.handleDe,
          handleDelete: this.handleDelete
        }}
      >
        {this.props.children}
      </MenuContext.Provider>
    );
  }
}
const MenuConsumer = MenuContext.Consumer;

export { MenuProvider, MenuConsumer };
