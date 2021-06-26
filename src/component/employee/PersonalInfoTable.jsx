import React, { Component } from "react";
import "./PersonalInfoTable.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";


const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

class PersonalInfoTable extends Component {
  state = {
    personalInfoData: [],
    loading: false,

    columnDefs: [
      {
        headerName: "First Name",
        field: "FirstName",
        sortable: true,
         width: 250,
        // filter: true ,
      },
   
      {
        headerName: "Last Name",
        field: "LastName",
        sortable: true,
        width: 250,
      },
      {
        headerName: "Email",
        field: "Email",
        sortable: true,
        width: 250,
      },
      {
        headerName: "Phone Number",
        field: "Phone",
        sortable: true,
        width: 250,
      },
      {
        headerName: "Salary",
        field: "Salary",
        sortable: true,
        width: 250,
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
      width: 120,
      filter: "agTextColumnFilter"
      // filter: true ,
    },
    getRowHeight: function (params) {
      return 35;
    }
  };
  personalInfoObj = [];
  rowDataT = [];
  componentDidMount() {
    let x = [];
    axios.get('http://localhost:3002/employees/'+this.props.id).then(res => {
      x.push(res.data);
      this.setState({personalInfoData: x});
    })
  }

  renderEditButton(params) {
    console.log(params);
    if (this.props.back) { return <React.Fragment /> }
    return <FontAwesomeIcon
      icon={faEdit}
      onClick={() => this.props.onEditPersonalInfo(params.data)}
    />;
  }

  render() {
    return (
      <div id="table-outer-div-scroll">
        <h2 id="role-title">Employee Personal Details {this.state.personalInfoData[0] ? "of " + this.state.personalInfoData[0]["FirstName"] + " " + this.state.personalInfoData[0]["LastName"] : ""}</h2>
        {/* 
        <Button
          variant="primary"
          id="add-button"
          onClick={this.props.onAddPersonalInfo}
        >
          <FontAwesomeIcon icon={faPlus} id="plus-icon" />
          Add
        </Button> */}
        {this.props.back ? (<Link to="/hr/employee">
          <Button
            variant="primary"
            id="add-button"
          >
            Back
        </Button>
        </Link>) : <React.Fragment />}


        <div id="clear-both" />

        {!this.state.loading ? (
          <div
            id="table-div"
            className="ag-theme-balham"
          //   style={
          //     {
          //     height: "500px",
          //     width: "100%"
          //   }
          // }
          >
            <AgGridReact
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              columnTypes={this.state.columnTypes}
              rowData={this.state.personalInfoData}
              // floatingFilter={true}
              // onGridReady={this.onGridReady}
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

export default PersonalInfoTable;
