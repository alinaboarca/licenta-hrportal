import React, { Component } from "react";
import "./Position.css";
import axios from "axios";
import PositionTable from "./PositionTable.jsx";
import PositionForm from "./PositionForm";
import PositionFormEdit from './PositionFormEdit';


class Departments extends Component {
  state = {
    table: true,
    editForm: false,
    editData: {}
  };

  render() {
    return (
      //  <Router>
      <React.Fragment>
        {this.state.table ? (
          this.state.editForm ? (
           
            <PositionFormEdit
              onFormEditClose={this.handleEditFormClose}
              editData={this.state.editData}
            />
          ) : (
              <PositionTable
                onAddPosition={this.handleAddPosition}
                onEditPosition={this.handleEditPosition}
              />
            )
        ) : (
            <PositionForm
              onFormClose={this.handleFormClose}
            />
          )}
      </React.Fragment>
    );
  }
  handleAddPosition = () => {
    this.setState({ table: false });
  };
  handleEditPosition = e => {
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

export default Departments;
