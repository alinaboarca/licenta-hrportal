import React, { Component } from "react";
import "./LeaveApplicationHRTable.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/react";
import { Form, Button, Col, Row } from "react-bootstrap";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

class LeaveApplicationHRTable extends Component {
  state = {
    leaveApplicationEmpData: [],
    loading: true,

    columnDefs: [
      {
        headerName: "Start Date",
        field: "StartDate",
        sortable: true,
        // width: 150,
        // filter: true ,
      },

      {
        headerName: "End Date",
        field: "EndDate",
        sortable: true,
        filter: "agDateColumnFilter",
        // width: 150,
        // filter: true ,
      },

      {
        headerName: "Reason",
        field: "Reason",
        sortable: true,
        // width: 150,
        // filter: true ,
      },
      {
        headerName: "Number Of Hours Per Day",
        field: "NumberOfHours",
        sortable: true,
        // width: 150,
        // filter: true ,
      },
      {
        headerName: "Status",
        field: "Status",
        sortable: true,
        // width: 150,
        // filter: true ,
      },
      {
        headerName: "",
        field: "edit",
        filter: false,
        width: 30,
        cellRendererFramework: this.renderEditButton.bind(this),
      },
    ],
    defaultColDef: {
      resizable: true,
      width: 235,
      filter: "agTextColumnFilter",
      // filter: true ,
    },
    getRowHeight: function (params) {
      return 35;
    },
  };
  leaveApplicationEmpObj = [];
  rowDataT = [];

  loadLeaveApplicationEmpData = () => {
    axios
      .get("http://localhost:3002/leave")
      .then((response) => {
        console.log("response", response.data);
        this.setState({ leaveApplicationEmpData: response.data });
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount() {
    this.loadLeaveApplicationEmpData();
  }

  renderButton(params) {
    console.log("params", params);
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() =>
          this.onLeaveApplicationEmpDelete(params.data["LeaveApplicationId"])
        }
      />
    );
  }
  renderEditButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon icon={faEdit} onClick={() => this.onEdit(params.data)} />
    );
  }

  onEdit = (data) => {
    this.props.onEditLeaveApplicationHR(data);
  };

  render() {
    return (
      <div id="table-outer-div-scroll">
        <h2 id="role-title">Leave Applications</h2>
        <div id="clear-both" />

        {!this.state.loading ? (
          <div id="table-div" className="ag-theme-balham">
            <AgGridReact
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              columnTypes={this.state.columnTypes}
              rowData={this.state.leaveApplicationEmpData}
              pagination={true}
              paginationPageSize={10}
              getRowHeight={this.state.getRowHeight}
            />
          </div>
        ) : (
          <div id="loading-bar">
            <RingLoader
              css={override}
              sizeUnit={"px"}
              size={50}
              color={"#0000ff"}
              loading={true}
            />
          </div>
        )}
      </div>
    );
  }
}

export default LeaveApplicationHRTable;
