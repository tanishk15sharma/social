import axios from "axios";

const getUser = async (id) => {
  try {
    const { data } = await axios.get(`users/${id}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export { getUser };
