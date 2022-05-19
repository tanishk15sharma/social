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

// const getUserFollowing = async (userId) => {
//   if (userId) {
//     try {
//       const { data, status } = await axios.get(
//         `${process.env.REACT_APP_BACKEND_URL}/users/myFollowing/${userId}`
//       );

//       if (status === 200) {
//         return data.followingList;
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }
// };

// const getUserFollowers = async (userId) => {
//   if (userId) {
//     try {
//       const { data, status } = await axios.get(
//         `${process.env.REACT_APP_BACKEND_URL}/users/myFollowers/${userId}`
//       );

//       if (status === 200) {
//         return data.followersList;
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }
// };

const followUnfollowUser = async (id, followed) => {
  const token = getUserTokenFromLocalStorage();
  try {
    if (followed) {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/users/follow/${id}`,
        {},
        {
          headers: {
            token,
          },
        }
      );
    } else {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/users/unfollow/${id}`,
        {},
        {
          headers: {
            token,
          },
        }
      );
    }
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

export { getUser, followUnfollowUser, getUpdateUser, deleteUser };
