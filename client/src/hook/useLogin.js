import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginService } from "../api/auth";
import { loginSuccess } from "../store/authSlice";

export function useLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (values) => {
    try {
      const payload = {
        usuario: values.username,
        contrasena: values.password,
      };

      const data = await loginService(payload);

      console.log("Login exitoso:", data);

      const { nombre, tipo_usuario, correo, usuario } = data.user;

      localStorage.setItem(
        "user",
        JSON.stringify({ nombre, tipo_usuario, correo, usuario })
      );

      dispatch(loginSuccess(data.user));

      navigate("/tabla1");
      console.log("Se navegó a tabla1?");
    } catch (error) {
      console.error("Error en login:", error);
      throw error; 
    }
  };

  return { login };
}
