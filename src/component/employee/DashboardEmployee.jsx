import React, { Component } from "react";
import "./DashboardEmployee.css";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from "react-router";
import { Redirect } from "react-router-dom";
import NavBar from "../NavBar.jsx";
import PersonalInfo from "./PersonalInfo.jsx";
import Education from "./Education.jsx";
import FamilyInfo from "./FamilyInfo.jsx";
import WorkExperience from "./WorkExperience.jsx";
import LeaveApplicationEmp from "./LeaveApplicationEmp.jsx";
import NotFound404 from "../NotFound404.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faUser,
  faFileAlt,
  faUniversity,
  faBriefcase,
  faMale,
} from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import WorkExperienceTable from "./WorkExperienceTable";

class DashboardHR extends Component {
  state = {
    redirect: true,
    checked: true,
    employee: {},
    loading: true
  };
  handleChange = (checked) => {
    console.log("switch");
    // var sidebarV = this.refs.sidebar;
    // var sidebarV = React.findDOMNode( this.refs.sidebar);
    // sidebarV.style.disply="none";

    if (this.state.checked == true) {
      // document.getElementById("sidebar").setAttribute("style", "display:none")
      document.getElementById("sidebar").setAttribute("class", "display-none");
    }
    // document.getElementById("sidebar").setAttribute("style", "display:block");
    else {
      document.getElementById("sidebar").setAttribute("class", "display-block");
    }
    this.setState({ checked });
  };

  componentDidMount() {
    Axios.get(
      "http://localhost:3002/employees/user/" + this.props.data["UserId"]
    ).then((res) => {
      console.log(res.data);
      this.setState({ employee: res.data, loading: false});
    });
  }
  render() {
    return (
      <React.Fragment>
      {!this.state.loading && <Router>
        {/* <Redirect to='/login'  /> */}

        <div id="outer-main-div">
          <div id="outer-nav">
            {/* <NavBar loginInfo={this.state.employee} /> */}
            <NavBar
              loginInfo={this.state.employee}
              checked={this.state.checked}
              handleChange={this.handleChange}
              onLogout={this.props.onLogout}
            />
          </div>

          <div id="main-non-nav">
            <div id="sidebar">
              <div id="sidebar-top-content" />
              <div id="main-title" className="main-title-employee">
                <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
                Employee
              </div>
              <ul className="navbar-ul">
                <li>
                  <Link
                    to={
                      "/employee/" +
                      this.state.employee["EmployeeId"] +
                      "/personal-info"
                    }
                  >
                    <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
                    Personal Information
                  </Link>
                </li>
                <li>
                  <Link
                    to={
                      "/employee/" +
                      this.state.employee["EmployeeId"] +
                      "/bank-account"
                    }
                  >
                    <FontAwesomeIcon
                      icon={faUniversity}
                      className="sidebar-icon"
                    />
                    Bank Account
                  </Link>
                </li>
                <li>
                  <Link
                    to={
                      "/employee/" +
                      this.state.employee["EmployeeId"] +
                      "/projects"
                    }
                  >
                    <FontAwesomeIcon
                      icon={faBriefcase}
                      className="sidebar-icon"
                    />
                    Project Work
                  </Link>
                </li>
                <li>
                  <Link
                    to={
                      "/employee/" +
                      this.state.employee["EmployeeId"] +
                      "/leave-application-emp"
                    }
                  >
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      className="sidebar-icon"
                    />
                    Leave Application
                  </Link>
                </li>
              </ul>
            </div>
            <div id="main-area">
              <div id="sidebar-top-content" />

              <Switch>
                <Route
                  exact
                  path="/employee/:id/personal-info"
                  render={(props) => (
                    <PersonalInfo data={this.state.employee} back={false} />
                  )}
                />
                <Route
                  exact
                  path="/employee/:id/bank-account"
                  render={(props) => (
                    <Education data={this.state.employee} back={false} />
                  )}
                />
                
                <Route
                  exact
                  path="/employee/:id/projects"
                  render={(props) => (
                    <WorkExperienceTable
                    data={this.state.employee}
                    /> 
                  )}
                />
                <Route
                  exact
                  path="/employee/:id/leave-application-emp"
                  render={(props) => (
                    <LeaveApplicationEmp data={this.state.employee} />
                  )}
                />
                {/* <Route
                  render={
                    () => 
                     <Redirect to={"/employee/"+ this.state.employee["EmployeeId"]+"/personal-info"} />
                  }
                /> */}
              </Switch>
            </div>
          </div>
        </div>
      </Router>}
      </React.Fragment>
    );
  }
}

export default DashboardHR;
