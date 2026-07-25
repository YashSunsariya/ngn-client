import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import DS from "../../../theme/designSystem";

const SectionHeader = ({ label, title, align }) => {
  return (
    <Box sx={{ mb: { xs: 4, md: 6 }, textAlign: align || "center" }}>
      {label && (
        <Typography
          sx={{
            fontFamily: DS.fonts.body,
            fontWeight: 600,
            fontSize: "0.78rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: DS.colors.primary,
            mb: 1.5,
          }}
        >
          {label}
        </Typography>
      )}
      {title && (
        <Typography
          sx={{
            ...DS.typography.h2,
            color: DS.colors.heading,
            fontSize: { xs: "1.5rem", md: "2rem" },
          }}
        >
          {title}
        </Typography>
      )}
    </Box>
  );
};

export default SectionHeader;
