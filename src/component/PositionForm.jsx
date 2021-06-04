import React, { useState } from "react";
import "./PositionForm.css";
// import { Form,Button } from "react-bootstrap";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

export const PositionForm = (props) => {
  const [formData,setFormData] = useState({
    name: ''
  })
  const  handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value })
   
  };
 const handleDepartmentSubmit = (event) => {
    event.preventDefault();
    console.log(formData);

    axios
      .post("http://localhost:3000/departments", formData)

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
         <div>
        <h2 id="role-form-title">Add Position Details</h2>

        <div id="role-form-outer-div">
          <Form id="form" onSubmit={handleDepartmentSubmit}>
          <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Department Name
          </Form.Label>
          <Col sm={10} className="form-input">
            <Form.Control
              type="Text"
              placeholder="Department Name"
              name="name"
              onChange={e=> handleChange(e)}
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
    </div>
  )
}

export default PositionForm;
