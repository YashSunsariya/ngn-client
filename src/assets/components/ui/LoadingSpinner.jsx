import { Box, CircularProgress } from "@mui/material";
import DS from "../../../theme/designSystem";

const LoadingSpinner = ({ size = 40, py = 10 }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", py }}>
      <CircularProgress size={size} sx={{ color: DS.colors.primary }} />
    </Box>
  );
};

export default LoadingSpinner;
