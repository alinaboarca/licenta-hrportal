import React, { Component } from "react";
import "./RoleTable.css";
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

class ViewDepartment extends Component {
  state = {
    roleData: [],
    loading: true,
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
      }
    ],
    rowData: [],
    defaultColDef: {
      resizable: true,
      width: 590,
      filter: "agTextColumnFilter"
      // filter: true ,
    },
    getRowHeight: function(params) {
      return 35;
    }

  };
  roleObj = [];
  rowDataT = [];

  loadRoleData = () => {
    const id = this.props.match.params.id;
    axios
      .get("http://localhost:3002/employees/department/"+id)
      .then(response => {
          console.log(response.data);
        this.setState({ roleData: response.data });
        this.setState({ loading: false });
      })
      .catch(error => {
        console.log(error);
      });
  };

  

  componentDidMount() {
    this.loadRoleData();
  }
  

  render() {
    return  <React.Fragment>
        {!this.state.loading ? (
            <div id="table-outer-div-scroll">
              {this.state.roleData[0] ? <h2 id="role-title">Employees in the {this.state.roleData[0].Department.Name} department</h2> : 
              <h2 id="role-title">No Employees in the selected department</h2> }
           
            <div id="clear-both" />
          <div
            id="table-div"
            className="ag-theme-balham"
          >
            <AgGridReact
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              columnTypes={this.state.columnTypes}
              rowData={this.state.roleData}
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
    
  }
}

export default ViewDepartment;
