import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUserService } from "../api/auth";
import { loginSuccess, logout } from "../store/authSlice";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { user } = await getCurrentUserService();
        dispatch(loginSuccess(user));
      } catch (err) {
        console.warn("Sesión expirada o no autenticado");
        dispatch(logout());
      }
    };

    checkUser();
  }, [dispatch]);

  return children;
}
