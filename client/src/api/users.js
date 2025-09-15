import API from "./axios";

export const fetchUsuarios = async (params) => {
  const { data } = await API.get("/usuarios", { params });
  return data; 
};
