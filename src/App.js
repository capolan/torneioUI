import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";

import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { AddUser } from "./features/times/AddUser";
import { EditUser } from "./features/times/EditUser";
import { UserList } from "./features/times/UserList";
import { AddJogo } from "./features/jogos/AddJogo";
import { JogoList } from "./features/jogos/JogoList";
import { Navigation } from "./logic/menu";

export default function App() {
  return (
    <>
      <Navigation />
      <Router>
        <div>
          <Switch>
            <Route path="/add-user">
              <AddUser />
            </Route>
            <Route path="/edit-user">
              <EditUser />
            </Route>
            <Route path="/add-jogo">
              <AddJogo />
            </Route>
            <Route path="/jogo-list">
              <JogoList />
            </Route>
            <Route path="/">
              <UserList />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}
