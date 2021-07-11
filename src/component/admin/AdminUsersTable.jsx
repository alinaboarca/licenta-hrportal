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

class AdminUsersTable extends Component {
  state = {
    portalData: [],
    loading: true,

    columnDefs: [

      {
        headerName: "User",
        field: "Username",
        sortable: true,
        // width: 150,
        // filter: true ,
      },

      {
        headerName: "Role",
        field: "Role",
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
      width: 590,
      filter: "agTextColumnFilter"
      // filter: true ,
    },
    getRowHeight: function (params) {
      return 35;
    }
  };
  portalObj = [];
  rowDataT = [];

  loadPortalData = () => {
    axios
      .get("http://localhost:3002/users")
      .then(response => {
       this.setState({ portalData: response.data });
        this.setState({ loading: false });
      })
      .catch(error => {
        console.log(error);
      });
  };

  onPortalDelete = e => {
    console.log(e);
    if (
      window.confirm(
        "Are you sure to delete this user? You can't bring him back "
      ) === true
    ) {
      axios
        .delete("http://localhost:3002/users/" + e)
        .then(res => {
          this.componentDidMount();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  componentDidMount() {
    this.loadPortalData();
  }
  renderButton(params) {
    
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() =>
          this.onPortalDelete(params.data.UserId)
        }
      />
    );
  }
  renderEditButton(params) {
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => this.props.onEditPortal(params.data)}
      />
    );
  }

  render() {
    return (
      <div id="table-outer-div-scroll">
        <h2 id="role-title">User Details</h2>
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
              rowData={this.state.portalData}
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

export default AdminUsersTable;
