import axios from "axios";
import { getUserTokenFromLocalStorage } from "../features/authSlice";
const getAllPosts = async () => {
  const token = getUserTokenFromLocalStorage();

  try {
    const { data, status } = await axios.get("posts/allposts", {
      headers: {
        token,
      },
    });
    console.log(data, status);
    return data.allPost;
  } catch (err) {
    console.log(err);
  }
};
export { getAllPosts };
