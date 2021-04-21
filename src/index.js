import App from "./App";
import { Provider } from "react-redux";
import { bindActionCreators } from "redux";
import React from "react";
import ReactDOM from "react-dom";
import { fetchTimes } from "./routes/times/TimeSlice";
import { fetchJogos } from "./routes/jogos/JogoSlice";
import { fetchPlayers } from "./routes/jogadores/PlaySlice";
import store from "./store";

//store.dispatch(fetchTimes());
//store.dispatch(fetchJogos());

const dispatchChaining = () => async (dispatch) => {
  await Promise.all([store.dispatch(fetchTimes())]);
  await Promise.all([store.dispatch(fetchPlayers())]);
  return store.dispatch(fetchJogos());
};

const actions = bindActionCreators({ dispatchChaining }, store.dispatch);
actions.dispatchChaining().then(() => console.log("fim da darga")); // <-- thenable

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
