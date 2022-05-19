import axios from "axios";

const getAllBookmarks = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/users/bookmarks`,
      {
        headers: {
          token,
        },
      }
    );
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
};
export { getAllBookmarks };
