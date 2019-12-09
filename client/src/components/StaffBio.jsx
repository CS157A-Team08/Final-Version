import React, { Component, } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { Button, Accordion, Card } from 'react-bootstrap';
class StaffBio extends Component {
  state = {
    listOfStaff: [],
    currStaff: {},
    //currShiftRec: {}
  };

  componentDidMount() {
    this.getAllStaff();
  }

  getAllStaff = () => {
    fetch("http://localhost:4000/employee")
      .then(response => response.json())
      .then(response => {
        this.setState({ listOfStaff: response.data });
        this.setState({ currStaff: this.state.listOfStaff[0] });
        //        this.getShiftRec(this.state.currStaff.empID);
        console.log("***DEBUG MSG: get all staff - currStaff name:" + response.data[0].name);
      })
      .catch(err => console.error(err));
  };

  //  getShiftRec = (empID) => {
  //    fetch("http://localhost:4000/shiftrecord/" + empID)
  //      .then(response => response.json())
  //      .then(response => {
  //        this.setState({ currShiftRec: response.data[0] });
  //        console.log("***DEBUG MSG: succeeded in getting shift record of empID: " + empID + " shiftID: " + response.data[0].shiftID );
  //      })
  //      .catch(err => console.error(err));
  //  };

  handleStaffSelection = (empID) => {
    fetch("http://localhost:4000/employee/" + empID)
      .then(response => response.json())
      .then(response => {
        this.setState({ currStaff: response.data[0] });
        //this.getShiftRec(empID);
        console.log("***DEBUG MSG: Handle Staff Selection - new current staff: " + response.data[0].name);
      })
      .catch(err => console.error(err));
  };

  render() {

    return (
      <div style={{ position: "absolute", left: "10%", top: "10%",width:"100%" }}>
        <div><h1>Staff Directory</h1>
         <Link to="/main/addstaff">
          <button
            type="submit"
            className="btn btn-success btn-lg"
          >
            + Add Staff
            </button>
        </Link></div>
        <br />
        <div style={{ float: 'center', width: '60%' }}>
          <Accordion defaultActiveKey="0">
            {this.state.listOfStaff.map(staff => (
              <ul>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="Light" block eventKey={staff.empID} onClick={() => this.handleStaffSelection(staff.empID)}>{staff.name}</Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey={staff.empID}>
                    <Card.Body>
                      <h3>{this.state.currStaff.name}</h3>
                      <div />
                      <strong>Position: </strong>{this.state.currStaff.position}
                      <div />
                      <strong>Phone#: </strong>{this.state.currStaff.phone}
              <div />
              
                      <strong>Employee ID#: </strong>{this.state.currStaff.empID}
                      <div />
                      <br />
                      <div style={{ float: 'center'}}>
                      <Link to={{
                        pathname: "/main/editstaff",
                        state: {
                          empID: this.state.currStaff.empID
                        }
                      }}>
                        <button
                          type="submit"
                          className="btn btn-outline-dark btn-lg"
                        >
                          Edit Staff
            </button>
                      </Link>
                      &ensp;
                      <Link to={{
                        pathname: "/main/deletestaff",
                        state: {
                          empID: this.state.currStaff.empID
                        }
                      }}>
                        <button
                          type="submit"
                          className="btn btn-danger btn-lg"
                        >
                          Delete Staff
            </button>
                      </Link>
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </ul>
            )
            )}
          </Accordion>





        </div>


      </div>


    );
  }
}

export default StaffBio;
