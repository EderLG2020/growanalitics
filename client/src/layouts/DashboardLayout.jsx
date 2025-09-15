import { Outlet, Link } from "react-router-dom";
import { useTheme } from "../components/ThemeProvider";
import { themeColors } from "../config/theme";
import Navbar from "../components/Navbar";

import { TableOutlined, AppstoreOutlined } from "@ant-design/icons";

export default function DashboardLayout() {
  const { isDark } = useTheme();
  const colors = isDark ? themeColors.dark : themeColors.light;

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const username = storedUser?.usuario || "Invitado";

  return (
    <div className={`flex min-h-screen ${colors.background}`}>
      <aside
        className={`w-64 p-6 transition-colors duration-300 ${colors.sidebar}`}
      >
        <h2 className={`text-xl font-bold mb-6 ${colors.text}`}>
          {username}
        </h2>

        <nav className="flex flex-col space-y-2">
          <Link
            to="/tabla1"
            className={`flex items-center gap-2 ${colors.link}`}
          >
            <TableOutlined />
            <span>Tabla 1</span>
          </Link>

          <Link
            to="/tabla2"
            className={`flex items-center gap-2 ${colors.link}`}
          >
            <AppstoreOutlined />
            <span>Tabla 2</span>
          </Link>
        </nav>
      </aside>

      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
