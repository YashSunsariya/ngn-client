import { Box, Typography, Button, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import DS from "../../../theme/designSystem";

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: DS.colors.bg,
        py: 8,
        px: 3,
      }}
    >
      <Stack alignItems="center" spacing={2}>
        <Box
          sx={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            bgcolor: DS.colors.borderLight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ErrorOutlineRoundedIcon sx={{ fontSize: 48, color: DS.colors.muted }} />
        </Box>

        <Typography
          sx={{
            fontFamily: DS.fonts.heading,
            fontWeight: 800,
            fontSize: "3.5rem",
            color: DS.colors.heading,
            lineHeight: 1,
          }}
        >
          404
        </Typography>

        <Typography
          sx={{
            ...DS.typography.h4,
            color: DS.colors.heading,
            fontSize: "1.25rem",
          }}
        >
          Page not found
        </Typography>

        <Typography
          sx={{
            ...DS.typography.body,
            color: DS.colors.sub,
            textAlign: "center",
            maxWidth: 360,
          }}
        >
          The page you are looking for does not exist or has been moved.
        </Typography>

        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          disableElevation
          sx={{
            ...DS.button.primary,
            px: 4,
            py: 1.25,
            mt: 1,
          }}
        >
          Back to Home
        </Button>
      </Stack>
    </Box>
  );
}
