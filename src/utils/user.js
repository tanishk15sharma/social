import axios from "axios";
import { getUserTokenFromLocalStorage } from "../features/authSlice";

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

export { getUser, getUpdateUser };
