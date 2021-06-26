import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import jwt from "jsonwebtoken";
import Login from "./component/Login.jsx";
import DashboardAdmin from "./component/admin/DashboardAdmin.jsx";
import DashboardHR from "./component/hr/DashboardHR.jsx";
import DashboardEmployee from "./component/employee/DashboardEmployee.jsx";
import { Switch } from "react-router";

import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import history from "./history.js";

class App extends Component {
  state = {
    data: {},
    loading: false,
    pass: true,
    isLogin: false,
    firstTimeAlert: true,
  };
  componentDidMount() {
    this.setState({
      data: JSON.parse(localStorage.getItem("user")) || {},

      isLogin: localStorage.getItem("token") !== undefined,
    });
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/login"
            render={(props) =>
              this.state.data["Role"] === "Admin" ? (
                // <Dashboard />
                <Redirect to="/admin/employees" />
              ) : // <Login OnLogin={this.handleLogin}/>

              this.state.data["Role"] === "Hr" ? (
                // <Dashboard />
                <Redirect to="/hr" />
              ) : //
              this.state.data["Role"] === "regular-employee" ? (
                // <Dashboard />
                <Redirect to="/employee" />
              ) : (
                <Login
                  onSubmit={this.handleSubmit}
                  loading={this.state.loading}
                  pass={this.state.pass}
                />
              )
            }
          />
          <Route
            // exact
            path="/admin"
            render={(props) =>
              this.state.data["Role"] === "Admin" ? (
                <DashboardAdmin
                  data={this.state.data}
                  onLogout={this.handleLogout}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            // exact
            path="/hr"
            render={(props) =>
              this.state.data["Account"] == 2 ? (
                <DashboardHR
                  data={this.state.data}
                  onLogout={this.handleLogout}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            // exact
            path="/employee"
            render={(props) =>
              this.state.data["Role"] === "regular-employee"? (
                <DashboardEmployee
                  data={this.state.data}
                  onLogout={this.handleLogout}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Redirect to="/login" />
        </Switch>
      </Router>
    );
  }
  handleSubmit = (event) => {
    event.preventDefault();
    // console.log("id", event.target[0].value);
    this.setState({ pass: true });
    this.setState({ loading: true });
    this.login(event.target[0].value, event.target[1].value);
    event.target.reset();
  };
  handleLogout = (event) => {
    console.log("logout");
    localStorage.clear();
    this.componentDidMount();
  };
  login = (id, pass) => {
    let bodyLogin = {
      Username: id,
      Password: pass,
    };
    // let bodyLogin ="email="+id+"&password="+pass;
    // {Email: id, Password: pass}
    console.log(bodyLogin);

    axios
      .post("http://localhost:3002/login", bodyLogin)
      .then((res) => {
        this.setState({ data: res.data.result });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.result));
        this.setState({loading: false});
      })
      .catch((err) => {
        console.log(err);
        this.setState({ pass: false });
        this.setState({ loading: false });
      });
  };
}

export default App;
