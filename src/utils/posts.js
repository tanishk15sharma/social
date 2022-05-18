import axios from "axios";
import { getUserTokenFromLocalStorage } from "../features/authSlice";
const getAllPosts = async () => {
  const token = getUserTokenFromLocalStorage();
  try {
    const { data, status } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/posts/allposts`,
      {
        headers: {
          token,
        },
      }
    );

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
    const { data, status } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/posts/userPosts/${userId}`,
      {
        headers: {
          token,
        },
      }
    );
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
      `${process.env.REACT_APP_BACKEND_URL}/posts/like/${postId}`,
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
  if (!imageFile) {
    return;
  }
  try {
    const uploadData = new FormData();
    uploadData.append("file", imageFile);
    uploadData.append("upload_preset", "social-imgCloud");
    uploadData.append("cloud_name", "tanishkcloudimg");
    const { data, status } = await axios.post(
      "https://api.cloudinary.com/v1_1/tanishkcloudimg/image/upload",
      uploadData
    );
    if (status === 200) {
      return data.secure_url;
    }
  } catch (err) {
    console.log(err);
  }
};

const createNewPost = async (desc, imgUrl) => {
  try {
    const token = getUserTokenFromLocalStorage();
    const { data, status } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/posts/`,
      {
        desc,
        image: imgUrl,
      },
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
  }
};

const addComment = async (data, postId) => {
  console.log(data, postId);
  try {
    const token = getUserTokenFromLocalStorage();
    const res = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/posts/comments/${postId}`,
      data,
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

const editPost = async (postId, desc) => {
  try {
    const token = getUserTokenFromLocalStorage();
    const res = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/posts/${postId}`,
      { desc },
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

const deletePost = async (postId) => {
  try {
    const token = getUserTokenFromLocalStorage();

    const res = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/posts/${postId}`,
      {
        headers: {
          token,
        },
      }
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

export {
  getAllPosts,
  getUserAllPosts,
  likeDislikePost,
  uploadImage,
  createNewPost,
  addComment,
  editPost,
  deletePost,
};
