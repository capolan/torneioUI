import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";

import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { AddUser } from "./features/times/AddUser";
import { EditUser } from "./features/times/EditUser";
import { UserList } from "./features/times/UserList";
import { AddJogo } from "./features/jogos/AddJogo";
import { JogoList } from "./features/jogos/JogoList";
import { AddPlayer } from "./features/jogadores/AddPlay";
import { EditPlayer } from "./features/jogadores/EditPlay";
import { PlayerList } from "./features/jogadores/PlayList";
import { Navigation } from "./logic/menu";

export default function App() {
  return (
    <>
      <Navigation />
      <h1 className="textCenter">Torneio</h1>
      <Router>
        <div>
          <Switch>
            <Route path="/add-user">
              <AddUser />
            </Route>
            <Route path="/edit-user">
              <EditUser />
            </Route>
            <Route path="/add-player">
              <AddPlayer />
            </Route>
            <Route path="/edit-player">
              <EditPlayer />
            </Route>
            <Route path="/player-list">
              <PlayerList />
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
