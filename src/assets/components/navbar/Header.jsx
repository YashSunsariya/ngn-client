import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { logout } from "../../../redux/slices/authSlice";
import { fetchCart } from "../../../redux/slices/cartSlice";

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const items = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  React.useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [isAuthenticated, dispatch]);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleCloseMenu();
    dispatch(logout());
    navigate("/", { replace: true });
  };

  const handleProfile = () => {
    handleCloseMenu();
    navigate("/profile");
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top:0,
        bgcolor: "#FFFFFF",
        borderBottom: "1px solid #E5E7EB",
        width: "100%",
        zIndex:9999999
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: { xs: 1, sm: 2 },
          minHeight: { xs: 64, md: 72 },
          py: 1,
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {/* Left Section: Logo & Branding */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, sm: 1.5 },
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              width: { xs: 48, sm: 56, md: 64 },
              height: { xs: 42, sm: 48, md: 56 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <img
              src="/ngnlogo.png"
              alt="NGN Logo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1.05rem" },
              color: "#111827",
              letterSpacing: "0.01em",
              lineHeight: 1.3,
              display: { xs: "none", sm: "none", md: "block" },
            }}
          >
            NGN ENTERPRISES
            <Box
              component="span"
              sx={{
                display: "block",
                fontWeight: 400,
                fontSize: "0.7rem",
                color: "#6B7280",
                letterSpacing: "0.06em",
                mt: -0.25,
              }}
            >
              AND AUTOMATION
            </Box>
          </Typography>
        </Box>

        {/* Center Section: Search Bar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexGrow: 1,
            maxWidth: { sm: 400, md: 480 },
            mx: { xs: 1, sm: 2 },
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              borderRadius: "12px",
              bgcolor: "#F8FAFC",
              border: "1.5px solid #E5E7EB",
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                borderColor: "#D1D5DB",
                bgcolor: "#FFFFFF",
              },
              "&:focus-within": {
                borderColor: "#157347",
                boxShadow: "0 0 0 3px rgba(21,115,71,0.1)",
                bgcolor: "#FFFFFF",
              },
            }}
          >
            <SearchIcon
              fontSize="small"
              sx={{
                color: "#9CA3AF",
                ml: 1.5,
                flexShrink: 0,
              }}
            />

            <InputBase
              placeholder="Search products..."
              sx={{
                width: "100%",
                px: 1.5,
                py: { xs: 0.75, md: 1 },
                fontSize: { xs: "0.85rem", md: "0.9rem" },
                "& .MuiInputBase-input": {
                  fontFamily: "'Poppins', sans-serif",
                  "&::placeholder": {
                    color: "#9CA3AF",
                    opacity: 1,
                  },
                },
              }}
            />
          </Box>
        </Box>

        {/* Right Section: Actions */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.5, sm: 1 },
            flexShrink: 0,
          }}
        >
          {/* Wishlist */}
          <IconButton
            onClick={() => navigate("/wishlist")}
            sx={{
              width: { xs: 36, sm: 40 },
              height: { xs: 36, sm: 40 },
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                bgcolor: "#EDF7F1",
                transform: "scale(1.05)",
              },
            }}
          >
            <Badge
              badgeContent={wishlistItems.length}
              max={9}
              sx={{
                "& .MuiBadge-badge": {
                  bgcolor: "#DC2626",
                  color: "#FFFFFF",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.65rem",
                  minWidth: 16,
                  height: 16,
                  padding: "0 4px",
                },
              }}
            >
              <FavoriteIcon
                sx={{
                  color: "#374151",
                  fontSize: { xs: 20, sm: 22 },
                }}
              />
            </Badge>
          </IconButton>

          {/* Cart */}
          <IconButton
            onClick={() => navigate("/cart")}
            sx={{
              width: { xs: 36, sm: 40 },
              height: { xs: 36, sm: 40 },
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                bgcolor: "#EDF7F1",
                transform: "scale(1.05)",
              },
            }}
          >
            <Badge
              badgeContent={items.reduce((s, i) => s + i.quantity, 0)}
              max={9}
              sx={{
                "& .MuiBadge-badge": {
                  bgcolor: "#157347",
                  color: "#FFFFFF",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.65rem",
                  minWidth: 16,
                  height: 16,
                  padding: "0 4px",
                  top: -2,
                  right: -2,
                },
              }}
            >
              <ShoppingCartIcon
                sx={{
                  color: "#374151",
                  fontSize: { xs: 20, sm: 22 },
                }}
              />
            </Badge>
          </IconButton>

          {/* User / Sign In */}
          {isAuthenticated ? (
            <Box
              onClick={handleOpenMenu}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                gap: 0.5,
                ml: { xs: 0.5, sm: 1 },
                pl: 0.5,
                pr: 1,
                py: 0.5,
                borderRadius: "999px",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  bgcolor: "#EDF7F1",
                },
              }}
            >
              <Avatar
                sx={{
                  width: { xs: 30, sm: 34 },
                  height: { xs: 30, sm: 34 },
                  bgcolor: "#DFF5E6",
                  color: "#0F5E36",
                  fontWeight: 700,
                  fontSize: { xs: "0.75rem", sm: "0.85rem" },
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {getInitials(user?.name)}
              </Avatar>

              <ArrowDropDownIcon
                sx={{
                  color: "#6B7280",
                  fontSize: 18,
                  display: { xs: "none", sm: "block" },
                }}
              />
            </Box>
          ) : (
            <Button
              variant="contained"
              startIcon={<LoginIcon sx={{ fontSize: 16 }} />}
              onClick={() => navigate("/login")}
              sx={{
                bgcolor: "#157347",
                color: "#FFFFFF",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.82rem",
                fontFamily: "'Poppins', sans-serif",
                px: { xs: 2, sm: 2.5 },
                py: 0.6,
                ml: { xs: 0.5, sm: 1 },
                borderRadius: "10px",
                boxShadow: "none",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  bgcolor: "#0F5E36",
                  boxShadow: "0 4px 12px rgba(21,115,71,0.25)",
                },
              }}
            >
              Sign In
            </Button>
          )}

          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            disableScrollLock={true}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              elevation: 0,
              sx: {
                mt: 1.5,
                minWidth: 180,
                borderRadius: "12px",
                border: "1px solid #E5E7EB",
                boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                overflow: "hidden",
              },
            }}
          >
            <MenuItem
              onClick={handleProfile}
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.88rem",
                py: 1.25,
                px: 2,
                color: "#111827",
                transition: "background-color 0.15s",
                "&:hover": {
                  bgcolor: "#EDF7F1",
                },
              }}
            >
              <ListItemIcon>
                <PersonIcon fontSize="small" sx={{ color: "#157347" }} />
              </ListItemIcon>
              Profile
            </MenuItem>

            <Divider sx={{ my: 0.5, borderColor: "#F1F5F9" }} />

            <MenuItem
              onClick={handleLogout}
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.88rem",
                py: 1.25,
                px: 2,
                color: "#EF4444",
                transition: "background-color 0.15s",
                "&:hover": {
                  bgcolor: "#FEF2F2",
                },
              }}
            >
              <ListItemIcon>
                <LogoutIcon fontSize="small" sx={{ color: "#EF4444" }} />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
