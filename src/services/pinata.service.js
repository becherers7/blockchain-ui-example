import axios from "axios";

import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/pinata";

export const saveFileToIpfs = async (file, username) => {
  let formData = new FormData();
  formData.append("ipfsFile", file);
  formData.append("username", username);
  return await axios.post(API_URL + "/file", formData, {
    headers: authHeader(),
  });
};

export const saveJSONToIpfs = async (obj) => {
  return await axios.post(API_URL + "/json", obj, {
    headers: authHeader(),
  });
};

export const getIpfsPins = async () => {
  return await axios.get(API_URL, {
    headers: authHeader(),
  });
};
