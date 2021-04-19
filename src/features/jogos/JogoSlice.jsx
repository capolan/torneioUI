import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchJogos = createAsyncThunk("users/fetchJogos", async () => {
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
    entities: [],
    loading: false,
  },
  reducers: {
    jogoAdded(state, action) {
      state.entities.push(action.payload);
      const body = JSON.stringify(action.payload);
      console.log("add", action.payload);

      axios.post(`http://localhost:8010/proxy/api/jogos`, body,
      {
        headers: {
        'Content-Type': 'application/json'
        }
      } );
  },
    jogoUpdated(state, action) {
      const { id, nome, CriadoEm } = action.payload;
      const existingUser = state.entities.find((jogo) => jogo.id === id);
      if (existingUser) {
        existingUser.nome = nome;
        existingUser.CriadoEm = CriadoEm;
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
    userDeleted(state, action) {
      const { id } = action.payload;
      console.log("delete --",id);
      const existingUser = state.entities.find((jogo) => jogo.id === id);
      if (existingUser) {
        state.entities = state.entities.filter((jogo) => jogo.id !== id);
      }
    },
  },
  extraReducers: {
    [fetchJogos.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchJogos.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = [...action.payload];
    },
    [fetchJogos.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { jogoAdded, jogoUpdated, jogoDeleted } = jogoSlice.actions;

export default jogoSlice.reducer;