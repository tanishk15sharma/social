import axios from "axios";
import {
  addFollower,
  getUserTokenFromLocalStorage,
} from "../features/authSlice";

const getUser = async (id) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/users/profile/${id}`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

const followUser = async (id, dispatch) => {
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
    dispatch(addFollower(id));
  } catch (err) {
    console.log(err);
  }
};

const unFollowUser = async (id, dispatch) => {
  try {
    const token = getUserTokenFromLocalStorage();

    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/users/unfollow/${id}`,
      {},
      {
        headers: {
          token,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const getUpdateUser = async (data) => {
  const token = getUserTokenFromLocalStorage();

  try {
    const res = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/users/edit`,
      data,
      {
        headers: {
          token,
        },
      }
    );
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async () => {
  const token = getUserTokenFromLocalStorage();

  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/users/delete`,
      {
        headers: {
          token,
        },
      }
    );
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

export { getUser, followUser, unFollowUser, getUpdateUser, deleteUser };
