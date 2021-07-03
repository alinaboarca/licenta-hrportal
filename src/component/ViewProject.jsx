import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/react";
import { Button } from "react-bootstrap";


import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";


const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

class ViewProject extends Component {
  state = {
    projectData: [],
    loading: true,

    columnDefs: [
        {
            headerName: "First Name",
            field: "Employee.FirstName",
            sortable: true,
             width: 250,
            // filter: true ,
          },
       
          {
            headerName: "Last Name",
            field: "Employee.LastName",
            sortable: true,
            width: 250,
          },
          {
            headerName: "Email",
            field: "Employee.Email",
            sortable: true,
            width: 250,
          },
          {
            headerName: "Phone Number",
            field: "Employee.Phone",
            sortable: true,
            width: 250,
          },
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
    const id = this.props.match.params.id;

    axios
      .get("http://localhost:3002/projects/allEmp/" + id)
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
    return ( <React.Fragment>
     

        {!this.state.loading ? (
            <div id="table-outer-div-scroll">
            <h2 id="role-title"> { this.state.projectData[0] ? `Employees that work on ${this.state.projectData[0].Project.Name} Project` : `No employees added to this project` }</h2>
            <div id="clear-both" />
          <div
            id="table-div"
            className="ag-theme-balham"
          >
            <AgGridReact
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              columnTypes={this.state.columnTypes}
              rowData={this.state.projectData}
              pagination={true}
              paginationPageSize={10}
              getRowHeight={this.state.getRowHeight}
            />
          </div>
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

      </React.Fragment>
    );
  }
}

export default ViewProject;
