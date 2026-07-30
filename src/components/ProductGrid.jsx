import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";
import DS from "../theme/designSystem";

const SKELETON_COUNT = 8;

const LoadingState = React.memo(() => (
  <Grid container spacing={3}>
    {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
        <ProductSkeleton />
      </Grid>
    ))}
  </Grid>
));
LoadingState.displayName = "LoadingState";

const EmptyState = React.memo(() => (
  <Box sx={{ textAlign: "center", py: 12 }}>
    <Typography
      sx={{
        color: DS.colors.sub,
        fontSize: "1rem",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      No products found
    </Typography>
  </Box>
));
EmptyState.displayName = "EmptyState";

const ProductGrid = React.memo(({
  products,
  loading,
  wishlistItems,
  isAuthenticated,
  cartLoadingId,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
  onProductClick,
}) => {
  if (loading) return <LoadingState />;
  if (!products || products.length === 0) return <EmptyState />;

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
          <ProductCard
            product={product}
            wishlistItems={wishlistItems}
            isAuthenticated={isAuthenticated}
            cartLoadingId={cartLoadingId}
            onToggleWishlist={onToggleWishlist}
            onAddToCart={onAddToCart}
            onBuyNow={onBuyNow}
            onClick={onProductClick}
          />
        </Grid>
      ))}
    </Grid>
  );
});

ProductGrid.displayName = "ProductGrid";
export default ProductGrid;
