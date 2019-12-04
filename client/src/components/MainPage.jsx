import React, { Component } from "react";
import Menu from "./Menu";
import NavBar from "./Navbar";
import RecMenu from "./RecMenu";
import SeafoodMenu from "./SeafoodMenu";
import SidesMenu from "./SidesMenu";
import DrinksMenu from "./DrinksMenu";
import { Switch, Route } from "react-router-dom";

class MainPage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <NavBar />

        <Switch>
          <Route exact path="/main" component={Menu} />
          <Route path="/main/recommendation" component={RecMenu} />
          <Route path="/main/seafood" component={SeafoodMenu} />
          <Route path="/main/sides" component={SidesMenu} />
          <Route path="/main/drinks" component={DrinksMenu} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default MainPage;
