import axios from "axios";
import { getUserTokenFromLocalStorage } from "../features/authSlice";
const getAllPosts = async () => {
  const token = getUserTokenFromLocalStorage();
  try {
    const { data, status } = await axios.get("/posts/allposts", {
      headers: {
        token,
      },
    });

    if (status === 200) {
      return data.allPost;
    }
  } catch (err) {
    console.log(err);
  }
};

const getUserAllPosts = async (userId) => {
  const token = getUserTokenFromLocalStorage();
  try {
    const { data, status } = await axios.get(`/posts/userPosts/${userId}`, {
      headers: {
        token,
      },
    });
    if (status === 200) {
      return data.userPosts;
    }
  } catch (err) {
    console.log(err);
  }
};

export { getAllPosts, getUserAllPosts };
