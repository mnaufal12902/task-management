import axios from "axios";

const endPointTask = "http://localhost:4000/tugas";

export async function getTask() {
  try {
    const response = await axios.get(endPointTask);
    return response.data.data;
  } catch (error) {
    throw error;
  }
}

export async function getTaskSC(username) {
  try {
    const response = await axios.get(`http://localhost:4000/task_succes?username=${username}`);
    console.log(username)
    return response.data.data;
  } catch (error) {
    throw error;
  }
}

export async function getCountTaskSC(uid) {
  try {
    const response = await axios.get(
      `http://localhost:4000/count_task_succes?uid=${uid}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
}

export async function createTask(data) {
  try {
    const response = await axios.post(endPointTask, data);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function createTaskSC(username, uid) {
  try {
    const response = await axios.post("http://localhost:4000/task_users", {
      Username: username,
      UID: uid,
    });
    return response;
  } catch (error) {
    throw error;
  }
}
