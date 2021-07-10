import React, { Component } from "react";
import "./PositionTable.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/react";
import { Button } from "react-bootstrap";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { withRouter } from "react-router-dom";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

class PositionTable extends Component {
  state = {
    departmentData: [],
    loading: true,

    columnDefs: [
      {
        headerName: "Department",
        field: "Name",
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
      {
        headerName: "",
        field: "delete",
        filter: false,
        width: 30,
        cellRendererFramework: this.renderButton.bind(this),
      },
    ],
    rowData: [],
    defaultColDef: {
      resizable: true,
      width: 590,
      filter: "agTextColumnFilter",
      // filter: true ,
    },
    getRowHeight: function (params) {
      return 35;
    },
  };
  positionObj = [];
  rowDataT = [];

  loadDepartmentData = () => {
    axios
      .get("http://localhost:3002/departments")
      .then((response) => {
        console.log("departments", response.data);
        this.setState({ departmentData: response.data });
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onPositionDelete = (e) => {
    console.log(e);
    if (window.confirm("Are you sure to delete this record ? ") === true) {
      axios
        .delete("http://localhost:3002/departments/" + e)
        .then((res) => {
          this.componentDidMount();
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);
          if (err.response.status === 403) {
            window.alert(err.response.data);
          }
        });
    }
  };
  componentDidMount() {
    this.loadDepartmentData();
  }
  renderButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() => this.onPositionDelete(params.data.DepartmentId)}
      />
    );
  }
  renderEditButton(params) {
    console.log("asdsadasda", params.data);
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => this.props.onEditPosition(params.data)}
      />
    );
  }

  render() {
    const { history } = this.props;
    return (
      <div id="table-outer-div-scroll">
        <h2 id="role-title">Departments details</h2>

        <Button
          variant="primary"
          id="add-button"
          onClick={this.props.onAddPosition}
        >
          <FontAwesomeIcon icon={faPlus} id="plus-icon" />
          Add
        </Button>
        <div id="clear-both" />
        {!this.state.loading ? (
          <div id="table-div" className="ag-theme-balham">
            <AgGridReact
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              columnTypes={this.state.columnTypes}
              onCellClicked={(e) => { 
                console.log(e);
                if(e.colDef.field !== "edit" && e.colDef.field !== "delete") {
                  if ( window.location.href.indexOf("admin") > -1) {
                    history.push("/admin/departments/" + e.data.DepartmentId);
                  } else {
                    history.push("/hr/departments/" + e.data.DepartmentId);
                  }
                }
                
              }}
              rowData={this.state.departmentData}
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

export default withRouter(PositionTable);
