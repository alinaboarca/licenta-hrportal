import React, { Component } from "react";
import "./Role.css";
import RoleTable from "./RoleTable.jsx";
import { RoleForm } from "./RoleForm";
import { RoleFormEdit } from "./RoleFormEdit";

class Role extends Component {
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
            <RoleFormEdit
              onFormEditClose={this.handleEditFormClose}
              editData={this.state.editData}
            />
          ) : (
            <RoleTable
              onAddRole={this.handleAddRole}
              onEditRole={this.handleEditRole}
            />
          )
        ) : (
          <RoleForm onFormClose={this.handleFormClose} />
        )}
      </React.Fragment>
    );
  }

  handleAddRole = () => {
    this.setState({ table: false });
  };
  handleEditRole = (data) => {
    this.setState({ editForm: true });
    this.setState({ editData: data });
  };
  handleFormClose = () => {
    this.setState({ table: true });
  };
  handleEditFormClose = () => {
    this.setState({ editForm: false });
  };
  handleFormClose = () => {
    this.setState({ table: true });
  };
}

export default Role;
