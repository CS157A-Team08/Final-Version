import React, { ImageBackground,Component } from "react";
import Menu from "./Menu";
import NavBar from "./Navbar";
import RecMenu from "./RecMenu";
import SeafoodMenu from "./SeafoodMenu";
import SidesMenu from "./SidesMenu";
import DrinksMenu from "./DrinksMenu";
import { Switch, Route } from "react-router-dom";
import StaffBio from "./StaffBio"
import id from "./Login"

class MainPage extends Component {

  
  state = {id: id};
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
          <Route path="/main/staffbio" component={StaffBio}/>
        </Switch>
      </React.Fragment>
    );
  }
}

export default MainPage;
