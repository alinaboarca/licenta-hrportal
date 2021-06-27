import React, { Component } from "react";
// import "./AdminSalaryTable.css";
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


class AdminSalaryTable extends Component {
  state = {
    salaryData: [],
    loading: true,


    columnDefs: [
      {
        headerName: "First Name",
        field: "FirstName",
        sortable: true
        // filter: true ,
      },
      {
        headerName: "Last Name",
        field: "LastName",
        sortable: true
        // filter: true ,
      },
      {
        headerName: "Salary",
        field: "Salary",
        sortable: true,
        type: "numberColumn",
        filter: 'agNumberColumnFilter'
        // filter: true ,
      },
      {
        headerName: "Bank Name",
        field: "BankAccount.BankName",
        sortable: true
        // filter: true ,
      },
      {
        headerName: "IBAN",
        field: "BankAccount.IBAN",
        sortable: true
        // filter: true ,
      },

      {
        headerName: "SwiftCode",
        field: "BankAccount.SwiftCode",
        sortable: true,
        // width: 117,
        // filter: true ,
      },   
      {
        headerName: "",
        field: "edit",
        filter: false ,
        width: 30,
        cellRendererFramework: this.renderEditButton.bind(this),
      
    
      }
    ],
    rowData: [],
    defaultColDef: {
      resizable: true,
      width: 200,
      filter: "agTextColumnFilter"
      // filter: true ,
    },
    getRowHeight: function(params) {
      return 35;
    }


  };
  salaryObj = [];
  rowDataT = [];

  loadSalaryData = () => {
    axios
      .get("http://localhost:3002/emp/salary")
      .then(response => {
        console.log(response.data)
        this.setState({ salaryData: response.data });
        this.setState({ loading: false });
      })
      .catch(error => {
        console.log(error);
      });
  };

  
  componentDidMount() {
    this.loadSalaryData();
  }
  
  renderEditButton(params){
    console.log(params);
    return <FontAwesomeIcon
    icon={faEdit}
    onClick={() => this.props.onEditSalary(params.data)}
  />;
  }

  render() {
    return (
      <div id="table-outer-div-scroll">
        <h2 id="role-title">Salary Details</h2>

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
              rowData={this.state.salaryData}
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

export default AdminSalaryTable;
