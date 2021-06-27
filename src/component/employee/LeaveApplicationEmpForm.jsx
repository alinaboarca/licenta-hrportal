import React, { Component, useState } from "react";
import "./LeaveApplicationEmpForm.css";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

export const LeaveApplicationEmpFormtForm = (props) => {
  const [formData, setFormData] = useState({
    StartDate: "",
    EndDate: "",
    Reason: "Vacantion",
    NumberOfHours: "",
    Status: "Pending",
    EmployeeId: props.data.EmployeeId,
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleProjectSubmit = (event) => {
    console.log("here");
    event.preventDefault();
    console.log(formData);
    axios
      .post("http://localhost:3002/leave", formData)

      .then((res) => {
        console.log(res.data);
        props.onFormClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h2 id="role-form-title">Add LeaveApplicationEmp Details</h2>
      <div id="role-form-outer-div">
        <Form id="form" onSubmit={handleProjectSubmit}>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Leave Type
            </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control as="select" required onChange={e=> setFormData({...formData,Reason: e.target.value})}>
                <option value="" disabled>
                  Select your option
                </option>
                <option value="Vacantion">Vacantion</option>
                <option value="TimeOffInLieu">Time off in lieu</option>
                <option value="Sick">Sickness</option>
                <option value="Maternal">Maternal</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              FromDate
            </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control type="date" required  name="StartDate" onChange={e => handleChange(e)} />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              ToDate
            </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control type="date" name="EndDate" onChange={e => handleChange(e)} placeholder="ToDate" required />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
            Number of Hours Per Day
            </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control
                type="Text"
                placeholder=" Number of Hours Per Day"
                name="NumberOfHours"
                onChange={e => handleChange(e)}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} id="form-submit-button">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit">Submit</Button>
            </Col>
          </Form.Group>
          <Form.Group as={Row} id="form-cancel-button">
            <Col sm={{ span: 10, offset: 2 }} id="form-cancel-button-inner">
              <Button type="reset" onClick={props.onFormClose}>
                cancel
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};
