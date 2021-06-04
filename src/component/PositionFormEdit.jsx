import React, { useState } from "react";

import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

 const PositionFormEdit = (props) => {
  const [formData,setFormData] = useState({...props.editData})
  const  handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value })
   
  };
 const handleDepartmentSubmit = (event) => {
    event.preventDefault();
    console.log(formData);

    axios
      .put(`http://localhost:3000/departments/${props.editData.id}`, formData)

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
        <h2 id="role-form-title">Edit Department Name</h2>

        <div id="role-form-outer-div">
          <Form
            id="form"
            onSubmit={handleDepartmentSubmit}
          >
            

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Department
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Department Name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={value => handleChange(value)}
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


export default PositionFormEdit;
