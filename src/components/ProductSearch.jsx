import React from "react";
import { Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DS from "../theme/designSystem";

const COLORS = DS.colors;

const ProductSearch = React.memo(({ searchQuery, onSearchChange, resultCount, totalCount }) => (
  <Box
    sx={{
      bgcolor: "#FFF",
      px: 3,
      py: 2,
      borderRadius: "12px",
      border: `1px solid ${COLORS.border}`,
      mb: 3,
      display: "flex",
      alignItems: "center",
      gap: 2,
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    }}
  >
    <SearchIcon sx={{ color: "#9CA3AF", fontSize: 20 }} />
    <Box sx={{ flex: 1 }}>
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{
          width: "100%",
          border: "none",
          outline: "none",
          fontSize: "0.88rem",
          fontFamily: "'Poppins', sans-serif",
          color: COLORS.heading,
          background: "transparent",
        }}
      />
    </Box>
    <Typography
      sx={{
        fontSize: "0.82rem",
        color: COLORS.sub,
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      {resultCount} of {totalCount}
    </Typography>
  </Box>
));

ProductSearch.displayName = "ProductSearch";
export default ProductSearch;
