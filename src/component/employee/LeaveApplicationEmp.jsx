import React, { Component } from "react";
import "./LeaveApplicationEmp.css";
import axios from "axios";
import LeaveApplicationEmpTable from "./LeaveApplicationEmpTable.jsx";
import { LeaveApplicationEmpFormtForm } from "./LeaveApplicationEmpForm.jsx";
import LeaveApplicationEmpFormEdit, { LeaveApplicationEmpFormtFormEdit } from "./LeaveApplicationEmpFormEdit.jsx";
class LeaveApplicationEmp extends Component {
  state = {
    table: true,
    editForm: false,
    editData: {},

  };

  render() {
    return (
      <React.Fragment>


        {this.state.table ? (
          this.state.editForm ? (
            <LeaveApplicationEmpFormtFormEdit
              onFormEditClose={this.handleEditFormClose}
              editData={this.state.editData}
            />
          ) : (
              <LeaveApplicationEmpTable
                onEditLeaveApplicationEmp={this.handleEditLeaveApplicationEmp}
                data={this.props.data}
              />
            )
        ) : (
            <LeaveApplicationEmpFormtForm
              onFormClose={this.handleFormClose}
              data={this.props.data}
            />
          )}
      </React.Fragment>
    );
  }
 
  handleAddLeaveApplicationEmp = () => {
    console.log("clicked1");
    this.setState({ table: false });
  };
  handleEditLeaveApplicationEmp = e => {
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

export default LeaveApplicationEmp;
