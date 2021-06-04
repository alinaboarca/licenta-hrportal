import React, { Component } from "react";
import "./Role.css";
import axios from "axios";
import RoleTable from "./RoleTable.jsx";
import { RoleForm } from "./RoleForm";
import { RoleFormEdit } from "./RoleFormEdit";

class Role extends Component {
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
            <RoleFormEdit
              onRoleEditUpdate={this.handleRoleEditUpdate}
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
            <RoleForm
              onEmployeeSubmit={this.handleEmployeeSubmit}
              onFormClose={this.handleFormClose}
            />
          )}

        
      </React.Fragment>


    );
  }

  handleAddRole = () => {
    console.log("clicked1");
    this.setState({ table: false });
  };
  handleEditRole = (data) => {
    console.log('asdasdasdasdasdasdasdasdasdas',data);
    console.log("clicked6");
    this.setState({ editForm: true });
    this.setState({ editData: data });
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
  handleRoleEditUpdate = (info, formData1, formData2) => {
    // this.setState({ table: true });
    let body = {
      // ...info,CompanyID:formData1,Role:formData2

      CompanyID: formData1,
      RoleName: formData2,

    };
    console.log("update", body);
    axios
      .put("https://employee-management-fk-api.herokuapp.com/api/role/" + info["_id"], body, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(res => {
        // this.componentDidMount();
        this.setState({ table: false });
        this.setState({ table: true });
      })
      .catch(err => {
        console.log(err);
      });

    this.setState({ editForm: false });
  };
}

export default Role;
