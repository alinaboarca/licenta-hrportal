import React, { Component } from "react";
import "./AdminProjectBid.css";
import AdminProjectBidTable from "./AdminProjectBidTable.jsx";
import { AdminProjectBidForm } from "./AdminProjectBidForm";
import { AdminProjectBidFormEdit } from "./AdminProjectBidFormEdit";

class AdminProjectBid extends Component {
  state = {
    table: true,
    editForm: false,
    editData: {}
  };

  render() {
    return (
      <React.Fragment>
        {this.state.table ? (
          this.state.editForm ? (
            <AdminProjectBidFormEdit
              onFormEditClose={this.handleEditFormClose}
              editData={this.state.editData}
            />
          ) : (
            <AdminProjectBidTable
              onAddProjectBid={this.handleAddProjectBid}
              onEditProjectBid={this.handleEditProjectBid}
            />
          )
        ) : (
          <AdminProjectBidForm
            onFormClose={this.handleFormClose}
          />
        )}
        </React.Fragment>
    );
  }

  handleAddProjectBid = () => {
    console.log("clicked1");
    this.setState({ table: false });
  };
  handleEditProjectBid = e => {
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
  handleFormClose = () => {
    console.log("clicked1");
    this.setState({ table: true });
  };
}

export default AdminProjectBid;
