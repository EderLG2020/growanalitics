import API from "./axios";

export const fetchUsuarios = async (params) => {
  const { data } = await API.get("/usuarios", { params });
  return data; 
};

export const deleteUsuarios = async (id) => {
  const { data } = await API.delete(`/usuarios/${id}`);
  return data; 
};

export const editUsuarios = async (id, payload) => {
  const { data } = await API.put(`/usuarios/${id}`, payload);
  return data; 
};

export const createUsuario = async (payload) => {
  const { data } = await axios.post("/usuarios", payload);
  return data;
};