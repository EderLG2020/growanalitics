import { Outlet, Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../components/ThemeProvider";
import { themeColors } from "../config/theme";

export default function DashboardLayout() {
  const { isDark } = useTheme();
  const colors = isDark ? themeColors.dark : themeColors.light;

  return (
    <div className={`flex min-h-screen ${colors.background}`}>
      <aside className={`w-64 p-6 transition-colors duration-300 ${colors.sidebar}`}>
        <ThemeToggle />
        <h2 className={`text-xl font-bold mb-6 ${colors.text}`}>
          Mi Sistema
        </h2>
        <nav className="flex flex-col space-y-2">
          <Link to="/tabla1" className={colors.link}>Tabla 1</Link>
          <Link to="/tabla2" className={colors.link}>Tabla 2</Link>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
