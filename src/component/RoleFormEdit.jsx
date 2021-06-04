import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

export const RoleFormEdit = (props) => {
  const [formData,setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Phone: "",
    Salary: "",
    HireDate: new Date().toDateString(),
  })
  const  handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value })
   
  };
 const handleEmployeeSubmit = (event) => {
    event.preventDefault();
    console.log(formData);

    axios
      .put("http://localhost:3000/employees", formData)

      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
    <h2 id="role-form-title">Edit Role Details</h2>
    <div id="role-form-outer-div">
      <Form
        id="form"
        onSubmit={handleEmployeeSubmit}
      >
        
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Role
          </Form.Label>
          <Col sm={10} className="form-input">
            <Form.Control
              type="Text"
              placeholder="Role"
              name="RoleName"
              required
              onChange={e => handleChange(e)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} id="form-submit-button">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Update</Button>
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
  )
}

