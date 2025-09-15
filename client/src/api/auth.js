import API from "./axios";

export const loginService = async (credentials) => {
  const { data } = await API.post("/usuarios/login", credentials, {
    withCredentials: true,
  });
  return data;
};
export const logoutService = async (credentials) => {
  const { data } = await API.post("/usuarios/logout", credentials);
  return data;
};

export const registerService = async (userData) => {
  const { data } = await API.post("/usuarios", userData);
  return data;
};

export const getCurrentUserService = async () => {
  const { data } = await API.get("/usuarios/me", { withCredentials: true });
  return data;
};
