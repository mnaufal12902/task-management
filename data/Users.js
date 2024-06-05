import axios from "axios";

const endPointUser = "http://localhost:4000/users";
const endPointPass = "http://localhost:4000/auth"

export async function getUsers() {
  try {
    const response = await axios.get(endPointUser);
    return response.data.data;
  } catch (error) {
    return error;
  }
}

export async function updateUsers(username,data) {
  try {
    const response = await axios.patch(`${endPointUser}?username=${username}`, data);
    return response;
  } catch (error) {
    return error;
  }
}

export async function updatePassword(username, data) {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.patch(`${endPointPass}?username=${username}`, data, {
      headers: {
        Authorization: token
      }
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
