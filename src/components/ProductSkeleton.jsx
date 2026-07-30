import React from "react";
import { Box, Skeleton } from "@mui/material";
import DS from "../theme/designSystem";

const ProductSkeleton = React.memo(() => (
  <Box
    sx={{
      bgcolor: "#FFF",
      border: `1px solid ${DS.colors.border}`,
      borderRadius: "12px",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <Box
      sx={{
        p: 4,
        pt: 6,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 250,
        bgcolor: "#FAFBFC",
      }}
    >
      <Skeleton variant="rectangular" width={180} height={180} sx={{ borderRadius: "8px" }} />
    </Box>
    <Box sx={{ px: 2.5, pb: 2.5, pt: 1.5 }}>
      <Skeleton variant="text" width="85%" height={24} sx={{ mb: 0.75 }} />
      <Skeleton variant="text" width="50%" height={18} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="40%" height={28} sx={{ mb: 1.5 }} />
      <Skeleton variant="text" width="30%" height={16} sx={{ mb: 2 }} />
      <Box sx={{ display: "flex", gap: 1 }}>
        <Skeleton variant="rectangular" width="50%" height={36} sx={{ borderRadius: "8px" }} />
        <Skeleton variant="rectangular" width="50%" height={36} sx={{ borderRadius: "8px" }} />
      </Box>
    </Box>
  </Box>
));

ProductSkeleton.displayName = "ProductSkeleton";
export default ProductSkeleton;
