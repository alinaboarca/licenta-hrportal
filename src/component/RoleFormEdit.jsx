import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

export const RoleFormEdit = (props) => {
  const [formData, setFormData] = useState({ ...props.editData });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleEmployeeSubmit = (event) => {
    event.preventDefault();
    console.log(formData);

    axios
      .put(
        `http://localhost:3002/employees/${props.editData.EmployeeId}`,
        formData
      )

      .then((res) => {
        console.log('asdasdasda',res.data);
        props.onFormEditClose(formData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h2 id="role-form-title">Edit Role Details</h2>
      <div id="role-form-outer-div">
        <Form id="form" onSubmit={handleEmployeeSubmit}>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              First Name
            </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control
                type="Text"
                placeholder="First Name"
                name="FirstName"
                value={formData.FirstName}
                onChange={(e) => handleChange(e)}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Last Name
            </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control
                type="Text"
                placeholder="Last Name"
                name="LastName"
                onChange={(e) => handleChange(e)}
                value={formData.LastName}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control
                type="Text"
                placeholder="Email"
                name="Email"
                value={formData.Email}
                onChange={(e) => handleChange(e)}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Phone number
            </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control
                type="Text"
                placeholder="Phone number"
                name="Phone"
                value={formData.Phone}
                onChange={(e) => handleChange(e)}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Salary
            </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control
                disabled={!props.canEditSalary}
                type="Text"
                placeholder="Salary"
                name="Salary"
                value={formData.Salary}
                onChange={(e) => handleChange(e)}
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
