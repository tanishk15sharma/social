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
    status: "",
    user: {},
  },
  reducers: {
    // verifyUser: (state) => {
    //   state.user = JSON.parse(localStorage.getItem("user"));
    // },
  },
  extraReducers: {
    [postLoginDetails.pending]: (state, action) => {
      state.status = "loading";
    },
    [postLoginDetails.fulfilled]: (state, { payload }) => {
      state.status = "login successful";
      state.user = payload.data.user;
      localStorage.setItem("userToken", payload.data.token);
      // localStorage.setItem("user", JSON.stringify(payload.data.user));
    },
    [postLoginDetails.rejected]: (state, { error }) => {
      state.status = "Login failed , try again";
      console.log(error.message);
    },
    [postSignupDetails.pending]: (state, action) => {
      state.status = "loading";
    },
    [postSignupDetails.fulfilled]: (state, { payload }) => {
      state.status = "login successful";
      state.user = payload.user;
      localStorage.setItem("userToken", payload.token);
      // localStorage.setItem("user", JSON.stringify(payload.user));
    },
    [postSignupDetails.rejected]: (state, { error }) => {
      state.status = "Login failed , try again";
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
      console.log("verify successfull");
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
// export const { verifyUser } = authSlice.actions;

export default authSlice.reducer;
