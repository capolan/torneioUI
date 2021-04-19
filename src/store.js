import { configureStore } from "@reduxjs/toolkit";
import usersReducers from "./features/times/UserSlice";
import jogosReducers from "./features/jogos/JogoSlice";

export default configureStore({
  reducer: {
    users: usersReducers,
    jogos: jogosReducers,
  },
});
