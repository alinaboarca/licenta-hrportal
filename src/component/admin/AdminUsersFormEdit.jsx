import Axios from "axios";
import React, {  useState } from "react";
import { Form,Button,Col,Row } from "react-bootstrap";

export const AdminUsersFormEdit = (props) => {
  const [formData,setFormData] = useState({...props.editData})
  const  handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value })
   
  };
 const handleUserUpdate = (event) => {
    event.preventDefault();
    console.log(formData);

    Axios
      .put(`http://localhost:3000/users/${props.editData.id}`, formData)

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
    <h2 id="role-form-title">Add Portal Details</h2>
    <div id="role-form-outer-div">
      <Form id="form" onSubmit={handleUserUpdate}>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Username
          </Form.Label>
          <Col sm={10} className="form-input">
            <Form.Control
              type="Text"
              placeholder="Username"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange(e)}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={10} className="form-input">
            <Form.Control
              type="password"
              placeholder="Password"
              value={formData.password}
              name="password"
              onChange={(e) => handleChange(e)}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Status
          </Form.Label>
          <Col sm={10} className="form-input">
            <Form.Control
              as="select"
              defaultValue={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              required
            >
              <option value="regular-employee">Regular Employee</option>
              <option value="hr">HR Staff Member</option>
              <option value="amin">Admin</option>
            </Form.Control>
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
  )
}


