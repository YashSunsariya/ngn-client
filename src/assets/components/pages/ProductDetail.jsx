import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Button,
  Stack,
  Container,
  Grid,
  IconButton,
  Divider,
  Chip,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ReplayIcon from "@mui/icons-material/Replay";
import { fetchProductById, clearCurrentProduct } from "../../../redux/slices/productSlice";
import { addToCart } from "../../../redux/slices/cartSlice";
import { toggleWishlist } from "../../../redux/slices/wishlistSlice";
import DS from "../../../theme/designSystem";
import PageBanner from "../ui/PageBanner";
import LoadingSpinner from "../ui/LoadingSpinner";

const formatPrice = (val) => val.toLocaleString("en-IN");

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { current: product, detailLoading, error } = useSelector(
    (state) => state.products
  );
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => dispatch(clearCurrentProduct());
  }, [id, dispatch]);

  useEffect(() => {
    setSelectedImage(0);
    setQuantity(1);
  }, [product]);

  if (detailLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          bgcolor: DS.colors.bg,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoadingSpinner />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: DS.colors.bg }}>
        <Box sx={{ textAlign: "center", py: 15 }}>
          <Typography
            sx={{
              fontFamily: DS.fonts.heading,
              fontSize: "1.2rem",
              fontWeight: 600,
              color: DS.colors.heading,
              mb: 1,
            }}
          >
            {error || "Product not found"}
          </Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/products")}
            sx={{
              mt: 2,
              bgcolor: DS.colors.primary,
              textTransform: "none",
              fontWeight: 600,
              borderRadius: DS.radii.md,
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": { bgcolor: DS.colors.primaryHover },
            }}
          >
            Back to Products
          </Button>
        </Box>
      </Box>
    );
  }

  const displayPrice =
    product.discountPrice && product.discountPrice < product.price
      ? product.discountPrice
      : product.price;
  const hasDiscount =
    product.discountPrice && product.discountPrice < product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product._id, quantity }));
  };

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: DS.colors.bg, pb: 10 }}>
      {/* BANNER */}
      <PageBanner
        title="Product Details"
        breadcrumbs={[
          { label: "Home", onClick: () => navigate("/") },
          { label: "Products", onClick: () => navigate("/products") },
          { label: product.productName },
        ]}
        action={
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/products")}
            sx={{
              color: DS.colors.primary,
              borderColor: DS.colors.border,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.85rem",
              borderRadius: DS.radii.md,
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                borderColor: DS.colors.primary,
                bgcolor: "rgba(21,115,71,0.04)",
              },
            }}
          >
            Back to Products
          </Button>
        }
      />

      <Container maxWidth="xl" sx={{ mt: { xs: 3, md: 5 } }}>
        <Grid container spacing={{ xs: 3, md: 5 }}>
          {/* LEFT: IMAGE GALLERY */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                border: `1px solid ${DS.colors.border}`,
                borderRadius: DS.radii.xl,
                overflow: "hidden",
                bgcolor: "#FFF",
                boxShadow: DS.shadows.xs,
              }}
            >
              {/* Main Image */}
              <Box
                sx={{
                  p: { xs: 3, md: 5 },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: { xs: 300, md: 420 },
                  bgcolor: "#FAFBFC",
                }}
              >
                <Box
                  component="img"
                  src={product.images?.[selectedImage] || ""}
                  alt={product.productName}
                  sx={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    transition: "transform 0.3s ease",
                  }}
                />
              </Box>

              {/* Thumbnail Row */}
              {product.images && product.images.length > 1 && (
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{
                    p: 2,
                    borderTop: `1px solid ${DS.colors.border}`,
                    overflowX: "auto",
                    "&::-webkit-scrollbar": { height: 4 },
                    "&::-webkit-scrollbar-thumb": {
                      bgcolor: DS.colors.inputBorder,
                      borderRadius: 2,
                    },
                  }}
                >
                  {product.images.map((img, idx) => (
                    <Box
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      sx={{
                        width: 72,
                        height: 72,
                        flexShrink: 0,
                        border:
                          idx === selectedImage
                            ? `2.5px solid ${DS.colors.primary}`
                            : `1px solid ${DS.colors.border}`,
                        borderRadius: DS.radii.md,
                        overflow: "hidden",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "#F9FAFB",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        opacity: idx === selectedImage ? 1 : 0.7,
                        "&:hover": {
                          borderColor: DS.colors.primary,
                          opacity: 1,
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={img}
                        alt=""
                        sx={{ width: "85%", height: "85%", objectFit: "contain" }}
                      />
                    </Box>
                  ))}
                </Stack>
              )}
            </Paper>
          </Grid>

          {/* RIGHT: PRODUCT INFO */}
          <Grid item xs={12} md={6}>
            <Box>
              {/* Badges */}
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                {hasDiscount && (
                  <Chip
                    label={`${discountPct}% OFF`}
                    size="small"
                    sx={{
                      bgcolor: DS.colors.primary,
                      color: "#FFF",
                      fontWeight: 700,
                      fontSize: "0.72rem",
                      height: 24,
                      borderRadius: DS.radii.sm,
                    }}
                  />
                )}
                {product.stock > 0 ? (
                  <Chip
                    label="In Stock"
                    size="small"
                    sx={{
                      bgcolor: DS.colors.successLight,
                      color: DS.colors.primary,
                      fontWeight: 600,
                      fontSize: "0.72rem",
                      height: 24,
                      borderRadius: DS.radii.sm,
                    }}
                  />
                ) : (
                  <Chip
                    label="Out of Stock"
                    size="small"
                    sx={{
                      bgcolor: DS.colors.dangerBorder,
                      color: DS.colors.danger,
                      fontWeight: 600,
                      fontSize: "0.72rem",
                      height: 24,
                      borderRadius: DS.radii.sm,
                    }}
                  />
                )}
              </Stack>

              {/* Brand */}
              {product.brand && (
                <Typography
                  sx={{
                    fontSize: "0.85rem",
                    color: DS.colors.sub,
                    fontWeight: 500,
                    mb: 0.5,
                    fontFamily: DS.fonts.body,
                  }}
                >
                  {product.brand.brandName}
                </Typography>
              )}

              {/* Product Name */}
              <Typography
                variant="h4"
                sx={{
                  fontFamily: DS.fonts.heading,
                  fontWeight: 700,
                  color: DS.colors.heading,
                  mb: 2,
                  lineHeight: 1.3,
                  fontSize: { xs: "1.4rem", md: "2rem" },
                }}
              >
                {product.productName}
              </Typography>

              {/* Price */}
              <Stack direction="row" spacing={1.5} alignItems="baseline" sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    fontFamily: DS.fonts.heading,
                    fontSize: { xs: "1.6rem", md: "2rem" },
                    fontWeight: 700,
                    color: DS.colors.heading,
                  }}
                >
                  ₹{formatPrice(displayPrice)}
                </Typography>
                {hasDiscount && (
                  <Typography
                    sx={{
                      fontSize: "1.1rem",
                      color: DS.colors.muted,
                      textDecoration: "line-through",
                    }}
                  >
                    ₹{formatPrice(product.price)}
                  </Typography>
                )}
              </Stack>

              <Divider sx={{ mb: 3, borderColor: DS.colors.borderLight }} />

              {/* Description */}
              {product.description && (
                <Typography
                  sx={{
                    fontSize: "0.92rem",
                    color: DS.colors.sub,
                    lineHeight: 1.7,
                    mb: 3,
                    fontFamily: DS.fonts.body,
                  }}
                >
                  {product.description}
                </Typography>
              )}

              {/* Quantity + Actions */}
              {product.stock > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography
                    sx={{
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: DS.colors.heading,
                      mb: 1.5,
                      fontFamily: DS.fonts.body,
                    }}
                  >
                    Quantity
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={3}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      sx={{
                        border: `1px solid ${DS.colors.border}`,
                        borderRadius: DS.radii.md,
                        overflow: "hidden",
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 0,
                          color: DS.colors.sub,
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          "&:hover": { bgcolor: DS.colors.borderLight },
                        }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography
                        sx={{
                          px: 2.5,
                          fontWeight: 600,
                          fontSize: "1rem",
                          minWidth: 48,
                          textAlign: "center",
                          fontFamily: DS.fonts.body,
                        }}
                      >
                        {quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() =>
                          setQuantity((q) => Math.min(product.stock || 99, q + 1))
                        }
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 0,
                          color: DS.colors.sub,
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          "&:hover": { bgcolor: DS.colors.borderLight },
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        color: DS.colors.sub,
                        fontFamily: DS.fonts.body,
                      }}
                    >
                      {product.stock} units available
                    </Typography>
                  </Stack>
                </Box>
              )}

              {/* Action Buttons */}
              <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCartIcon />}
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  sx={{
                    bgcolor: DS.colors.primary,
                    color: "#FFF",
                    textTransform: "none",
                    fontWeight: 600,
                    py: 1.4,
                    fontSize: "0.95rem",
                    borderRadius: DS.radii.md,
                    boxShadow: DS.shadows.none,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      bgcolor: DS.colors.primaryHover,
                      boxShadow: DS.shadows.primary,
                    },
                    "&.Mui-disabled": {
                      bgcolor: DS.colors.inputBorder,
                      color: DS.colors.muted,
                    },
                  }}
                >
                  Add to Cart
                </Button>
                <IconButton
                  onClick={() => dispatch(toggleWishlist(product))}
                  sx={{
                    border: `1px solid ${DS.colors.border}`,
                    borderRadius: DS.radii.md,
                    width: 52,
                    height: 52,
                    color: wishlistItems.some((w) => w._id === product?._id)
                      ? DS.colors.danger
                      : DS.colors.sub,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      color: DS.colors.danger,
                      borderColor: DS.colors.danger,
                      bgcolor: DS.colors.dangerLight,
                    },
                  }}
                >
                  {wishlistItems.some((w) => w._id === product?._id) ? (
                    <FavoriteIcon />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
              </Stack>

              {/* Trust Badges */}
              <Paper
                elevation={0}
                sx={{
                  border: `1px solid ${DS.colors.border}`,
                  borderRadius: DS.radii.lg,
                  p: 2.5,
                  boxShadow: DS.shadows.xs,
                }}
              >
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: DS.radii.lg,
                        bgcolor: DS.colors.primaryTint,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <LocalShippingIcon sx={{ color: DS.colors.primary, fontSize: 18 }} />
                    </Box>
                    <Typography
                      sx={{
                        fontSize: "0.85rem",
                        color: DS.colors.heading,
                        fontFamily: DS.fonts.body,
                      }}
                    >
                      Free shipping on orders above ₹5,000
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: DS.radii.lg,
                        bgcolor: DS.colors.primaryTint,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <VerifiedIcon sx={{ color: DS.colors.primary, fontSize: 18 }} />
                    </Box>
                    <Typography
                      sx={{
                        fontSize: "0.85rem",
                        color: DS.colors.heading,
                        fontFamily: DS.fonts.body,
                      }}
                    >
                      100% genuine product guarantee
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: DS.radii.lg,
                        bgcolor: DS.colors.primaryTint,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <SupportAgentIcon sx={{ color: DS.colors.primary, fontSize: 18 }} />
                    </Box>
                    <Typography
                      sx={{
                        fontSize: "0.85rem",
                        color: DS.colors.heading,
                        fontFamily: DS.fonts.body,
                      }}
                    >
                      Dedicated support & installation assistance
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: DS.radii.lg,
                        bgcolor: DS.colors.primaryTint,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <ReplayIcon sx={{ color: DS.colors.primary, fontSize: 18 }} />
                    </Box>
                    <Typography
                      sx={{
                        fontSize: "0.85rem",
                        color: DS.colors.heading,
                        fontFamily: DS.fonts.body,
                      }}
                    >
                      Easy returns within 7 days
                    </Typography>
                  </Stack>
                </Stack>
              </Paper>
            </Box>
          </Grid>
        </Grid>

        {/* SPECIFICATIONS */}
        {product.specifications && product.specifications.length > 0 && (
          <Paper
            elevation={0}
            sx={{
              mt: { xs: 4, md: 6 },
              border: `1px solid ${DS.colors.border}`,
              borderRadius: DS.radii.xl,
              p: { xs: 3, md: 4 },
              boxShadow: DS.shadows.xs,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: DS.fonts.heading,
                fontWeight: 700,
                color: DS.colors.heading,
                mb: 3,
              }}
            >
              Specifications
            </Typography>
            <Divider sx={{ mb: 3, borderColor: DS.colors.borderLight }} />
            <Grid container spacing={2}>
              {product.specifications.map((spec, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <Box
                    sx={{
                      display: "flex",
                      py: 1.5,
                      borderBottom: `1px solid ${DS.colors.borderLight}`,
                    }}
                  >
                    <Typography
                      sx={{
                        width: { xs: 140, sm: 180 },
                        flexShrink: 0,
                        fontSize: "0.88rem",
                        fontWeight: 600,
                        color: DS.colors.sub,
                        fontFamily: DS.fonts.body,
                      }}
                    >
                      {spec.key || spec.label}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.88rem",
                        color: DS.colors.heading,
                        fontFamily: DS.fonts.body,
                      }}
                    >
                      {spec.value}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}

        {/* KEY FEATURES */}
        {product.features && product.features.length > 0 && (
          <Paper
            elevation={0}
            sx={{
              mt: 4,
              border: `1px solid ${DS.colors.border}`,
              borderRadius: DS.radii.xl,
              p: { xs: 3, md: 4 },
              boxShadow: DS.shadows.xs,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: DS.fonts.heading,
                fontWeight: 700,
                color: DS.colors.heading,
                mb: 3,
              }}
            >
              Key Features
            </Typography>
            <Divider sx={{ mb: 3, borderColor: DS.colors.borderLight }} />
            <Grid container spacing={2}>
              {product.features.map((feature, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <Stack direction="row" spacing={1.5} alignItems="flex-start">
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: DS.colors.primary,
                        mt: 0.8,
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "0.9rem",
                        color: DS.colors.heading,
                        fontFamily: DS.fonts.body,
                        lineHeight: 1.6,
                      }}
                    >
                      {feature}
                    </Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default ProductDetail;
