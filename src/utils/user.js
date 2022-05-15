import axios from "axios";

const getUser = async (id) => {
  try {
    const { data } = await axios.get(`/users/${id}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getUserFollowing = async (userId) => {
  if (userId) {
    try {
      const { data, status } = await axios.get(`/users/myFollowing/${userId}`);
      console.log(data);
      if (status === 200) {
        return data.followingList;
      }
    } catch (err) {
      console.log(err);
    }
  }
};

const getUserFollowers = async (userId) => {
  if (userId) {
    try {
      const { data, status } = await axios.get(`/users/myFollowers/${userId}`);

      if (status === 200) {
        return data.followersList;
      }
    } catch (err) {
      console.log(err);
    }
  }
};

export { getUser, getUserFollowing, getUserFollowers };
