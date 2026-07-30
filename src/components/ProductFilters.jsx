import React from "react";
import {
  Box, Typography, Button, Stack, Checkbox, FormControlLabel, Slider, Divider,
} from "@mui/material";
import DS from "../theme/designSystem";
import { formatPrice } from "../utils/formatters";
import { PRICE_MIN, PRICE_MAX } from "../constants";

const COLORS = DS.colors;

const FilterCategory = React.memo(({ categories, selected, onToggle }) => (
  <Box sx={{ mb: 3 }}>
    <Typography
      sx={{
        fontSize: "0.8rem",
        fontWeight: 700,
        color: COLORS.sub,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        mb: 1.5,
      }}
    >
      Category
    </Typography>
    {categories.map((cat) => (
      <FormControlLabel
        key={cat._id}
        control={
          <Checkbox
            size="small"
            checked={selected.includes(cat._id)}
            onChange={() => onToggle(cat._id)}
            sx={{
              "&.Mui-checked": { color: COLORS.primary },
              p: 0.75,
            }}
          />
        }
        label={
          <Typography sx={{ fontSize: "0.85rem", color: "#374151" }}>
            {cat.categoryName}
          </Typography>
        }
        sx={{ display: "flex", my: -0.15, ml: -0.5 }}
      />
    ))}
  </Box>
));
FilterCategory.displayName = "FilterCategory";

const FilterBrand = React.memo(({ brands, selected, onToggle }) => (
  <Box sx={{ mb: 3 }}>
    <Typography
      sx={{
        fontSize: "0.8rem",
        fontWeight: 700,
        color: COLORS.sub,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        mb: 1.5,
      }}
    >
      Brand
    </Typography>
    {brands.map((brand) => (
      <FormControlLabel
        key={brand._id}
        control={
          <Checkbox
            size="small"
            checked={selected.includes(brand._id)}
            onChange={() => onToggle(brand._id)}
            sx={{
              "&.Mui-checked": { color: COLORS.primary },
              p: 0.75,
            }}
          />
        }
        label={
          <Typography sx={{ fontSize: "0.85rem", color: "#374151" }}>
            {brand.brandName}
          </Typography>
        }
        sx={{ display: "flex", my: -0.15, ml: -0.5 }}
      />
    ))}
  </Box>
));
FilterBrand.displayName = "FilterBrand";

const FilterPrice = React.memo(({ value, onChange }) => (
  <Box sx={{ mb: 3 }}>
    <Typography
      sx={{
        fontSize: "0.8rem",
        fontWeight: 700,
        color: COLORS.sub,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        mb: 1.5,
      }}
    >
      Price Range
    </Typography>
    <Slider
      value={value}
      onChange={(e, newValue) => onChange(newValue)}
      min={PRICE_MIN}
      max={PRICE_MAX}
      sx={{ color: COLORS.primary, px: 0.5 }}
    />
    <Stack
      direction="row"
      sx={{ mt: 0.5, justifyContent: "space-between" }}
    >
      <Typography sx={{ fontSize: "0.8rem", color: COLORS.sub }}>
        ₹{formatPrice(value[0])}
      </Typography>
      <Typography sx={{ fontSize: "0.8rem", color: COLORS.sub }}>
        ₹{formatPrice(value[1])}+
      </Typography>
    </Stack>
  </Box>
));
FilterPrice.displayName = "FilterPrice";

const ProductFilters = React.memo(({
  categories = [],
  brands = [],
  selectedCategories,
  selectedBrands,
  priceRange,
  onToggleCategory,
  onToggleBrand,
  onPriceChange,
  onClearFilters,
}) => (
  <Box
    sx={{
      width: { xs: "100%", md: "264px" },
      flexShrink: 0,
      bgcolor: "#FFF",
      p: 3,
      borderRadius: "12px",
      border: `1px solid ${COLORS.border}`,
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    }}
  >
    <Typography
      sx={{
        fontFamily: "'Poppins', sans-serif",
        fontSize: "1rem",
        fontWeight: 700,
        color: COLORS.heading,
        borderBottom: `1px solid ${COLORS.border}`,
        pb: 2,
        mb: 2.5,
      }}
    >
      Filter By
    </Typography>

    <FilterCategory
      categories={categories}
      selected={selectedCategories}
      onToggle={onToggleCategory}
    />

    <Divider sx={{ my: 2, borderColor: "#F3F4F6" }} />

    <FilterBrand
      brands={brands}
      selected={selectedBrands}
      onToggle={onToggleBrand}
    />

    <Divider sx={{ my: 2, borderColor: "#F3F4F6" }} />

    <FilterPrice value={priceRange} onChange={onPriceChange} />

    <Button
      fullWidth
      variant="outlined"
      onClick={onClearFilters}
      sx={{
        color: COLORS.primary,
        borderColor: COLORS.primary,
        textTransform: "none",
        fontWeight: 600,
        fontSize: "0.85rem",
        py: 1,
        borderRadius: "10px",
        transition: "all 0.2s ease",
        "&:hover": {
          bgcolor: "rgba(21,115,71,0.04)",
          borderColor: COLORS.primaryHover,
        },
      }}
    >
      Clear Filters
    </Button>
  </Box>
));

ProductFilters.displayName = "ProductFilters";
export default ProductFilters;
