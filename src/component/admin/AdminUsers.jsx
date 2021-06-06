import React, { Component } from "react";
import "./AdminPortal.css";
import AdminPortalTable from "./AdminPortalTable.jsx";
import {AdminUsersFormEdit} from "./AdminUsersFormEdit";
import { AdminUsersForm } from "./AdminUsersForm";

class AdminUsers extends Component {
  state = {
    table: true,
    editForm: false,
    editData: {},
    addFormStatus: "",
    editFormStatus: "",
  };

  render() {
    return (
      <React.Fragment>
        {this.state.table ? (
          this.state.editForm ? (
            <AdminUsersFormEdit
              onFormEditClose={this.handleEditFormClose}
              editData={this.state.editData}
            />
          ) : (
            <AdminPortalTable
              onAddPortal={this.handleAddPortal}
              onEditPortal={this.handleEditPortal}
            />
          )
        ) : (
          <AdminUsersForm onFormClose={this.handleFormClose} />
        )}
      </React.Fragment>
    );
  }

  handleAddPortal = () => {
    console.log("clicked1");
    this.setState({ table: false });
  };
  handleEditPortal = (e) => {
    console.log(e);
    console.log("clicked6");
    this.setState({ editForm: true });
    this.setState({ editData: e });
    this.setState({ editFormStatus: e["Status"] });
  };
  handleFormClose = () => {
    console.log("clicked1");
    this.setState({ table: true });
  };
  handleEditFormClose = () => {
    console.log("clicked5");
    this.setState({ editForm: false });
  };
  handleFormClose = () => {
    console.log("clicked1");
    this.setState({ table: true });
  };
}

export default AdminUsers;
