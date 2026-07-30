import React from "react";
import { Box, Pagination } from "@mui/material";
import DS from "../theme/designSystem";

const COLORS = DS.colors;

const ProductPagination = React.memo(({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, val) => onPageChange(val)}
        shape="rounded"
        color="primary"
        sx={{
          "& .MuiPaginationItem-root": {
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            borderColor: "#E5E7EB",
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor: "rgba(21,115,71,0.06)",
            },
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            bgcolor: COLORS.primary,
            color: "#FFF",
            "&:hover": {
              bgcolor: COLORS.primaryHover,
            },
          },
        }}
      />
    </Box>
  );
});

ProductPagination.displayName = "ProductPagination";
export default ProductPagination;
