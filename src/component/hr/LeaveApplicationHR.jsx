import React, { Component } from "react";
import "./LeaveApplicationHR.css";
import LeaveApplicationHRTable from "./LeaveApplicationHRTable.jsx";
import { LeaveApplicationEHrFormtFormEdit } from "./LeaveApplicationHRFormEdit.jsx";
class LeaveApplicationHR extends Component {
  state = {
    table: true,
    editForm: false,
    editData: {},

  };

  render() {
    return (
      <React.Fragment>
          {this.state.editForm ? (
            <LeaveApplicationEHrFormtFormEdit
              onLeaveApplicationHREditUpdate={this.handleLeaveApplicationHREditUpdate}
              onFormEditClose={this.handleEditFormClose}
              editData={this.state.editData}
            />
          ) : (
              <LeaveApplicationHRTable
                onAddLeaveApplicationHR={this.handleAddLeaveApplicationHR}
                onEditLeaveApplicationHR={this.handleEditLeaveApplicationHR}
                data={this.props.data}
                
              />
            )
        }
      </React.Fragment>
    );
  }

  handleAddLeaveApplicationHR = () => {
    console.log("clicked1");
    this.setState({ table: false });
  };
  handleEditLeaveApplicationHR = e => {
    console.log(e);
    console.log("clicked6");
    this.setState({ editForm: true });
    this.setState({ editData: e });
    this.setState({ editFormGender: e["Gender"] })
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

export default LeaveApplicationHR;
