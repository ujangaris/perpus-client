import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  resetErrorAction,
  resetSuccessAction,
} from "../globalSlice/globalSlice";

import BASE_URL from "./../../../utils/baseURL";
//initialstate

const INITIAL_STATE = {
  loading: false,
  error: null,
  users: [],
  user: null,
  success: false,
  profile: {},
  userAuth: {
    error: null,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

//! Login Action
export const loginAction = createAsyncThunk(
  "users/login",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.post(
        `${BASE_URL}/login`,
        // `http://localhost:5000/perpus-api/v1/login`,

        payload
      );
      //! save the user into localstorage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! Register Action
export const registerAction = createAsyncThunk(
  "users/register",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.post(`${BASE_URL}/register`, payload);

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! Get All Users Action
export const getAllUsersAction = createAsyncThunk(
  "users/get-all-users",
  async (_, { rejectWithValue, getState }) => {
    // Mendapatkan informasi userAuth dari state users
    try {
      const { userAuth } = getState().users;
      // Mengambil access token dari informasi userAuth
      const access_token = userAuth?.userInfo?.data?.access_token;
      // Melakukan permintaan GET ke endpoint http://localhost:5000/perpus-api/v1/users
      const config = {
        // Menambahkan header Authorization dengan nilai Bearer access_token
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "ngrok-skip-browser-warning": "any_value",
        },
      };
      const { data } = await axios.get(`${BASE_URL}/users`, config);
      // Mengembalikan data yang diperoleh dari permintaan sebagai hasil async thunk
      return data;
    } catch (error) {
      // Jika terjadi error, mengembalikan nilai error dari respons data
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! Get Single User Action
export const getSingleUserAction = createAsyncThunk(
  "users/get-single-ser",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    try {
      const { userAuth } = getState().users;
      const access_token = userAuth?.userInfo?.data?.access_token;
      const config = {
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "ngrok-skip-browser-warning": "any_value",
        },
      };
      const { data } = await axios.get(`${BASE_URL}/user/${userId}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! Logout action
export const logoutAction = createAsyncThunk("users/logout", async () => {
  // remove the token from localstorage
  localStorage.removeItem("userInfo");
  return true;
});

// ! Users slices
const usersSlice = createSlice({
  name: "users",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle fullfilled state
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    // * Handle the rejection
    builder.addCase(loginAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    // Register
    builder.addCase(registerAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle fullfilled state
    builder.addCase(registerAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    // * Handle the rejection
    builder.addCase(registerAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    // Get All Users
    builder.addCase(getAllUsersAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle fullfilled state
    builder.addCase(getAllUsersAction.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
    });
    // * Handle the rejection
    builder.addCase(getSingleUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! Get single User
    builder.addCase(getSingleUserAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle fullfilled state
    builder.addCase(getSingleUserAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    // * Handle the rejection
    builder.addCase(getAllUsersAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    // ! reset success action
    builder.addCase(resetSuccessAction.fulfilled, (state) => {
      state.success = false;
    });
    // ! reset error action
    builder.addCase(resetErrorAction.fulfilled, (state) => {
      state.error = false;
    });
  },
});

// !generate reducer
const usersReducer = usersSlice.reducer;

export default usersReducer;
