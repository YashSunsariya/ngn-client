import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DS from "../../../theme/designSystem";

const EmptyState = ({ icon: Icon, title, subtitle, actionLabel, actionPath }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        textAlign: "center",
        py: { xs: 8, md: 12 },
        px: 3,
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          bgcolor: DS.colors.borderLight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mx: "auto",
          mb: 3,
        }}
      >
        <Icon sx={{ fontSize: 36, color: DS.colors.muted }} />
      </Box>

      <Typography
        sx={{
          ...DS.typography.h4,
          color: DS.colors.heading,
          mb: 1,
          fontSize: "1.25rem",
        }}
      >
        {title}
      </Typography>

      <Typography sx={{ ...DS.typography.body, color: DS.colors.sub, mb: 3 }}>
        {subtitle}
      </Typography>

      {actionLabel && actionPath && (
        <Button
          variant="contained"
          disableElevation
          onClick={() => navigate(actionPath)}
          sx={{
            ...DS.button.primary,
            px: 4,
            py: 1.1,
          }}
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
