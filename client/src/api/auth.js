import API from "./axios";

export const loginService = async (credentials) => {
  const { data } = await API.post("/usuarios/login", credentials);
  return data;
};

export const registerService = async (userData) => {
  const { data } = await API.post("/usuarios", userData);
  return data;
};
