import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Col, Row } from "react-bootstrap";


export const AdminProjectEditForm = (props) => {
  const [formData,setFormData] = useState({...props.editData})
  const  handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value })
   
  };
 const handleProjectSubmit = (event) => {
    event.preventDefault();
    console.log(formData);

    axios
      .put(`http://localhost:3002/projects/${props.editData.ProjectId}`, formData)

      .then((res) => {
        console.log(res.data);
        props.onFormEditClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <React.Fragment>
    <h2 id="role-form-title">Add Project Details</h2>
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


