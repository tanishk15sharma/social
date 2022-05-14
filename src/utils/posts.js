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

const likeDislikePost = async (postId) => {
  const token = getUserTokenFromLocalStorage();
  try {
    await axios.put(
      `posts/like/${postId}`,
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

const uploadImage = async (imageFile) => {
  try {
    const uploadData = new FormData();
    uploadData.append("file", imageFile);
    uploadData.append("upload_preset", "social-imgCloud");
    uploadData.append("cloud_name", "tanishkcloudimg");
    const { data, status } = await axios.post(
      "https://api.cloudinary.com/v1_1/tanishkcloudimg/image/upload",
      uploadData
    );
    console.log(status);
    return data.secure_url;
  } catch (err) {
    console.log(err);
  }
};

export { getAllPosts, getUserAllPosts, likeDislikePost, uploadImage };
