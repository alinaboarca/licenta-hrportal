import React, { Component } from "react";
import "./PersonalInfo.css";
import PersonalInfoTable from "./PersonalInfoTable.jsx";
import { RoleFormEdit } from "../RoleFormEdit";
class PersonalInfo extends Component {
  state = {
    table: true,
    editForm: false,
    editData: this.props.data,
  };

  render() {
    return (
      <React.Fragment>

        {this.state.table ? (
          this.state.editForm ? (
            <RoleFormEdit
              onFormEditClose={this.handleEditFormClose}
              editData={this.state.editData}
              canEditSalary={false}
            
            />
          ) : (
              <PersonalInfoTable
                onEditPersonalInfo={this.handleEditPersonalInfo}
                id={this.state.editData.EmployeeId}
                back={this.props.back}
              />
            )
        ) : (
            <div />
          )}
      </React.Fragment>
    );
  }
  handleEditPersonalInfo = e => {
    console.log("clicked6",e);
    this.setState({ editForm: true });
    this.setState({ editData: e });

  };
  handleEditFormClose = (e) => {
    console.log("clicked5");
    console.log(e);
    this.setState({ editForm: false });
    this.setState({ editData: e });
  };
}

export default PersonalInfo;
