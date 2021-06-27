import React, { Component } from "react";
import "./DashboardHR.css";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from "react-router";
import Employees from "../Employees.jsx";
import NavBar from "../NavBar.jsx";
import Salary from "../Salary.jsx";
import LeaveApplicationHR from "./LeaveApplicationHR.jsx";
import NotFound404 from "../NotFound404.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faBuilding,
  faUserTie,
  faRupeeSign,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import Departments from "../Departments";

function DepartmentF() {
  return <Departments />;
}

function EmployeeF() {
  return <Employees />;
}
function SalaryF() {
  return <Salary />;
}

class DashboardHR extends Component {
  state = {
    redirect: true,
    checked: true,
    employee: {},
  };
  handleChange = (checked) => {
    console.log("switch");
    if (this.state.checked == true) {
      document.getElementById("sidebar").setAttribute("class", "display-none");
    } else {
      document.getElementById("sidebar").setAttribute("class", "display-block");
    }
    this.setState({ checked });
  };
  componentDidMount() {
    console.log("in hr");
    Axios.get(
      "http://localhost:3002/employees/user/" + this.props.data["UserId"]
    ).then((res) => {
      console.log(res.data);
      this.setState({ employee: res.data, loading: false });
    });
  }

  render() {
    return (
      <Router>
        <div id="outer-main-div">
          <div id="outer-nav">
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
              <div id="main-title">
                <FontAwesomeIcon icon={faUserTie} className="sidebar-icon" />
                HR
              </div>
              <ul className="navbar-ul">
                <li>
                  <Link to="/hr/employees">
                    <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
                    Employees
                  </Link>
                </li>
                <li>
                  <Link to="/hr/salary">
                    <FontAwesomeIcon
                      icon={faRupeeSign}
                      className="sidebar-icon"
                    />
                    Salary
                  </Link>
                </li>
                <li>
                  <Link to="/hr/leave-application">
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      className="sidebar-icon"
                    />
                    Leave Application
                  </Link>
                </li>

                <li>
                  <Link to="/hr/departments">
                    <FontAwesomeIcon
                      icon={faBuilding}
                      className="sidebar-icon"
                    />
                    Departments
                  </Link>
                </li>
              </ul>
            </div>
            <div id="main-area">
              <div id="sidebar-top-content" />
              <Switch>
                <Route
                  path="/hr/employees"
                  // exact
                  component={EmployeeF}
                />
                <Route path="/hr/salary" exact component={SalaryF} />

                <Route path="/hr/departments" exact component={DepartmentF} />
                <Route
                  exact
                  path="/hr/leave-application"
                  render={(props) => (
                    <LeaveApplicationHR data={this.state.employee} />
                  )}
                />

                <Route render={() => <NotFound404 />} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default DashboardHR;
