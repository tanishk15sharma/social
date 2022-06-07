import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const getUserTokenFromLocalStorage = () => {
  const userDetails = localStorage.getItem("userToken") || null;
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
      if (err.response.status === 500) {
        alert("Please provide correct Login credentials");
      }
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
      if (err.response.status === 500) {
        alert("Please provide correct Signup credentials");
      }
      return Promise.reject(err);
    }
  }
);

const addFollower = createAsyncThunk("user/addFollowers", async (id) => {
  try {
    const token = getUserTokenFromLocalStorage();
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/users/follow/${id}`,
      {},
      {
        headers: {
          token,
        },
      }
    );

    return id;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
});

const removeFollower = createAsyncThunk(
  "user/removeFollowers",
  async (userId) => {
    try {
      const token = getUserTokenFromLocalStorage();

      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/users/unfollow/${userId}`,
        {},
        {
          headers: {
            token,
          },
        }
      );
      return userId;
    } catch (err) {
      console.log(err);
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
    status: false,
    user: {},
  },
  reducers: {},
  extraReducers: {
    [postLoginDetails.pending]: (state, action) => {
      state.status = true;
    },
    [postLoginDetails.fulfilled]: (state, { payload }) => {
      state.user = payload.data.user;
      localStorage.setItem("userToken", payload.data.token);
      state.status = false;
    },
    [postLoginDetails.rejected]: (state, { error }) => {
      state.status = false;
      console.log(error.message);
    },
    [postSignupDetails.pending]: (state, action) => {
      state.status = true;
    },
    [postSignupDetails.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      localStorage.setItem("userToken", payload.token);
      state.status = false;
    },
    [postSignupDetails.rejected]: (state, { error }) => {
      state.status = false;
      console.log(error.message);
    },

    [addFollower.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.user.following.push(payload);
    },
    [removeFollower.fulfilled]: (state, { payload }) => {
      state.user.following = state.user.following.filter(
        (id) => id !== payload
      );
    },
    [verifyUser.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
    },
  },
});

export {
  getUserTokenFromLocalStorage,
  postLoginDetails,
  postSignupDetails,
  addFollower,
  removeFollower,
  verifyUser,
};

export default authSlice.reducer;
