import { configureStore } from "@reduxjs/toolkit";
import usersReducers from "./features/times/TimeSlice";
import jogosReducers from "./features/jogos/JogoSlice";
import playersReducers from "./features/jogadores/PlaySlice";

export default configureStore({
  reducer: {
    times: usersReducers,
    jogos: jogosReducers,
    players: playersReducers,
  },
});
