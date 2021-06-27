import React, { Component, useState } from "react";
// import "./LeaveApplicationHRFormEdit.css";
// import { Form,Button } from "react-bootstrap";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

export const LeaveApplicationEHrFormtFormEdit = (props) => {
  const [formData, setFormData] = useState({
   ...props.editData
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleProjectSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    axios
      .put("http://localhost:3002/leave/"+props.editData.LeaveApplicationId, {Status: formData.Status})

      .then((res) => {
        console.log(res.data);
        props.onFormEditClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h2 id="role-form-title">Edit Leave Application</h2>
      <div id="role-form-outer-div">
        <Form id="form" onSubmit={handleProjectSubmit}>
        <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Leave Type
            </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control as="select"  onChange={e=> setFormData({...formData,Status: e.target.value})} value={formData.Status}>
                <option value="" disabled>
                  Select your option
                </option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Leave Type
            </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control as="select" disabled={true} onChange={e=> setFormData({...formData,Reason: e.target.value})} value={formData.Reason}>
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
              <Form.Control disabled={true} type="date" required value={formData.StartDate}  name="StartDate" onChange={e => handleChange(e)} />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              ToDate
            </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control disabled={true} type="date" name="EndDate" value={formData.EndDate} onChange={e => handleChange(e)} placeholder="ToDate" required />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
            Number of Hours Per Day
            </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control
              disabled={true}
                type="Text"
                placeholder=" Number of Hours Per Day"
                name="NumberOfHours"
                value={formData.NumberOfHours}
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
              <Button type="reset" onClick={props.onFormEditClose}>
                cancel
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};
