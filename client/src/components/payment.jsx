import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

class payment extends Component {
  state = {
    customerID: "",
    orderID: "",
    type: "",
    cardNo: "",
    amount: "",
    paidamount:""
  };
  handleTypeChange = event => {
    this.setState({ type: event.target.value });
  };
  handleCardChange = event => {
    this.setState({ cardNo: event.target.value });
  };
  handlePaidChange = event => {
    this.setState({ paidamount: event.target.value });
  };
  
  addpayment  = () => {
      console.log(this.state);
    fetch(
      `http://localhost:4000/payment?orderID=${this.state.orderID}&customerID=${this.state.customerID}&type=${this.state.type}&amount=${this.state.amount}&paidamount=${this.state.paidamount}&cardNo=${this.state.cardNo}`
    );
  };

  componentDidMount() {
    const { total } = this.props.location.state;
    this.setState({ amount: total });
    this.getorder();
  }

  getorder = () => {
    fetch("http://localhost:4000/getorderby")
      .then(response => response.json())
      .then(response => {
        
        //this.setState({ currStaff: response.data[0] });
        this.setState({ customerID: response.data[0].customerID });
        this.setState({ orderID: response.data[0].orderID });
        
        //this.getShiftRec(empID);
        console.log("***DEBUG MSG: Get Current Staff Selection for edit - new current staff: " + response.data[0].customerID );
      })
      .catch(err => console.error(err));
  };

  render() {
    return (
      <div style={{ position: "absolute", left: "40%", top: "30%" }}>
        <h3>Submit Payment</h3>
        <br/>
        
         <Form> 
          <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label>PaymentType</Form.Label>
    <Form.Control as="select" value={this.state.type}
              onChange={this.handleTypeChange}>
      <option> </option>          
      <option>Credit</option>
      <option>Debit</option>
      <option>Cash</option> 
    </Form.Control>
  </Form.Group>
   
    
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Total:</Form.Label>
            <Form.Control
              type="text"
              value={this.state.amount}
              
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Paid Amount:</Form.Label>
            <Form.Control
              type="text"
              value={this.state.paidamount}
              onChange={this.handlePaidChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Card Number (Optional):</Form.Label>
            <Form.Control
              type="text"
              value={this.state.cardNo}
              onChange={this.handleCardChange}
            />
          </Form.Group>

        </Form>

        <Link to="/main/thanks">
            <button
              type="submit"
              className="btn btn-outline-primary btn-lg"
              onClick={this.addpayment}
            >
              Submit
            </button>
        </Link>
        &ensp;
        <Link to="/main/">
            <button
              type="submit"
              className="btn btn-outline-primary btn-lg"
            >
              Cancel
            </button>
        </Link>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        </div>

    );
  }
}

export default payment;
