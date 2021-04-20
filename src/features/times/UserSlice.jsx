import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getURL } from "../../logic/config";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  let users=null;
  try {
    const url = `${getURL()}/times`;
    const response = await fetch(url, { Header: "Access-Control-Allow-Origin: *"});
    users = await response.json();

    users.map(val => {
        val.criadoEm = val.criadoEm.substring(0,10);
        val.ponto=0;
        return val;
    });
  } catch (err) {
    console.log("err",err);
  }
  return users;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    userAdded(state, action) {
      state.entities.push(action.payload);
      const body = JSON.stringify(action.payload);
      console.log("add", action.payload);
      const url = `${getURL()}/times`;
      axios.post(url, body,
      {
        headers: {
        'Content-Type': 'application/json'
        }
      } );
  },
    userUpdated(state, action) {
      const { id, nome, CriadoEm } = action.payload;
      const existingUser = state.entities.find((user) => user.id === id);
      if (existingUser) {
        existingUser.nome = nome;
        existingUser.CriadoEm = CriadoEm;
        const body = JSON.stringify(existingUser);
        console.log("body", body);
        const url = `${getURL()}/times/${id}`;
        axios.put(url, body,
        {
          headers: {
          'Content-Type': 'application/json'
          }
        } );
      }
    },
    userDeleted(state, action) {
      const { id } = action.payload;
      const existingUser = state.entities.find((user) => user.id === id);
      if (existingUser) {
        state.entities = state.entities.filter((user) => user.id !== id);
        const url = `${getURL()}/times/${id}`;
        axios.delete(url);
      }
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = [...action.payload];
    },
    [fetchUsers.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { userAdded, userUpdated, userDeleted } = userSlice.actions;

export default userSlice.reducer;