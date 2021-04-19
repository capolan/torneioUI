import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { AddUser } from "./features/times/AddUser";
import { EditUser } from "./features/times/EditUser";
import React from "react";
import { UserList } from "./features/times/UserList";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/add-user">
            <AddUser />
          </Route>
          <Route path="/edit-user">
            <EditUser />
          </Route>
          <Route path="/">
            <UserList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
