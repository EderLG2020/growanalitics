import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AuthLayout() {
  const user = useSelector((state) => state.auth.user);

  if (user) {
    return <Navigate to="/tabla1" replace />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
