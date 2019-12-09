import React, { Component} from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
class WelPage extends Component {
  state = {};
  render() {
    return (
      <div>
        <div  style={{ backgroundImage:`url(https://wallup.net/wp-content/uploads/1413914382.jpg)` }}>
        <div style={{ position: "absolute", left: "34%", top: "40%" }}>
          <h1>Welcome to MYSQL Diner !</h1>
        </div>
        <div style={{ position: "absolute", left: "40%", top: "50%" }}>
          <Link to="/main/login">
          
            <button
              href="./components/login"
              type="button"
              className="btn btn-warning btn-lg"
              variant="secondary"
            >
              Hungry? Start Ordering->
            </button>
         
          </Link>
        </div>
      </div>
      </div>
    );
  }
}

export default WelPage;
