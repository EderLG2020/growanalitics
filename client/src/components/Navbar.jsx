import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";
import { themeColors } from "../config/theme";

export default function Navbar() {
  const { isDark } = useTheme();
  const colors = isDark ? themeColors.dark : themeColors.light;

  return (
    <header
      className={`flex items-center justify-between px-6 py-4 shadow-md transition-colors duration-300 ${colors.sidebar}`}
    >
      <h1 className={`text-lg font-bold ${colors.text}`}>GROW ANALYTICS</h1>

      <nav className="flex items-center ">
  
      </nav>

      <ThemeToggle />
    </header>
  );
}
