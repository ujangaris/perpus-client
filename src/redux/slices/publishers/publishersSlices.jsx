import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  resetCreateAction,
  resetErrorAction,
  resetSuccessAction,
} from "../globalSlice/globalSlice";
import BASE_URL from "../../../utils/baseURL";

//initialstate

const INITIAL_STATE = {
  loading: false,
  error: null,
  publishers: [],
  publisher: null,
  success: false,
  userAuth: {
    error: null,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

//! get all publisher Action
export const getAllPublishersAction = createAsyncThunk(
  "publishers/get-all-publishers",
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
          "Authorization": `Bearer ${access_token}`,
          "ngrok-skip-browser-warning": "any_value",
        },
      };
      const { data } = await axios.get(`${BASE_URL}/publishers`, config);

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! Add Publisher Action
export const addPublisherAction = createAsyncThunk(
  "publisher/create-publisher",
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
          "Authorization": `Bearer ${access_token}`,
          "ngrok-skip-browser-warning": "any_value",
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/publisher/create`,
        payload,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! update publisher
export const updatePublisherAction = createAsyncThunk(
  "publisher/update-publisher",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { userAuth } = getState().users;
      const access_token = userAuth?.userInfo?.data?.access_token;
      const config = {
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "ngrok-skip-browser-warning": "any_value",
        },
      };
      const { data } = await axios.patch(
        `${BASE_URL}/publisher/update/${payload.id}`,
        payload.updatedData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! Publisher slices
const publishersSlice = createSlice({
  name: "publishers",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    // fetch  all publishers
    builder.addCase(getAllPublishersAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle fullfilled state
    builder.addCase(getAllPublishersAction.fulfilled, (state, action) => {
      state.publishers = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    // * Handle the rejection
    builder.addCase(getAllPublishersAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! create publisher
    builder.addCase(addPublisherAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle fullfilled state
    builder.addCase(addPublisherAction.fulfilled, (state, action) => {
      state.publisher = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    // * Handle the rejection
    builder.addCase(addPublisherAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //! update publisher
    builder.addCase(updatePublisherAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle fullfilled state
    builder.addCase(updatePublisherAction.fulfilled, (state, action) => {
      state.publisher = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    // * Handle the rejection
    builder.addCase(updatePublisherAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    // ! reset create action
    builder.addCase(resetCreateAction.fulfilled, (state) => {
      state.publisher = false;
    });
    // ! reset error action
    builder.addCase(resetErrorAction.fulfilled, (state) => {
      state.error = false;
    });
  },
});

// !generate reducer
const publishersReducer = publishersSlice.reducer;

export default publishersReducer;
