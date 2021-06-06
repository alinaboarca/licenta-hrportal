import React, { Component } from "react";
import "./DashboardAdmin.css";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from "react-router";

import Role from "../Role.jsx";
import NavBar from "../NavBar.jsx";
import Position from "../Position.jsx";
import AdminUsers from "./AdminUsers.jsx";
import AdminProjectBid from "./AdminProjectBid.jsx";
import NotFound404 from "../NotFound404.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsersCog,
  faUsers,
  faBuilding,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";

function RoleAdminF() {
  return <Role />;
}

function PositionF() {
  return <Position />;
}

function AdminUsersF() {
  return <AdminUsers />;
}
function AdminProjectBidF() {
  return <AdminProjectBid />;
}

class DashboardAdmin extends Component {
  state = {
    redirect: true,
    checked: true,
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

  render() {
    return (
      <Router>
        {/* <Redirect to='/login'  /> */}

        <div id="outer-main-div">
          <div id="outer-nav">
            <NavBar
              loginInfo={this.props.data}
              checked={this.state.checked}
              handleChange={this.handleChange}
              onLogout={this.props.onLogout}
            />
          </div>

          <div id="main-non-nav">
            <div id="sidebar">
              <div id="sidebar-top-content" />
              <div id="main-title">
                <FontAwesomeIcon icon={faUsersCog} className="sidebar-icon" />
                Admin
              </div>
              <ul className="navbar-ul">
                <li>
                  <Link to="/admin/employees">
                    <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
                    Employees
                  </Link>
                </li>
                <li>
                  <Link to="/admin/departments">
                    <FontAwesomeIcon
                      icon={faBuilding}
                      className="sidebar-icon"
                    />
                    Departments
                  </Link>
                </li>
                <li>
                  <Link to="/admin/projects">
                    <FontAwesomeIcon
                      icon={faDollarSign}
                      className="sidebar-icon"
                    />
                    Projects Details
                  </Link>
                </li>
                <li>
                  <Link to="/admin/users">
                    <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
                    Users
                  </Link>
                </li>
              </ul>
            </div>
            {/* <div id="sidebar-top-content" /> */}
            <div id="main-area">
              <div id="sidebar-top-content" />
              <Switch>
                <Route exact path="/admin/employees" component={RoleAdminF} />
                <Route path="/admin/departments" exact component={PositionF} />
                <Route path="/admin/users" exact component={AdminUsersF} />
                <Route
                  path="/admin/projects"
                  exact
                  component={AdminProjectBidF}
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

export default DashboardAdmin;
