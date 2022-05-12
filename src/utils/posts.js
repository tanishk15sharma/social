import axios from "axios";

const getAllPosts = async (token) => {
  try {
    const { data } = await axios.get("posts/allposts", {
      headers: {
        token,
      },
    });

    return data.allPost;
  } catch (err) {
    console.log(err);
  }
};
export { getAllPosts };
