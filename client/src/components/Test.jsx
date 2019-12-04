import React, { Component } from "react";

class Test extends Component {
  state = {
    drinks: []
  };
  componentDidMount() {
    this.getDrinks();
  }
  getDrinks = () => {
    fetch("http://localhost:4000/drinks")
      .then(response => response.json())
      .then(response => this.setState({ drinks: response.data }))
      .catch(err => console.error(err));
  };

  render() {
    return (
      <main>
        <h1 className="text-primary text-center">Dtrinks</h1>
        <ul>
          {this.state.drinks.map(drink => {
            return <li>{drink.Name}</li>;
          })}
        </ul>
      </main>
    );
  }
}

export default Test;
