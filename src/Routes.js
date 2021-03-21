import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./containers/Login";
import Home from "./containers/Home";
import Register from "./containers/Register";
import ListUsers from "./containers/ListUsers";
import Dashboard from "./containers/Dashboard";
import UpdateUser from "./containers/UpdateUser";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      <Route exact path="/listusers">
        <ListUsers />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard />
      </Route>
      <Route exact path="/updateuser">
        <UpdateUser />
      </Route>
    </Switch>
  );
}