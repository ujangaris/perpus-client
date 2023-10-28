import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  resetErrorAction,
  resetCreateAction,
} from "../globalSlice/globalSlice";

//initialstate

const INITIAL_STATE = {
  loading: false,
  error: null,
  bookshelves: [],
  bookshelf: null,
  success: false,
};

//! get all bookshelves Action
export const getAllBookShelvesAction = createAsyncThunk(
  "bookshelves/get-all-bookshelves",
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
        `http://localhost:5000/perpus-api/v1/bookshelves`,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! Add Bookshelf Action
export const addBookshelfAction = createAsyncThunk(
  "bookshelf/create-bookshelf",
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
        `http://localhost:5000/perpus-api/v1/bookshelf/create`,
        payload,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! update bookshelf
export const updateBookshelfAction = createAsyncThunk(
  "bookshelf/update-bookshelf",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { userAuth } = getState().users;
      const access_token = userAuth?.userInfo?.data?.access_token;
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };
      const { data } = await axios.patch(
        `http://localhost:5000/perpus-api/v1/bookshelf/update/${payload.id}`,
        payload.updatedData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! Bookshelves slices
const bookshelvesSlice = createSlice({
  name: "bookshelves",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    // fetch  all bookshelves
    builder.addCase(getAllBookShelvesAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle fullfilled state
    builder.addCase(getAllBookShelvesAction.fulfilled, (state, action) => {
      state.bookshelves = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    // * Handle the rejection
    builder.addCase(getAllBookShelvesAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! add bookshelf
    builder.addCase(addBookshelfAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle fullfilled state
    builder.addCase(addBookshelfAction.fulfilled, (state, action) => {
      state.bookshelf = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    // * Handle the rejection
    builder.addCase(addBookshelfAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    // ! update bookshelf
    builder.addCase(updateBookshelfAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle fullfilled state
    builder.addCase(updateBookshelfAction.fulfilled, (state, action) => {
      state.bookshelf = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    // * Handle the rejection
    builder.addCase(updateBookshelfAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    // ! reset create action
    builder.addCase(resetCreateAction.fulfilled, (state) => {
      state.bookshelf = false;
    });
    // ! reset error action
    builder.addCase(resetErrorAction.fulfilled, (state) => {
      state.error = false;
    });
  },
});

// !generate reducer
const bookshelvesReducer = bookshelvesSlice.reducer;

export default bookshelvesReducer;
