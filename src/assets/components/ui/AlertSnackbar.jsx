import React from "react";
import { Alert, Snackbar } from "@mui/material";
import DS from "../../../theme/designSystem";

const AlertSnackbar = ({
  open,
  onClose,
  severity = "success",
  message,
  autoHideDuration = 4000,
  anchorOrigin = { vertical: "bottom", horizontal: "center" },
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
    >
      <Alert
        severity={severity}
        onClose={onClose}
        variant="filled"
        sx={{
          fontFamily: DS.fonts.body,
          fontSize: "0.88rem",
          fontWeight: 500,
          borderRadius: DS.radii.md,
          boxShadow: DS.shadows.md,
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackbar;
