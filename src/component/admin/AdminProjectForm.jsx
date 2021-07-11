import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Col, Row } from "react-bootstrap";

export const AdminProjectForm = (props) => {
  const [formData, setFormData] = useState({
    Name: "",
    StartDate: "",
    EndDate: "",
    Status: "ongoing",
  });

  const [emps, setEmpls] = useState([]);
  const [selectedEmps, setSelectedEmps] = useState([]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleProjectSubmit = (event) => {
    console.log("here");
    event.preventDefault();
    console.log(formData);

    axios
      .post("http://localhost:3002/projects", formData)

      .then((res) => {
        console.log('asdasda',res.data);
        selectedEmps.forEach(async (emp) => {
          await axios.post("http://localhost:3002/projects/emp", {
            ProjectId: res.data.ProjectId,
            EmployeeId: emp,
          });
        });

        props.onFormClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios.get("http://localhost:3002/employees").then((res) => {
      setEmpls(res.data);
    });
  },[]);
  return (
    <React.Fragment>
      <h2 id="role-form-title">Add Project Details</h2>
      {/* <div id="role-form-outer-div">
      <div id="role-form-inner-div"> */}

      <div id="role-form-outer-div">
        <Form.Group id="form" onSubmit={handleProjectSubmit}>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Project Title
            </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control
                type="Text"
                placeholder="Project Title"
                name="Name"
                onChange={(e) => handleChange(e)}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Start date
            </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control
                type="Text"
                placeholder="YYYY-MM-DD"
                name="StartDate"
                onChange={(e) => handleChange(e)}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              End date
            </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control
                type="Text"
                placeholder="YYYY-MM-DD"
                name="EndDate"
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
                onChange={(e) =>
                  setFormData({ ...formData, Status: e.target.value })
                }
                required
              >
                <option value="Signed">Signed</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Closed">Closed</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Col} controlId="my_multiselect_field">
            <Form.Label>My multiselect</Form.Label>

            <Form.Control
              as="select"
              multiple
              onChange={(e) => {
                let arr = Array.from(e.target.selectedOptions).map(
                  (element) => element.value
                );
                setSelectedEmps(arr);
              }}
            >
              {emps.map((emp) => (
                <option key={emp.EmployeeId} value={emp.EmployeeId}>
                  {emp.FirstName} {emp.LastName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Row} id="form-submit-button">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit" onClick={handleProjectSubmit}>
                Submit
              </Button>
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
