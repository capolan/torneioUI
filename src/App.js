import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";

import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import styled from "styled-components";

import { AddTime } from "./routes/times/AddTime";
import { EditTime } from "./routes/times/EditTime";
import { TimeList } from "./routes/times/TimeList";
import { AddJogo } from "./routes/jogos/AddJogo";
import { JogoList } from "./routes/jogos/JogoList";
import { AddPlayer } from "./routes/jogadores/AddPlay";
import { EditPlayer } from "./routes/jogadores/EditPlay";
import { PlayerList } from "./routes/jogadores/PlayList";
import { Navigation } from "./logic/menu";

export default function App() {
  const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: white;
  `;

  // Create a Wrapper component that'll render a <section> tag with some styles
  const Wrapper = styled.section`
    padding: 0.2em;
    background: gray;
  `;

  return (
    <>
      <Navigation />
      <Router>
        <Wrapper>
          <Title>Torneio Mundial</Title>
        </Wrapper>
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
