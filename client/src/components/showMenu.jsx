import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { Button, Accordion, Card } from 'react-bootstrap';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
const AddTripButton = props => {
    return <button onClick={props.addTrip}>Add a trip</button>
  }

  



class showMenu extends Component {
    constructor(props) {
        super(props)
        this.state = { isEmptyState: true }
      }
    
    
    state = {
        listOfMenu: [],
        currMenu: {},
        //currShiftRec: {}
    };


    componentDidMount() {
        this.getMenu();
        this.handleStaffSelection();
    }

    triggerAddTripState = () => {
        this.setState({
          ...this.state,
          isEmptyState: false,
          isAddTripState: true
        })
      }

    getMenu = () => {
        fetch("http://localhost:4000/menu")
            .then(response => response.json())
            .then(response => {
                this.setState({ listOfMenu: response.data });
                this.setState({ currMenu: this.state.listOfMenu[0] });
                //        this.getShiftRec(this.state.currStaff.empID);
                console.log("***DEBUG MSG: get all menu - menu name:" + response.data[0].name);
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

    handleStaffSelection = (id) => {

        fetch("http://localhost:4000/menu/" + id)
            .then(response => response.json())
            .then(response => {
                this.setState({ currMenu: response.data[0] });

                //this.getShiftRec(empID);

            })
            .catch(err => console.error(err));
    };
    handledelete = (id) => {

        fetch("http://localhost:4000/delmenu/" + id)
            .then(response => response.json())
            .then(response => {
                this.getMenu();
                //this.getShiftRec(empID);
                console.log("***DEBUG MSG: Handle Staff Selection - new current menu: " + response.data[0].name);
            })
            .catch(err => console.error(err));
    };

    render() {
        const divStyleLeft = {
            float: 'left',
            width: '60%'
        };
        const divStyleRight = {
            float: 'right',
            width: '40%'
        };

        return (

            <div style={{ position: "absolute", left: "20%", top: "10%", width:"100%"}}>

                <h1>Menu Directory</h1>
                <br />
                <div> <Link to="/main/managemenu">
                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-lg"
                    >
                        Add new Menu Item
            </button>


                </Link></div>
                <br />
                <div style={{float: 'center', width: '60%'}}>
                    <Accordion defaultActiveKey="0">
                        {this.state.listOfMenu.map(menu => (
                            <ul>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey={menu.id} onClick={() => this.handleStaffSelection(menu.id)}>{menu.name}</Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey={menu.id}>
                                        <Card.Body>
                                            <h3>{this.state.currMenu.name}</h3>
                                            <div />
                                            <strong>Item: </strong>{this.state.currMenu.name}
                                            <div />
                                            <strong>Price: $</strong>{this.state.currMenu.price}
                                            <div />
                                            <strong>Image URL: </strong>{this.state.currMenu.imageURL}
                                            <div />
                                            <strong>Category </strong>{this.state.currMenu.category}
                                            <div />
                                            <br />
                                            <Link to="/main/showmenu">
                                                <button
                                                    className="btn btn-primary  btn-lg"
                                                    onClick={() => this.handledelete(this.state.currMenu.id)}
                                                >
                                                    Delete
                </button>
                </Link>
                &ensp;
                <div>  triggerAddTripState = () => {
        this.setState({
          ...this.state,
          isEmptyState: false,
          isAddTripState: true
        })
      }
    }
      {this.state.isEmptyState && <AddTripButton addTrip={this.triggerAddTripState} />}

      {this.state.isAddTripState && <AnotherComponent />}
    </div>
                <Link to="/main/showmenu">
                                                <button
                                                    className="btn btn-primary  btn-lg"
                                                    
                                                >
                                                    Edit
                </button>
                                            </Link>
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

export default showMenu;
