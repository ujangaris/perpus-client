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
  books: [],
  book: null,
  success: false,
};

//! get all books Action
export const getAllBooksAction = createAsyncThunk(
  "books/get-all-books",
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
        `http://localhost:5000/perpus-api/v1/private_books`,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! add books Action
export const addBooksAction = createAsyncThunk(
  "book/add-book",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    console.log(payload);
    try {
      //convert the payload to formData
      const formData = new FormData();

      formData.append("title", payload?.title);
      formData.append("description", payload?.description);
      formData.append("stock", payload?.stock);
      formData.append("picture", payload?.picture);
      formData.append("id_category", payload?.category);
      formData.append("id_author", payload?.author);
      formData.append("id_publisher", payload?.publisher);
      formData.append("id_bookshelf", payload?.bookshelf);
      const { userAuth } = getState().users;
      // Mengambil access token dari informasi userAuth
      const access_token = userAuth?.userInfo?.data?.access_token;
      // Melakukan permintaan GET ke endpoint http://localhost:5000/perpus-api/v1/users
      const config = {
        // Menambahkan header Authorization dengan nilai Bearer access_token
        headers: {
          Authorization: `Bearer ${access_token}`, // Set the content type to handle file uploads
        },
      };
      const { data } = await axios.post(
        `http://localhost:5000/perpus-api/v1/book/create`,
        formData,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//! update boupdaateoks Action
export const updateBooksAction = createAsyncThunk(
  "book/update-book",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //convert the payload to formData
      const formData = new FormData();

      formData.append("title", payload?.title);
      formData.append("description", payload?.description);
      formData.append("stock", payload?.stock);
      formData.append("picture", payload?.picture);
      formData.append("id_category", payload?.category);
      formData.append("id_author", payload?.author);
      formData.append("id_publisher", payload?.publisher);
      formData.append("id_bookshelf", payload?.bookshelf);
      const { userAuth } = getState().users;
      const access_token = userAuth?.userInfo?.data?.access_token;
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };
      const { data } = await axios.patch(
        `http://localhost:5000/perpus-api/v1/book/update/${payload.id}`,
        formData, // Menggunakan payload sebagai data permintaan
        config
      );

      return data;
    } catch (error) {
      console.error("Bad Request Error:", error?.response?.data);
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! Books slices
const booksSlice = createSlice({
  name: "books",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    // fetch  all books
    builder.addCase(getAllBooksAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle fullfilled state
    builder.addCase(getAllBooksAction.fulfilled, (state, action) => {
      state.books = action.payload;
      state.loading = false;
      state.error = null;
    });
    // * Handle the rejection
    builder.addCase(getAllBooksAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //! add book
    builder.addCase(addBooksAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle fullfilled state
    builder.addCase(addBooksAction.fulfilled, (state, action) => {
      state.book = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    // * Handle the rejection
    builder.addCase(addBooksAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //! update book
    builder.addCase(updateBooksAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle fullfilled state
    builder.addCase(updateBooksAction.fulfilled, (state, action) => {
      state.book = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    // * Handle the rejection
    builder.addCase(updateBooksAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    // ! reset create action
    builder.addCase(resetCreateAction.fulfilled, (state) => {
      state.book = false;
    });
  },
});

// !generate reducer
const booksReducer = booksSlice.reducer;

export default booksReducer;
