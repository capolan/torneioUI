import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";

import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { AddTime } from "./features/times/AddTime";
import { EditTime } from "./features/times/EditTime";
import { TimeList } from "./features/times/TimeList";
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
      <Router>
        <div>
          <Switch>
            <Route path="/add-user">
              <AddTime />
            </Route>
            <Route path="/edit-user">
              <EditTime />
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
              <TimeList />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}
