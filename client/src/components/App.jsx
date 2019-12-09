import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import WelPage from "./WelPage";
import Login from "./Login";
import MainPage from "./MainPage";


class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={WelPage}></Route>

          <Route path="/main" component={MainPage}></Route>
          
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
