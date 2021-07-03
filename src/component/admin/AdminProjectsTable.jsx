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
import { withRouter } from "react-router-dom";


const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

class AdminProjectsTable extends Component {
  state = {
    projectData: [],
    loading: true,

    columnDefs: [
      
      {
        headerName: "Project Title",
        field: "Name",
        sortable: true
        // filter: true ,
      },
      {
        headerName: "Start Date",
        field: "StartDate",
        sortable: true,
        
        // filter: true ,
      },
      {
        headerName: "End Date",
        field: "EndDate",
        sortable: true
        // filter: true ,
      },
      {
        headerName: "Status",
        field: "Status",
        sortable: true
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
      .get("http://localhost:3002/projects")
      .then(response => {
        console.log("response", response.data);
        this.setState({ projectData: response.data });
        this.setState({ loading: false });
      })
      .catch(error => {
        console.log(error);
      });
  };

  onProjectBidDelete = e => {
    console.log(e);
    if (window.confirm("Are you sure to delete this record? ") === true) {
      axios
        .delete("http://localhost:3002/projects/" + e)
        .then(res => {
          this.componentDidMount();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  componentDidMount() {
    this.loadprojectData();
  }
  renderButton(params) {
    console.log(params);
    return <FontAwesomeIcon
      icon={faTrash}
      onClick={() => this.onProjectBidDelete(params.data.ProjectId)}
    />;
  }
  renderEditButton(params) {
    console.log(params);
    return <FontAwesomeIcon
      icon={faEdit}
      onClick={() => this.props.onEditProjectBid(params.data)}
    />;
  }

  render() {
    const {  history } = this.props;
    return (
      <div id="table-outer-div-scroll">
        <h2 id="role-title">Project Details</h2>
        <Button
          variant="primary"
          id="add-button"
          onClick={this.props.onAddProjectBid}
        >
          <FontAwesomeIcon icon={faPlus} id="plus-icon" />
          Add
        </Button>

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
              columnTyps={this.state.columnTypes}
              rowData={this.state.projectData}
              onCellClicked={e => history.push('/admin/project/'+e.data.ProjectId) }
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

export default withRouter(AdminProjectsTable);
