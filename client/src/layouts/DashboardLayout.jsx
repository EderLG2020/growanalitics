import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useTheme } from "../components/ThemeProvider";
import { themeColors } from "../config/theme";
import Navbar from "../components/Navbar";
import { TableOutlined, AppstoreOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";

export default function DashboardLayout() {
  const { isDark } = useTheme();
  const colors = isDark ? themeColors.dark : themeColors.light;

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const username = storedUser?.usuario || "Invitado";

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`flex min-h-screen ${colors.background}`}>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:block w-64 p-6 transition-transform duration-300 ease-in-out z-40 ${colors.sidebar}`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${colors.text}`}>{username}</h2>
          {/* Botón cerrar en móvil */}
          <button
            className="md:hidden p-2"
            onClick={() => setSidebarOpen(false)}
          >
            <CloseOutlined className={colors.text} />
          </button>
        </div>

        <nav className="flex flex-col space-y-2">
          <Link
            to="/tabla1"
            className={`flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${colors.link}`}
            onClick={() => setSidebarOpen(false)}
          >
            <TableOutlined />
            <span>Tabla 1</span>
          </Link>

          <Link
            to="/tabla2"
            className={`flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${colors.link}`}
            onClick={() => setSidebarOpen(false)}
          >
            <AppstoreOutlined />
            <span>Tabla 2</span>
          </Link>
        </nav>
      </aside>

      {/* Overlay oscuro en móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <Navbar>
          {/* Botón hamburguesa solo en móvil */}
          <button
            className="md:hidden p-2"
            onClick={() => setSidebarOpen(true)}
          >
            <MenuOutlined className={colors.text} />
          </button>
        </Navbar>
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
