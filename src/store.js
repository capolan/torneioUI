import { configureStore } from "@reduxjs/toolkit";
import usersReducers from "./routes/times/TimeSlice";
import jogosReducers from "./routes/jogos/JogoSlice";
import playersReducers from "./routes/jogadores/PlaySlice";

export default configureStore({
  reducer: {
    times: usersReducers,
    jogos: jogosReducers,
    players: playersReducers,
  },
});
