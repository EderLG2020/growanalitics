import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { createUsuario } from "../api/users";

export function useSignUp() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const payload = {
        usuario: values.usuario,
        correo: values.correo,
        nombre: values.nombre,
        apell_paterno: values.apell_paterno,
        apell_materno: values.apell_materno,
        contrasena: values.contrasena,
        tipo_usuario: values.tipo_usuario,
      };

      await createUsuario(payload);
      message.success("Usuario creado correctamente");
      navigate("/");
    } catch (error) {
      console.error("Error creando usuario:", error);
      message.error("No se pudo crear el usuario");
    }
  };

  return { onFinish };
}
