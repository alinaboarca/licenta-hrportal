import React, { Component, useState } from "react";
// import "./SalaryFormEdit.css";
import axios from "axios";
import { Form,Button,Col,Row } from "react-bootstrap";



export const SalaryFormEdit = (props) => {
  const [formData, setFormData] = useState({
    ...props.editData
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleProjectSubmit = (event) => {
    console.log('here')
    event.preventDefault();
    console.log(formData);

    axios
      .put("http://localhost:3002/employees/"+props.editData.EmployeeId, {Salary: formData.Salary})

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
      <h2 id="role-form-title">Edit salary for {props.editData.FirstName} {props.editData.LastName}</h2>
      {/* <div id="role-form-outer-div">
      <div id="role-form-inner-div"> */}

      <div id="role-form-outer-div">
        <Form.Group id="form" onSubmit={handleProjectSubmit}>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Salary
            </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control
                type="Number"
                placeholder="Salary"
                name="Salary"
                value={formData.Salary}
                onChange={(e) => handleChange(e)}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              IBAN 
            </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control
                type="Text"
                placeholder="IBAN"
                name="IBAN"
                disabled={true}
                value={formData.IBAN}
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
                disabled={true}
                value={formData.SwiftCode}
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
                value={formData.BankName}
                placeholder="Bank Name"
                name="BankName"
                disabled={true}
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