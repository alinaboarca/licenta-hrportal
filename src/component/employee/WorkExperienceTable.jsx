import React, { Component } from "react";
import "./WorkExperienceTable.css";
import axios from "axios";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/react";


import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";


const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

class WorkExperienceTable extends Component {
  state = {
    projectData: [],
    loading: true,

    columnDefs: [
      
      {
        headerName: "Project Title",
        field: "Project.Name",
        sortable: true
        // filter: true ,
      },
      {
        headerName: "Start Date",
        field: "Project.StartDate",
        sortable: true,
        
        // filter: true ,
      },
      {
        headerName: "End Date",
        field: "Project.EndDate",
        sortable: true
        // filter: true ,
      },
      {
        headerName: "Status",
        field: "Project.Status",
        sortable: true
        // filter: true ,
      }
    ],
    rowData: [],
    defaultColDef: {
      resizable: true,
      width: 200,
      filter: "agTextColumnFilter"
      // filter: true ,
    },
    getRowHeight: function (params) {
      return 35;
    }
  };
  projectBidObj = [];
  rowDataT = [];

  loadprojectData = () => {
    axios
      .get("http://localhost:3002/projects/emp/"+this.props.data.EmployeeId)
      .then(response => {
        console.log("response", response.data);
        this.setState({ projectData: response.data });
        this.setState({ loading: false });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.loadprojectData();
  }
  
  render() {
    return (
      <div id="table-outer-div-scroll">
        <h2 id="role-title">Project History {this.props.data?"of " +this.props.data["FirstName"]+" "+this.props.data["LastName"]:""}</h2>

        
        <div id="clear-both" />

{!this.state.loading ? (
  <div
    id="table-div"
    className="ag-theme-balham"
  >
    <AgGridReact
      columnDefs={this.state.columnDefs}
      defaultColDef={this.state.defaultColDef}
      columnTypes={this.state.columnTypes}
      rowData={this.state.projectData}
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

export default WorkExperienceTable;
