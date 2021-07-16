import React, { Component, useState } from "react";
import "./EducationForm.css";
import { Form,Button,Col,Row } from "react-bootstrap";
import axios from "axios";


export const BankAccountForm = (props) => {
  const [formData, setFormData] = useState({
    IBAN: "",
    BankName: "",
    SwiftCode: "",
    EmployeeId: props.data.EmployeeId
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleProjectSubmit = (event) => {
    console.log('here')
    event.preventDefault();
    console.log(formData);

    axios
      .post("http://localhost:3002/account", formData)

      .then((res) => {
        console.log(res.data);
        props.onFormClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <React.Fragment>
      <h2 id="role-form-title">Add Bank Account Details</h2>
      {/* <div id="role-form-outer-div">
      <div id="role-form-inner-div"> */}

      <div id="role-form-outer-div">
        <Form.Group id="form" onSubmit={handleProjectSubmit}>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              IBAN 
            </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control
                type="Text"
                placeholder="IBAN"
                name="IBAN"
                onChange={(e) => handleChange(e)}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Swift Code
            </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control
                type="Text"
                placeholder="Swift Code"
                name="SwiftCode"
                onChange={(e) => handleChange(e)}
                required
              />
            </Col>
          </Form.Group>
          
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Bank Name
            </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control
                type="Text"
                placeholder="Bank Name"
                name="BankName"
                onChange={(e) => handleChange(e)}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} id="form-submit-button">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit" onClick={handleProjectSubmit}>Submit</Button>
            </Col>
          </Form.Group>
          <Form.Group as={Row} id="form-cancel-button">
            <Col sm={{ span: 10, offset: 2 }} id="form-cancel-button-inner">
              <Button type="reset" onClick={props.onFormClose}>
                cancel
              </Button>
            </Col>
          </Form.Group>
        </Form.Group>
      </div>
    </React.Fragment>
  );
};