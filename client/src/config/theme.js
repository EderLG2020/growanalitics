export const themeColors = {
  light: {
    background: "bg-gradient-to-r from-blue-100 via-white to-blue-50",
    text: "text-black",
    link: "text-gray-700 hover:text-black",
    sidebar: "bg-gray-100",
    bgModal:"bg-[#1f1800]",
    table: {
      headerBg: "#2563eb", 
      headerText: "#ffffff",
      rowAlt: "rgba(59,130,246,0.1)",
      hover: "rgba(59,130,246,0.3)",
    },
    modal: {
      headerBg: "#2563eb",
      headerText: "#fff",
      bodyBg: "#f0f6ff",
    },
  },
  dark: {
    background: "bg-gradient-to-r from-[#0f3460] via-[#16213e] to-[#16013e]",
    text: "text-white",
    link: "text-gray-300 hover:text-white",
    sidebar: "bg-[#121833]",
    bgModal:"bg-[#121800]",
    table: {
      headerBg: "#485d87", 
      headerText: "#f1f5f9",
      rowAlt: "rgba(148,163,184,0.2)",
      hover: "rgba(59,130,246,0.5)",
    },
    modal: {
      headerBg: "transparent",
      headerText: "#fff",
      bodyBg: "rgba(15, 20, 40, 0.8)", // degradado oscuro translúcido
    },
  },
};
