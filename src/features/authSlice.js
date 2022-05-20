import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const getUserTokenFromLocalStorage = () => {
  const userDetails = localStorage.getItem("userToken") || {
    token: null,
  };
  return userDetails;
};

const postLoginDetails = createAsyncThunk(
  "login/userDetails",
  async (loginData) => {
    try {
      const { data, status } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        loginData
      );

      if (status === 200) {
        return { data };
      }
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
);

const postSignupDetails = createAsyncThunk(
  "signup/userDetails",
  async (signupData) => {
    try {
      const { data, status } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
        signupData
      );
      console.log(data);
      if (status === 201) {
        return data;
      }
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
);

const verifyUser = createAsyncThunk("verify/user", async () => {
  const token = getUserTokenFromLocalStorage();
  try {
    const { data, status } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/auth/verify`,
      {
        headers: {
          token,
        },
      }
    );

    if (status === 200) {
      return data;
    }
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
});

const authSlice = createSlice({
  name: "authentication",
  initialState: {
    status: "",
    user: {},
  },
  reducers: {
    addFollower: (state, { payload }) => {
      console.log(payload);
      state.user.followers = [...state.user.followers, payload];
      console.log(state.user.followers);
    },
  },
  extraReducers: {
    [postLoginDetails.pending]: (state, action) => {
      state.status = "loading";
      console.log("login pending");
    },
    [postLoginDetails.fulfilled]: (state, { payload }) => {
      state.status = "login successful";
      state.user = payload.data.user;
      localStorage.setItem("userToken", payload.data.token);
      localStorage.setItem("user", JSON.stringify(payload.data.user));
    },
    [postLoginDetails.rejected]: (state, { error }) => {
      state.status = "Login failed , try again";
      console.log(error.message);
    },
    [postSignupDetails.pending]: (state, action) => {
      state.status = "loading";
      // console.log("signup pending");
    },
    [postSignupDetails.fulfilled]: (state, { payload }) => {
      // console.log(payload);
      state.status = "login successful";
      state.user = payload.user;
      localStorage.setItem("userToken", payload.token);
      localStorage.setItem("user", JSON.stringify(payload.user));
    },
    [postSignupDetails.rejected]: (state, { error }) => {
      state.status = "Login failed , try again";
      console.log(error.message);
    },
    [verifyUser.fulfilled]: (state, { payload }) => {
      console.log("verify successfull");
      state.user = payload.user;
    },
  },
});

export {
  getUserTokenFromLocalStorage,
  postLoginDetails,
  postSignupDetails,
  verifyUser,
};

export default authSlice.reducer;
export const { addFollower } = authSlice.actions;
