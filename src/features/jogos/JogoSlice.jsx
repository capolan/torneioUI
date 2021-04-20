import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchJogos = createAsyncThunk("jogos/fetchJogos", async () => {
  let jogos=null;
  try {
    let url = "https://aws.sensoronline.net/api/jogo";
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      url = "http://localhost:8010/proxy/api/jogos";
    } 
    const response = await fetch(url, { Header: "Access-Control-Allow-Origin: *"});
    console.log("response", response);
    jogos = await response.json();

    console.log("jogos", jogos);
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
    jogoAdded(state, action) {
      state.entjogos.push(action.payload);
      const body = { id:0};
      console.log("add", action.payload);

      axios.post(`http://localhost:8010/proxy/api/jogos`, body,
      {
        headers: {
        'Content-Type': 'application/json'
        }
      } );
  },
    jogoUpdated(state, action) {
      const { id, time1Gol, time2Gol } = action.payload;
      const existingUser = state.entjogos.find((jogo) => jogo.id === id);
      if (existingUser) {
        existingUser.time1Gol = time1Gol;
        existingUser.time2Gol = time2Gol;
        const body = JSON.stringify(existingUser);
        console.log("body", body);
        axios.put(`http://localhost:8010/proxy/api/jogos/${id}`, body,
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
        console.log("body", body);
        axios.put(`http://localhost:8010/proxy/api/jogos/${id}`, body,
        {
          headers: {
          'Content-Type': 'application/json'
          }
        } );
      }
    },
    jogoDeleted(state, action) {
      const { id } = action.payload;
      console.log("delete --",id);
      const existingUser = state.entjogos.find((jogo) => jogo.id === id);
      if (existingUser) {
        state.entjogos = state.entjogos.filter((jogo) => jogo.id !== id);
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