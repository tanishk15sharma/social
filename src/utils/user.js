import axios from "axios";

const getUser = async (id) => {
  try {
    const { data } = await axios.get(`/users/${id}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getUserFriends = async (userId) => {
  if (userId) {
    try {
      const { data, status } = await axios.get(`/users/myFriends/${userId}`);
      console.log(data);
      if (status === 200) {
        return data.friendList;
      }
    } catch (err) {
      console.log(err);
    }
  }
};

export { getUser, getUserFriends };
