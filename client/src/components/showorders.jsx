import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { Button, Accordion, Card } from 'react-bootstrap';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';




class showorders extends Component {
    state = {
        listOfMenu: [],
        currMenu: {},
        //currShiftRec: {}
    };
    componentDidMount() {
        this.getMenu();
      //  this.handleStaffSelection();
    }

    getMenu = () => {
        fetch("http://localhost:4000/orderlist")
            .then(response => response.json())
            .then(response => {
                this.setState({ listOfMenu: response.data });
                this.setState({ currMenu: this.state.listOfMenu[0] });

                console.log("***DEBUG MSG: get all menu - menu name:" + response.data[0].name);

            })
            .catch(err => console.error(err));
    };

    handledelete = (orderID) => {

        fetch(`http://localhost:4000/updatemenu?orderID=${orderID}`)
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

            
                <div style={{ display: "inline-block", width: "25%" }}>


                <br />
                

                    {this.state.listOfMenu.map(menu => (
                        <ul>
                            <Card>

                                <Card.Body>
                                    <strong>order # </strong>{menu.orderID}
                                    <div />
                                    <strong>Customer: </strong>{menu.name}
                                    <div />
                                    {menu.item} x {menu.quantity}
                                    <div />
                                    <button
                  className="btn btn-primary btn-lg m-2"
                  onClick={() => this.handledelete(menu.orderID)}
                >
                  done
                </button>

                                </Card.Body>

                            </Card>
                        </ul>
                    )
                    )}





              
            </div>


        );
    }
}

export default showorders;
