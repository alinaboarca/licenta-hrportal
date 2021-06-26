import React, { Component } from "react";
import "./Education.css";
import axios from "axios";
import EducationTable from "./EducationTable.jsx";
import  { BankAccountFormEdit } from "./EducationFormEdit";
import {BankAccountForm} from "./EducationForm";
class Education extends Component {
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
            <BankAccountFormEdit
              onEducationEditUpdate={this.handleEducationEditUpdate}
              onFormEditClose={this.handleEditFormClose}
              editData={this.state.editData}
            />
          ) : (
              <EducationTable
                onAddEducation={this.handleAddEducation}
                onEditEducation={this.handleEditEducation}
                data={this.props.data}
                back={this.props.back}
              />
            )
        ) : (
            <BankAccountForm
              onFormClose={this.handleFormClose}
              data={this.props.data}
              onGenderChange={this.handleAddFormGenderChange}
            />
          )}
      </React.Fragment>
    );
  }

  handleAddEducation = () => {
    console.log("clicked1");
    this.setState({ table: false });
  };
  handleEditEducation = e => {
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
  // handleFormClose = () => {
  //   console.log("clicked1");
  //   this.setState({ table: true });
  // };
  handleEducationEditUpdate = (info, newInfo) => {
    newInfo.preventDefault();
    console.log("zero data", newInfo.target[0].value);
    let body = {
      SchoolUniversity: newInfo.target[0].value,
      Degree: newInfo.target[1].value,
      Grade: newInfo.target[2].value,
      PassingOfYear: newInfo.target[3].value,
    };
    console.log("update", body);
    axios
      .put(
        "https://employee-management-fk-api.herokuapp.com/api/education/" + info["_id"],
        body, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      }
      )
      .then(res => {
        this.setState({ table: false });
        this.setState({ table: true });
      })
      .catch(err => {
        console.log(err);
      });

    this.setState({ editForm: false });
  };

}

export default Education;
