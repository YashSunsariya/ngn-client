import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Typography, Button, Stack, Card, Chip, IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DS from "../theme/designSystem";
import { formatPrice, getDiscountLabel, getDisplayPrice, getStockColor, getStockLabel } from "../utils/formatters";
import { EMPTY_PRODUCT_IMAGE } from "../constants";

const COLORS = DS.colors;

const ProductCard = React.memo(({
  product,
  wishlistItems = [],
  isAuthenticated,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
  onClick,
}) => {
  const navigate = useNavigate();
  const discountLabel = getDiscountLabel(product);
  const displayPrice = getDisplayPrice(product);
  const isWishlisted = wishlistItems.some((w) => w._id === product._id);

  const handleCardClick = () => {
    if (onClick) {
      onClick(product);
    } else {
      navigate(`/products/${product._id}`);
    }
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(product);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      if (!isAuthenticated) return navigate("/login");
    }
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    if (onBuyNow) {
      onBuyNow(product);
    }
  };

  return (
    <Card
      elevation={0}
      onClick={handleCardClick}
      sx={{
        bgcolor: "#FFF",
        border: `1px solid ${COLORS.border}`,
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
        cursor: "pointer",
        overflow: "hidden",
        transition:
          "box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          transform: "translateY(-4px)",
        },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          position: "absolute",
          top: 12,
          left: 12,
          right: 12,
          zIndex: 2,
        }}
      >
        {discountLabel && (
          <Chip
            label={discountLabel}
            size="small"
            sx={{
              bgcolor: COLORS.primary,
              color: "#FFF",
              fontWeight: 700,
              fontSize: "0.7rem",
              height: 22,
              borderRadius: "6px",
            }}
          />
        )}
        <IconButton
          size="small"
          onClick={handleWishlist}
          sx={{
            bgcolor: "#FFF",
            border: `1px solid ${COLORS.border}`,
            ml: discountLabel ? 0 : "auto",
            width: 32,
            height: 32,
            transition: "all 0.2s ease",
            "&:hover": {
              borderColor: "#DC2626",
              bgcolor: "#FEF2F2",
            },
          }}
        >
          {isWishlisted ? (
            <FavoriteIcon sx={{ fontSize: 16, color: "#DC2626" }} />
          ) : (
            <FavoriteBorderIcon sx={{ fontSize: 16, color: "#6B7280" }} />
          )}
        </IconButton>
      </Stack>

      <Box
        sx={{
          p: 4,
          pt: 6,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 250,
          bgcolor: "#FAFBFC",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={product.images?.[0] || EMPTY_PRODUCT_IMAGE}
          alt={product.productName}
          sx={{
            width: 180,
            height: 180,
            objectFit: "contain",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        />
      </Box>

      <Box
        sx={{
          px: 2.5,
          pb: 2.5,
          pt: 1.5,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "0.9rem",
            fontWeight: 600,
            color: COLORS.heading,
            mb: 0.75,
            minHeight: 40,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            lineHeight: 1.4,
          }}
        >
          {product.productName}
        </Typography>

        {product.brand && (
          <Typography
            sx={{
              fontSize: "0.78rem",
              color: COLORS.sub,
              mb: 1,
            }}
          >
            {product.brand.brandName}
          </Typography>
        )}

        <Stack
          direction="row"
          spacing={1}
          alignItems="baseline"
          sx={{ mb: 1.5 }}
        >
          <Typography
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1.15rem",
              fontWeight: 700,
              color: COLORS.heading,
            }}
          >
            ₹{formatPrice(displayPrice)}
          </Typography>
          {discountLabel && (
            <Typography
              sx={{
                fontSize: "0.8rem",
                color: COLORS.muted,
                textDecoration: "line-through",
              }}
            >
              ₹{formatPrice(product.price)}
            </Typography>
          )}
        </Stack>

        <Typography
          sx={{
            fontSize: "0.75rem",
            color: getStockColor(product.stock, COLORS),
            fontWeight: 600,
            mb: 2,
          }}
        >
          {getStockLabel(product.stock)}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{ mt: "auto" }}
        >
          <Button
            fullWidth
            variant="outlined"
            onClick={handleAddToCart}
            sx={{
              color: COLORS.primary,
              borderColor: COLORS.primary,
              textTransform: "none",
              fontSize: "0.8rem",
              fontWeight: 600,
              py: 0.8,
              borderRadius: "8px",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "rgba(21,115,71,0.06)",
                borderColor: COLORS.primaryHover,
              },
            }}
          >
            Add to Cart
          </Button>
          <Button
            fullWidth
            variant="contained"
            disableElevation
            onClick={handleBuyNow}
            sx={{
              bgcolor: COLORS.primary,
              color: "#FFF",
              textTransform: "none",
              fontSize: "0.8rem",
              fontWeight: 600,
              py: 0.8,
              borderRadius: "8px",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: COLORS.primaryHover,
                boxShadow: "0 4px 12px rgba(21,115,71,0.25)",
              },
            }}
          >
            Buy Now
          </Button>
        </Stack>
      </Box>
    </Card>
  );
});

ProductCard.displayName = "ProductCard";
export default ProductCard;
