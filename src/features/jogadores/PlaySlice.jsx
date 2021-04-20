import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getURL } from "../../logic/config";

export const fetchPlayers = createAsyncThunk("users/fetchPlayers", async () => {
  let players=null;
  try {
    const url = `${getURL()}/jogadores`;
    const response = await fetch(url, { Header: "Access-Control-Allow-Origin: *"});
    players= await response.json();

    console.log("players",  players);
  
  } catch (err) {
    console.log("err",err);
  }
  return players;
});

const playSlice = createSlice({
  name: "players",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    playerAdded(state, action) {
      state.entities.push(action.payload);
      const body = JSON.stringify(action.payload);
      console.log("add", action.payload);
      const url = `${getURL()}/jogadores`;

      axios.post(url, body,
      {
        headers: {
        'Content-Type': 'application/json'
        }
      } ).then(res => {
        console.log("res", res);
      });
  },
    playerUpdated(state, action) {
      const { id, nome } = action.payload; 
      const existingUser = state.entities.find((user) => user.id === id);
      if (existingUser) {
        existingUser.nome = nome;
        const body = JSON.stringify(existingUser);
        console.log("body", body);
        const url = `${getURL()}/jogadores/${id}`;
        axios.put(url, body,
        {
          headers: {
          'Content-Type': 'application/json'
          }
        } );
      }
    },
    playerDeleted(state, action) {
      const { id } = action.payload;
      console.log("delete --",id);
      const existingUser = state.entities.find((user) => user.id === id);
      if (existingUser) {
        state.entities = state.entities.filter((user) => user.id !== id);
        const url = `${getURL()}/jogadores/${id}`;        
        axios.delete(url);
      }
    },
  },
  extraReducers: {
    [fetchPlayers.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchPlayers.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = [...action.payload];
    },
    [fetchPlayers.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { playerAdded, playerUpdated, playerDeleted } = playSlice.actions;

export default playSlice.reducer;