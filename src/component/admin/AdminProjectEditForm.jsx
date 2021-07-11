import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useEffect } from "react";


export const AdminProjectEditForm = (props) => {
  const [formData,setFormData] = useState({...props.editData})
  const  handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value })
  };
  const [emps, setEmpls] = useState([]);

  const [selectedEmps, setSelectedEmps] = useState([]);

 const handleProjectSubmit = (event) => {
    event.preventDefault();
    console.log(formData);

    axios
      .put(`http://localhost:3002/projects/${props.editData.ProjectId}`, formData)

      .then((res) => {
        console.log(res.data);
        selectedEmps.forEach(async (emp) => {
          await axios.post("http://localhost:3002/projects/emp", {
            ProjectId: props.editData.ProjectId,
            EmployeeId: emp,
          });
        });

        props.onFormEditClose();
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
  useEffect(() => {
    axios
    .get("http://localhost:3002/projects/allEmp/" + props.editData.ProjectId)
    .then(response => {
      console.log("response", response.data);
     
      let value = Array.from(response.data, option => option.Employee.EmployeeId);
      console.log('selected', value);
      setSelectedEmps(value);
    })
    .catch(error => {
      console.log(error);
    });
  },[])
  return (
    <React.Fragment>
    <h2 id="role-form-title">Edit Project Details</h2>
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
              value={formData.Name}
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
              value={formData.StartDate}
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
              value={formData.EndDate}
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
              defaultValue={formData.Status}
              onChange={(e) =>
                setFormData({ ...formData, Status: e.target.value })
              }
              required
            
            >
              <option value="Signed">Signed</option>
              <option  value="Ongoing">Ongoing</option>
              <option  value="Closed">Closed</option>
            </Form.Control>
          </Col>
          
          <Form.Group as={Col} controlId="my_multiselect_field">
            <Form.Label>My multiselect</Form.Label>

            <Form.Control
              as="select"
              multiple
              value={selectedEmps}
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
        </Form.Group>
        <Form.Group as={Row} id="form-submit-button">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit" onClick={handleProjectSubmit}>Submit</Button>
          </Col>
        </Form.Group>
        <Form.Group as={Row} id="form-cancel-button">
          <Col sm={{ span: 10, offset: 2 }} id="form-cancel-button-inner">
            <Button type="reset" onClick={props.onFormEditClose}>
              cancel
            </Button>
          </Col>
        </Form.Group>
      </Form.Group>
    </div>
  </React.Fragment>
  )
}


