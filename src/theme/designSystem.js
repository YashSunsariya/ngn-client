const DS = {
  colors: {
    primary: "#157347",
    primaryHover: "#0F5E36",
    primaryLight: "#DFF5E6",
    primaryTint: "rgba(21,115,71,0.08)",
    bg: "#F8FAFC",
    white: "#FFFFFF",
    heading: "#111827",
    body: "#4B5563",
    sub: "#6B7280",
    muted: "#9CA3AF",
    border: "#E5E7EB",
    borderLight: "#F3F4F6",
    inputBorder: "#D1D5DB",
    danger: "#DC2626",
    dangerLight: "#FEF2F2",
    dangerBorder: "#FEE2E2",
    success: "#16A34A",
    successLight: "#D1FAE5",
    amber: "#FFC857",
    amberLight: "rgba(255,200,87,0.2)",
    amberDark: "#8A6A16",
    sky: "#3FA9F5",
    overlay: "rgba(17,24,39,0.75)",
  },

  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Poppins', sans-serif",
  },

  radii: {
    sm: "6px",
    md: "10px",
    lg: "12px",
    xl: "16px",
    xxl: "18px",
    pill: "999px",
  },

  shadows: {
    none: "none",
    xs: "0 1px 3px rgba(0,0,0,0.04)",
    sm: "0 2px 8px rgba(0,0,0,0.06)",
    md: "0 4px 16px rgba(0,0,0,0.08)",
    lg: "0 8px 30px rgba(0,0,0,0.10)",
    primary: "0 4px 14px rgba(21,115,71,0.25)",
    primaryHover: "0 6px 20px rgba(21,115,71,0.35)",
  },

  banner: {
    backgroundImage: `linear-gradient(to right, rgba(232,245,233,0.92), rgba(248,250,252,0.7)), url("/banner1.png")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },

  typography: {
    h1: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 700,
      fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
      lineHeight: 1.15,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 700,
      fontSize: { xs: "1.5rem", md: "2rem" },
      lineHeight: 1.2,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 700,
      fontSize: { xs: "1.25rem", md: "1.5rem" },
      lineHeight: 1.3,
    },
    h4: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 700,
      fontSize: { xs: "1.3rem", md: "1.5rem" },
      lineHeight: 1.3,
    },
    h5: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 700,
      fontSize: { xs: "1.1rem", md: "1.25rem" },
      lineHeight: 1.35,
    },
    h6: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: 1.4,
    },
    body: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: "0.9rem",
      lineHeight: 1.6,
      color: "#4B5563",
    },
    caption: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: "0.78rem",
      lineHeight: 1.5,
      color: "#6B7280",
    },
    label: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: "0.8rem",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.06em",
    },
    price: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 700,
    },
  },

  button: {
    primary: {
      bgcolor: "#157347",
      color: "#FFFFFF",
      textTransform: "none",
      fontWeight: 600,
      fontFamily: "'Poppins', sans-serif",
      borderRadius: "10px",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      "&:hover": { bgcolor: "#0F5E36" },
    },
    outlined: {
      textTransform: "none",
      fontWeight: 600,
      fontFamily: "'Poppins', sans-serif",
      borderRadius: "10px",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },

  input: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: "0.9rem",
    borderRadius: "10px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      fontFamily: "'Poppins', sans-serif",
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#D1D5DB",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#157347",
        boxShadow: "0 0 0 3px rgba(21,115,71,0.1)",
      },
    },
    "& .MuiInputLabel-root": {
      fontFamily: "'Poppins', sans-serif",
      fontSize: "0.9rem",
    },
    "& .MuiFormHelperText-root": {
      fontFamily: "'Poppins', sans-serif",
      fontSize: "0.78rem",
    },
  },

  card: {
    bgcolor: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "12px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
    },
  },

  sidebar: {
    width: { xs: "100%", md: "280px" },
    flexShrink: 0,
    bgcolor: "#FFFFFF",
    p: 2.5,
    borderRadius: "12px",
    border: "1px solid #E5E7EB",
  },

  sidebarItem: {
    active: (primary) => ({
      display: "flex",
      alignItems: "center",
      gap: 2,
      px: 2,
      py: 1.5,
      borderRadius: "10px",
      cursor: "pointer",
      bgcolor: `${primary}10`,
      border: `1px solid ${primary}30`,
      color: primary,
      transition: "all 0.2s ease",
    }),
    inactive: {
      display: "flex",
      alignItems: "center",
      gap: 2,
      px: 2,
      py: 1.5,
      borderRadius: "10px",
      cursor: "pointer",
      bgcolor: "transparent",
      border: "1px solid transparent",
      color: "#111827",
      transition: "all 0.2s ease",
      "&:hover": { bgcolor: "#F3F4F6" },
    },
  },

  container: {
    maxWidth: "xl",
  },

  spacing: {
    sectionY: { xs: 6, md: 8 },
    pageY: { xs: 4, md: 5 },
    contentY: { xs: 3, md: 4 },
  },
};

export default DS;
