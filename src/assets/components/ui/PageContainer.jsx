import { Box, Container } from "@mui/material";
import DS from "../../../theme/designSystem";

const PageContainer = ({ children, sx, maxWidth }) => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: DS.colors.bg,
        pb: 10,
        ...sx,
      }}
    >
      <Container maxWidth={maxWidth || DS.container.maxWidth}>
        {children}
      </Container>
    </Box>
  );
};

export default PageContainer;
