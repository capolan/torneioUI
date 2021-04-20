import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  let users=null;
  try {
    let url = "https://aws.sensoronline.net/api/times";
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      url = "http://localhost:8010/proxy/api/times";
    } 
    const response = await fetch(url, { Header: "Access-Control-Allow-Origin: *"});
    console.log("response", response);
    users = await response.json();

    users.map(val => {
        val.criadoEm = val.criadoEm.substring(0,10);
        return val;
    });
  } catch (err) {
    console.log("err",err);
  }
  return users;
});

const userSlice = createSlice({
  name: "times",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    userAdded(state, action) {
      state.entities.push(action.payload);
      const body = JSON.stringify(action.payload);
      console.log("add", action.payload);

      axios.post(`http://localhost:8010/proxy/api/times`, body,
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
        axios.put(`http://localhost:8010/proxy/api/times/${id}`, body,
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
      const existingUser = state.entities.find((user) => user.id === id);
      if (existingUser) {
        state.entities = state.entities.filter((user) => user.id !== id);
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