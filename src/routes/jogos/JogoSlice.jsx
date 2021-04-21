import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getURL } from "../../logic/config";

import axios from "axios";

export const fetchJogos = createAsyncThunk("jogos/fetchJogos", async () => {
  let jogos=null;
  try {
    const url = `${getURL()}/jogos`;
    const response = await fetch(url);
    jogos = await response.json();

  } catch (err) {
    console.log("err",err);
  }
  return jogos;
});

const jogoSlice = createSlice({
  name: "jogos",
  initialState: {
    entjogos: [],
    loading1: false,
  },
  reducers: {
    jogoUpdated(state, action) {
      const { id, time1Gol, time2Gol } = action.payload;
      const existingUser = state.entjogos.find((jogo) => jogo.id === id);
      if (existingUser) {
        existingUser.time1Gol = time1Gol;
        existingUser.time2Gol = time2Gol;
        const body = JSON.stringify(existingUser);
        let url = `${getURL()}/jogos/${id}`;
        axios.put(url, body,
        {
          headers: {
          'Content-Type': 'application/json'
          }
        } );
      }
    },
    jogoClean(state, action) {
      const { id } = action.payload;
      const existingUser = state.entjogos.find((jogo) => jogo.id === id);
      if (existingUser) {
        existingUser.time1Gol = null;
        existingUser.time2Gol = null;
        const body = JSON.stringify(existingUser);
        const url = `${getURL()}/jogos/${id}`;
        axios.put(url, body,
        {
          headers: {
          'Content-Type': 'application/json'
          }
        } );
      }
    },
  },
  extraReducers: {
    [fetchJogos.pending]: (state, action) => {
      state.loading1 = true;
    },
    [fetchJogos.fulfilled]: (state, action) => {
      state.loading1 = false;
      state.entjogos = [...action.payload];
    },
    [fetchJogos.rejected]: (state, action) => {
      state.loading1 = false;
    },
  },
});

export const { jogoAdded, jogoUpdated, jogoDeleted, jogoClean } = jogoSlice.actions;

export default jogoSlice.reducer;