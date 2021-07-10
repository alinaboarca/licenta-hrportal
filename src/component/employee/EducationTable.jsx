import React, { Component } from "react";
import "./EducationTable.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/react";
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

class EducationTable extends Component {
  state = {
    educationData: [],
    loading: true,

    columnDefs: [

      {
        headerName: "Bank Name",
        field: "BankName",
        sortable: true,
        // width: 150,
        // filter: true ,
      },
      {
        headerName: "IBAN",
        field: "IBAN",
        sortable: true,
        // width: 150,
        // filter: true ,
      },
      {
        headerName: "SwiftCode",
        field: "SwiftCode",
        sortable: true,
        // width: 150,
        // filter: true ,
      },

      {
        headerName: "",
        field: "edit",
        filter: false,
        width: 30,
        cellRendererFramework: this.renderEditButton.bind(this)
      },
      {
        headerName: "",
        field: "delete",
        filter: false,
        width: 30,
        cellRendererFramework: this.renderButton.bind(this)
      }
    ],
    rowData: [],
    defaultColDef: {
      resizable: true,
      width: 295,
      filter: "agTextColumnFilter"
      // filter: true ,
    },
    getRowHeight: function (params) {
      return 35;
    }


  };
  educationObj = [];
  rowDataT = [];


  loadEducationData = () => {
    console.log(this.props.data["EmployeeId"],'asd')
    axios
      .get("http://localhost:3002/account/" + this.props.data["EmployeeId"])
      .then(response => {
       console.log('asdsadas', response.data)
        this.setState({ educationData: response.data });
        this.setState({ loading: false });
        
      })
      .catch(error => {
        console.log(error);
      });
  };

  onEducationDelete = (e1) => {
    
    if (window.confirm("Are you sure to delete this record? ") == true) {
      axios
        .delete("http://localhost:3002/account/" + e1)
        .then(res => {
          this.componentDidMount();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  componentDidMount() {
    this.loadEducationData();
  }
  renderButton(params) {
    console.log(params);
    if (this.props.back) { return <React.Fragment /> }
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() =>
          this.onEducationDelete(params.data["AccountId"])
        }
      />
    );
  }
  renderEditButton(params) {
    console.log(params);
    if (this.props.back) { return <React.Fragment /> }
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => this.props.onEditEducation(params.data)}
      />
    );
  }

  render() {
    return (
      <div id="table-outer-div-scroll">
        <h2 id="role-title">Bank Account Details {this.props.back ? "of " + this.props.data["FirstName"] + " " + this.props.data["LastName"] : ""}</h2>

        {this.props.back ? (<Link to="/hr/employee">
          <Button
            variant="primary"
            id="add-button"
          >
            Back
        </Button>
        </Link>) : <Button
          variant="primary"
          id="add-button"
          onClick={this.props.onAddEducation}
        >
            <FontAwesomeIcon icon={faPlus} id="plus-icon" />
            Add
        </Button>}



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
              rowData={this.state.educationData}
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

export default EducationTable;
