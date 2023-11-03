import axios from "axios";

const endpointMatkul = "http://localhost:4000/mata_kuliah";
const endpointGroup = "http://localhost:4000/group";
const endPointMembers = "http://localhost:4000/grup_member";
const endPointGroupTask = "http://localhost:4000/grup_task";

export async function getMatkul() {
  try {
    const response = await axios.get(endpointMatkul);
    return response.data.data;
  } catch (error) {
    return error;
  }
}

export async function getGroup(id) {
  try {
    const response = await axios.get(`${endpointGroup}?id=${id}`);
    return response.data.data;
  } catch (error) {
    return error;
  }
}

export async function getMembers(grup) {
  try {
    const response = await axios.get(`${endPointMembers}?grup=${grup}`);
    return response.data.data;
  } catch (error) {
    return error;
  }
}

export async function getGroupTask() {
  try {
    const response = await axios.get(endPointGroupTask);
    return response.data.data;
  } catch (error) {
    return error;
  }
}

export async function createGroupTask(data) {
  try {
    const response = await axios.post(endPointGroupTask, data)
    return response;
  } catch (error) {
    return error;
  }
}

export async function createMembers(data) {
  try {
    const response = await axios.post(endPointMembers, data);
    return response;
  } catch (error) {
    return error;
  }
}

export async function deleteMembers(id) {
  try {
    const response = await axios.delete(`${endPointMembers}?id=${id}`);
    return response;
  } catch (error) {
    return error;
  }
}

export async function createGroup(data) {
  try {
    const response = await axios.post(endpointGroup, data);
    return response;
  } catch (error) {
    return error;
  }
}

export async function createMatkul(data) {
  try {
    const response = await axios.post(endpointMatkul, data);
    return response;
  } catch (error) {
    return error;
  }
}
