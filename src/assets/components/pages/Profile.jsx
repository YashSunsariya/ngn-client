import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Divider,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  Person,
  Email,
  Phone,
  Home,
  Edit,
  Save,
  Close,
} from "@mui/icons-material";
import { fetchProfile, updateUserProfile } from "../../../redux/slices/userSlice";
import { updateUser } from "../../../redux/slices/authSlice";
import DS from "../../../theme/designSystem";
import AlertSnackbar from "../ui/AlertSnackbar";

const Section = ({ title, subtitle, children }) => (
  <Paper
    variant="outlined"
    sx={{
      borderRadius: DS.radii.lg,
      borderColor: DS.colors.border,
      p: { xs: 2.5, md: 3 },
      width: "100%",
      boxSizing: "border-box",
    }}
  >
    <Box sx={{ mb: 2 }}>
      <Typography
        sx={{
          ...DS.typography.h6,
          fontFamily: DS.fonts.heading,
          fontWeight: 700,
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography sx={{ ...DS.typography.body, color: DS.colors.sub }}>
          {subtitle}
        </Typography>
      )}
    </Box>
    <Divider sx={{ mb: 2.5 }} />
    {children}
  </Paper>
);

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { saving } = useSelector((state) => state.user);

  const [editing, setEditing] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [form, setForm] = React.useState({
    name: "",
    contact: "",
    address: "",
  });

  React.useEffect(() => {
    if (!isAuthenticated) navigate("/login", { replace: true });
  }, [isAuthenticated, navigate]);

  React.useEffect(() => {
    if (!isAuthenticated) return;
    let cancelled = false;
    const load = async () => {
      const result = await dispatch(fetchProfile());
      if (!cancelled && fetchProfile.fulfilled.match(result)) {
        dispatch(updateUser(result.payload));
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, dispatch]);

  React.useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        contact: user.contact || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = async () => {
    const result = await dispatch(updateUserProfile(form));
    if (updateUserProfile.fulfilled.match(result)) {
      dispatch(updateUser(result.payload));
      setEditing(false);
      setSnackbar({
        open: true,
        message: "Profile updated successfully",
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: result.payload || "Failed to update profile",
        severity: "error",
      });
    }
  };

  const handleCancel = () => {
    setForm({
      name: user?.name || "",
      contact: user?.contact || "",
      address: user?.address || "",
    });
    setEditing(false);
  };

  if (!isAuthenticated) return null;

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 100px)",
        bgcolor: DS.colors.bg,
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Box sx={{ maxWidth: 700, mx: "auto" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Box>
            <Typography
              sx={{
                ...DS.typography.h3,
                color: DS.colors.heading,
                mb: 0.5,
              }}
            >
              My Profile
            </Typography>
            <Typography sx={{ ...DS.typography.body, color: DS.colors.sub }}>
              Manage your personal information.
            </Typography>
          </Box>
          {!editing && (
            <Button
              variant="outlined"
              startIcon={<Edit />}
              onClick={() => setEditing(true)}
              sx={{
                ...DS.button.outlined,
                borderColor: DS.colors.primary,
                color: DS.colors.primary,
                "&:hover": {
                  borderColor: DS.colors.primaryHover,
                  bgcolor: DS.colors.primaryTint,
                },
              }}
            >
              Edit
            </Button>
          )}
        </Box>

        <Section title="Personal Information" subtitle="Your account details.">
          {editing ? (
            <Stack spacing={2.5}>
              <TextField
                label="Full Name"
                fullWidth
                value={form.name}
                onChange={handleChange("name")}
                InputProps={{
                  startAdornment: (
                    <Person sx={{ mr: 1, color: DS.colors.sub, fontSize: 20 }} />
                  ),
                }}
                sx={DS.input}
              />
              <TextField
                label="Email Address"
                fullWidth
                value={user?.email || ""}
                slotProps={{ input: { readOnly: true } }}
                sx={{
                  ...DS.input,
                  "& .MuiInputBase-input": { color: DS.colors.sub },
                  "& .MuiInputLabel-root": { color: DS.colors.sub },
                }}
                InputProps={{
                  startAdornment: (
                    <Email sx={{ mr: 1, color: DS.colors.sub, fontSize: 20 }} />
                  ),
                }}
              />
              <TextField
                label="Contact Number"
                fullWidth
                value={form.contact}
                onChange={handleChange("contact")}
                InputProps={{
                  startAdornment: (
                    <Phone sx={{ mr: 1, color: DS.colors.sub, fontSize: 20 }} />
                  ),
                }}
                sx={DS.input}
              />
              <TextField
                label="Address"
                fullWidth
                value={form.address}
                onChange={handleChange("address")}
                InputProps={{
                  startAdornment: (
                    <Home sx={{ mr: 1, color: DS.colors.sub, fontSize: 20 }} />
                  ),
                }}
                sx={DS.input}
              />
            </Stack>
          ) : (
            <Stack spacing={2}>
              {[
                { icon: <Person />, label: "Full Name", value: user?.name },
                { icon: <Email />, label: "Email Address", value: user?.email },
                { icon: <Phone />, label: "Contact Number", value: user?.contact },
                { icon: <Home />, label: "Address", value: user?.address },
              ].map((item) => (
                <Box
                  key={item.label}
                  sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                >
                  {React.cloneElement(item.icon, {
                    sx: { color: DS.colors.sub, fontSize: 20 },
                  })}
                  <Box>
                    <Typography
                      sx={{
                        ...DS.typography.caption,
                        color: DS.colors.sub,
                        textTransform: "uppercase",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {item.label}
                    </Typography>
                    <Typography sx={{ ...DS.typography.body, color: DS.colors.heading }}>
                      {item.value || "—"}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          )}

          {editing && (
            <Stack
              direction="row"
              spacing={1.5}
              sx={{ mt: 3, justifyContent: "flex-end" }}
            >
              <Button
                variant="outlined"
                startIcon={<Close />}
                onClick={handleCancel}
                disabled={saving}
                sx={{
                  ...DS.button.outlined,
                  borderColor: DS.colors.border,
                  color: DS.colors.sub,
                  "&:hover": { borderColor: DS.colors.sub },
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handleSave}
                disabled={saving}
                sx={{
                  ...DS.button.primary,
                  px: 3,
                }}
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </Stack>
          )}
        </Section>
      </Box>

      <AlertSnackbar
        open={snackbar.open}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        severity={snackbar.severity}
        message={snackbar.message}
      />
    </Box>
  );
};

export default Profile;
