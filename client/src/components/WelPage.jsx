import React, { Component,ImageBackground } from "react";
import { Link } from "react-router-dom";


class WelPage extends Component {
  state = {};
  render() {

    return (

      
      <div>
        
        <div style={{ position: "absolute", left: "30%", top: "40%" }}>
          <h1>Self-Ordering Dining System</h1>
        </div>
        <div style={{ position: "absolute", left: "40%", top: "50%" }}>
          <Link to="/login">
            <button
              href="./components/login"
              type="button"
              className="btn btn-outline-primary btn-lg"
            >
              Start Ordering
            </button>
         </Link>
        </div>
      </div>

 
    );
   
  }
}

export default WelPage;
