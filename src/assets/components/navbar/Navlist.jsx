import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import BuildIcon from "@mui/icons-material/Build";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import InfoIcon from "@mui/icons-material/Info";
import ArticleIcon from "@mui/icons-material/Article";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { NavLink, useLocation } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/", Icon: HomeIcon },
  { name: "Products", path: "/products", Icon: Inventory2Icon },
  { name: "Services", path: "/services", Icon: BuildIcon },
  { name: "Projects", path: "/projects", Icon: PrecisionManufacturingIcon },
  { name: "Brands", path: "/brands", Icon: BrandingWatermarkIcon },
  { name: "About Us", path: "/about", Icon: InfoIcon },
  { name: "Blog", path: "/blog", Icon: ArticleIcon },
  { name: "Contact", path: "/contact", Icon: ContactMailIcon },
];

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

const DRAWER_WIDTH = 280;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const drawer = (
    <Box sx={{ width: DRAWER_WIDTH, height: "100%", bgcolor: "#FFFFFF" }}>
      {/* Drawer Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          py: 2,
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "0.95rem",
            color: "#111827",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Navigation
        </Typography>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            color: "#6B7280",
            width: 32,
            height: 32,
            "&:hover": { bgcolor: "#F3F4F6" },
          }}
          aria-label="Close navigation menu"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Nav Items */}
      <List sx={{ pt: 1 }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.name} disablePadding sx={{ px: 1.5, mb: 0.25 }}>
              <ListItemButton
                component={NavLink}
                to={item.path}
                onClick={handleDrawerToggle}
                sx={{
                  px: 2,
                  py: 1.25,
                  borderRadius: "10px",
                  transition: "all 0.15s ease",
                  borderLeft: isActive
                    ? "3px solid #157347"
                    : "3px solid transparent",
                  bgcolor: isActive ? "rgba(21,115,71,0.06)" : "transparent",
                  "&:hover": {
                    bgcolor: isActive
                      ? "rgba(21,115,71,0.08)"
                      : "rgba(0,0,0,0.03)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: isActive ? "#157347" : "#9CA3AF",
                  }}
                >
                  <item.Icon sx={{ fontSize: 20 }} />
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    sx: {
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? "#157347" : "#374151",
                      fontSize: "0.9rem",
                      fontFamily: "'Poppins', sans-serif",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "#fff",
          borderTop: "1px solid #E5E7EB",
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        <Container maxWidth="xl" disableGutters={isMobile}>
          {isMobile ? (
            /* MOBILE: Hamburger + compact bar */
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "space-between",
                minHeight: 48,
                px: 2,
              }}
            >
              <IconButton
                onClick={handleDrawerToggle}
                sx={{
                  color: "#374151",
                  width: 36,
                  height: 36,
                  "&:hover": {
                    bgcolor: "#F3F4F6",
                  },
                }}
                aria-label="Open navigation menu"
              >
                <MenuIcon fontSize="small" />
              </IconButton>

              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "0.82rem",
                  color: "#157347",
                  letterSpacing: "0.04em",
                  textAlign: "center",
                  flex: 1,
                }}
              >
                NGN ENTERPRISES
              </Typography>

              <Box sx={{ width: 36 }} />
            </Toolbar>
          ) : (
            /* DESKTOP: Full horizontal nav */
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 0,
                minHeight: 48,
                px: 2,
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  component={NavLink}
                  to={item.path}
                  sx={{
                    color: "#4B5563",
                    textTransform: "none",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    fontFamily: "'Poppins', sans-serif",
                    borderRadius: 0,
                    minWidth: "auto",
                    px: { lg: 2, xl: 2.5 },
                    py: 1.5,
                    position: "relative",
                    transition: "color 0.2s ease",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      width: 0,
                      height: "2.5px",
                      bgcolor: "#157347",
                      borderRadius: "2px 2px 0 0",
                      transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                      transform: "translateX(-50%)",
                    },
                    "&.active": {
                      color: "#157347",
                      fontWeight: 600,
                      "&::after": {
                        width: "70%",
                      },
                    },
                    "&:hover": {
                      color: "#157347",
                      backgroundColor: "transparent",
                      "&::after": {
                        width: "40%",
                        bgcolor: "rgba(21,115,71,0.4)",
                      },
                    },
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Toolbar>
          )}
        </Container>

        {/* Mobile Drawer */}
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              boxShadow: "4px 0 24px rgba(0,0,0,0.1)",
            },
          }}
        >
          {drawer}
        </Drawer>
      </AppBar>
    </ThemeProvider>
  );
}
