import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  resetErrorAction,
  resetCreateAction,
} from "../globalSlice/globalSlice";
import BASE_URL from "../../../utils/baseURL";

//initialstate

const INITIAL_STATE = {
  loading: false,
  error: null,
  categories: [],
  category: null,
  success: false,
  userAuth: {
    error: null,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

//! get all categories Action
export const getAllCategoriesAction = createAsyncThunk(
  "categories/get-all-categories",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { userAuth } = getState().users;
      // Mengambil access token dari informasi userAuth
      const access_token = userAuth?.userInfo?.data?.access_token;
      // Melakukan permintaan GET ke endpoint ${BASE_URL}/users
      const config = {
        // Menambahkan header Authorization dengan nilai Bearer access_token
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };
      const { data } = await axios.get(`${BASE_URL}/categories`, config);

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! Add Category Action
export const addCategoryAction = createAsyncThunk(
  "category/create-category",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { userAuth } = getState().users;
      // Mengambil access token dari informasi userAuth
      const access_token = userAuth?.userInfo?.data?.access_token;
      // Melakukan permintaan GET ke endpoint ${BASE_URL}/users
      const config = {
        // Menambahkan header Authorization dengan nilai Bearer access_token
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/category/create`,
        payload,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! update category
export const updateCategoryAction = createAsyncThunk(
  "categories/update-category",
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
        `${BASE_URL}/category/update/${payload.id}`,
        payload.updatedData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! Categories slices
const categoriesSlice = createSlice({
  name: "categories",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    // fetch  all categories
    builder.addCase(getAllCategoriesAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle fullfilled state
    builder.addCase(getAllCategoriesAction.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    // * Handle the rejection
    builder.addCase(getAllCategoriesAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! create category
    builder.addCase(addCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle fullfilled state
    builder.addCase(addCategoryAction.fulfilled, (state, action) => {
      state.category = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    // * Handle the rejection
    builder.addCase(addCategoryAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    // ! update category
    builder.addCase(updateCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle fullfilled state
    builder.addCase(updateCategoryAction.fulfilled, (state, action) => {
      state.category = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    // * Handle the rejection
    builder.addCase(updateCategoryAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    // ! reset create action
    builder.addCase(resetCreateAction.fulfilled, (state) => {
      state.category = false;
    });
    // ! reset error action
    builder.addCase(resetErrorAction.fulfilled, (state) => {
      state.error = false;
    });
  },
});

// !generate reducer
const categoriesReducer = categoriesSlice.reducer;

export default categoriesReducer;
