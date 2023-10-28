import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  resetCreateAction,
  resetErrorAction,
  resetSuccessAction,
} from "../globalSlice/globalSlice";

//initialstate

const INITIAL_STATE = {
  loading: false,
  error: null,
  authors: [],
  author: null,
  success: false,
  userAuth: {
    error: null,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

//! get all authors Action
export const getAllAuthorsAction = createAsyncThunk(
  "authors/get-all-authors",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { userAuth } = getState().users;
      // Mengambil access token dari informasi userAuth
      const access_token = userAuth?.userInfo?.data?.access_token;
      // Melakukan permintaan GET ke endpoint http://localhost:5000/perpus-api/v1/users
      const config = {
        // Menambahkan header Authorization dengan nilai Bearer access_token
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/perpus-api/v1/authors`,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! create author Action
export const addAuthorAction = createAsyncThunk(
  "authors/create-author",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { userAuth } = getState().users;
      // Mengambil access token dari informasi userAuth
      const access_token = userAuth?.userInfo?.data?.access_token;
      // Melakukan permintaan GET ke endpoint http://localhost:5000/perpus-api/v1/users
      const config = {
        // Menambahkan header Authorization dengan nilai Bearer access_token
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };
      const { data } = await axios.post(
        `http://localhost:5000/perpus-api/v1/author/create`,
        payload,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//! update author Action
export const updaateAuthorAction = createAsyncThunk(
  "authors/update-author",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { userAuth } = getState().users;
      // Mengambil access token dari informasi userAuth
      const access_token = userAuth?.userInfo?.data?.access_token;
      // Melakukan permintaan GET ke endpoint http://localhost:5000/perpus-api/v1/users
      const config = {
        // Menambahkan header Authorization dengan nilai Bearer access_token
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };
      const { data } = await axios.patch(
        `http://localhost:5000/perpus-api/v1/author/update/${payload.id}`,
        payload.updatedData,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! Authors slices
const authorsSlice = createSlice({
  name: "authors",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    // fetch  all authors
    builder.addCase(getAllAuthorsAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle fullfilled state
    builder.addCase(getAllAuthorsAction.fulfilled, (state, action) => {
      state.authors = action.payload;
      state.loading = false;
      state.error = null;
    });
    // * Handle the rejection
    builder.addCase(getAllAuthorsAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //! create author
    builder.addCase(addAuthorAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle fullfilled state
    builder.addCase(addAuthorAction.fulfilled, (state, action) => {
      state.author = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    // * Handle the rejection
    builder.addCase(addAuthorAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //! update author
    builder.addCase(updaateAuthorAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle fullfilled state
    builder.addCase(updaateAuthorAction.fulfilled, (state, action) => {
      state.author = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    // * Handle the rejection
    builder.addCase(updaateAuthorAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    // ! reset create action
    builder.addCase(resetCreateAction.fulfilled, (state) => {
      state.author = false;
    });
    // ! reset error action
    builder.addCase(resetErrorAction.fulfilled, (state) => {
      state.error = false;
    });
  },
});

// !generate reducer
const authorsReducer = authorsSlice.reducer;

export default authorsReducer;
