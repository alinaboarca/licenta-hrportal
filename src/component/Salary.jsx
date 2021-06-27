import React, { Component } from "react";
import "./Salary.css";
import SalaryTable from "./SalaryTable.jsx";
import {SalaryFormEdit} from './SalaryFormEdit';
class Salary extends Component {
  state = {
    table: true,
    editForm: false,
  };

  render() {
    return (
      <React.Fragment>
          {this.state.editForm ? (
            <SalaryFormEdit
              onSalaryEditUpdate={this.handleSalaryEditUpdate}
              onFormClose={this.handleEditFormClose}
              editData={this.state.editData}
            />
          ) : (
            <SalaryTable
              onAddSalary={this.handleAddSalary}
              onEditSalary={this.handleEditSalary}              
            />
          ) 
          }
        </React.Fragment>
    );
  }
  
  handleAddSalary = () => {
    console.log("clicked1");
    this.setState({ table: false });
  };
  handleEditSalary = e => {
    console.log(e);
    console.log("clicked6");
    this.setState({ editForm: true });
    this.setState({ editData: e });
  };
  handleFormClose = () => {
    console.log("clicked1");
    this.setState({ table: true });
  };
  handleEditFormClose = () => {
    console.log("clicked5");
    this.setState({ editForm: false });
  };


}

export default Salary;
