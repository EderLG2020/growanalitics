import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AuthLayout() {
  const user = useSelector((state) => state.auth.user);

  if (user) {
    return <Navigate to="/tabla1" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Outlet />
    </div>
  );
}
