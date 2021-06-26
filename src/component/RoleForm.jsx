import React, { useEffect, useState } from "react";
import "./RoleForm.css";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

export const RoleForm = (props) => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Phone: "",
    Salary: "",
    UserId: "",
    DepartmentId: "",
    HireDate: new Date().toDateString(),
  });

  const [userData, setUserData] = useState({
    Username: "",
    Password: '', 
    Role: 'regular-employee'
  })
  const  handleUserDataChange = (e) => {
    setUserData({...userData,[e.target.name]: e.target.value })
   
  };
  const [departments, setDeps] = useState([]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  useEffect(() => {
    axios
      .get("http://localhost:3002/departments")
      .then((res) => {
        setDeps(res.data);
        setFormData({ ...formData, DepartmentId: res.data[0].DepartmentId });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleEmployeeSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3002/users", {...userData,Username: formData.Email }).then(res => {
      axios
      .post("http://localhost:3002/employees", {...formData, UserId: res.data.UserId})

      .then((res2) => {
        console.log(res2.data);
        props.onFormClose();
      })
      .catch((err) => {
        console.log(err);
      });
    });
    
  };
  return (
    <div>
      <h2 id="role-form-title">Add Role Details</h2>
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
                type="Text"
                placeholder="Salary"
                name="Salary"
                onChange={(e) => handleChange(e)}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group controlId="asd">
            <Form.Label>Select Department</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) =>
                setFormData({ ...formData, DepartmentId: e.target.value })
              }
            >
              {departments.map((dep) => (
                <option key={dep.DepartmentId} value={dep.DepartmentId}>{dep.Name}</option>
              ))}
            </Form.Control>
          </Form.Group>


        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={10} className="form-input">
            <Form.Control
              type="password"
              placeholder="Password"
              value={userData.Password}
              name="Password"
              onChange={(e) => handleUserDataChange(e)}
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
              defaultValue={userData.Role}
              onChange={(e) =>
                setUserData({ ...userData, Role: e.target.value })
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
