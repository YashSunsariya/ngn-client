import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Stack,
  Container,
  Grid,
  Card,
  IconButton,
  Checkbox,
  FormControlLabel,
  Slider,
  Divider,
  Pagination,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { fetchProducts } from "../../../redux/slices/productSlice";
import { fetchCategories } from "../../../redux/slices/categorySlice";
import { fetchBrands } from "../../../redux/slices/brandSlice";
import { addToCart } from "../../../redux/slices/cartSlice";
import { toggleWishlist } from "../../../redux/slices/wishlistSlice";

import DS from "../../../theme/designSystem";
import PageBanner from "../ui/PageBanner";
import LoadingSpinner from "../ui/LoadingSpinner";

const COLORS = DS.colors;

const PRODUCTS_PER_PAGE = 12;

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: products, loading } = useSelector((state) => state.products);
  const { items: categories } = useSelector((state) => state.categories);
  const { items: brands } = useSelector((state) => state.brands);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [page, setPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([500, 50000]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const params = {};
    if (selectedCategories.length === 1) params.category = selectedCategories[0];
    if (selectedBrands.length === 1) params.brand = selectedBrands[0];
    if (priceRange[0] > 500) params.minPrice = priceRange[0];
    if (priceRange[1] < 50000) params.maxPrice = priceRange[1];
    if (searchQuery.trim()) params.search = searchQuery.trim();

    dispatch(fetchProducts(params));
  }, [dispatch, selectedCategories, selectedBrands, priceRange, searchQuery]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBrands());
  }, [dispatch]);

  useEffect(() => {
    setPage(1);
  }, [selectedCategories, selectedBrands, priceRange, searchQuery]);

  const totalCount = products.length;
  const totalPages = Math.ceil(totalCount / PRODUCTS_PER_PAGE);
  const paginatedProducts = products.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  const toggleCategory = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleBrand = (id) => {
    setSelectedBrands((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([500, 50000]);
    setSearchQuery("");
  };

  const formatPrice = (val) => val.toLocaleString("en-IN");

  const getDiscountLabel = (product) => {
    if (product.discountPrice && product.discountPrice < product.price) {
      const pct = Math.round(
        ((product.price - product.discountPrice) / product.price) * 100
      );
      return `${pct}% OFF`;
    }
    return null;
  };

  const handleAddToCart = (product) => {
    if (!isAuthenticated) return navigate("/login");
    dispatch(addToCart({ productId: product._id }));
  };

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: COLORS.bgLight, pb: 10 }}>
      <PageBanner
        title="Solar Products"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />

      {/* CONTENT */}
      <Container maxWidth="xl" sx={{ mt: { xs: 3, md: 4 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 3, md: 4 },
            alignItems: "flex-start",
          }}
        >
          {/* LEFT COLUMN: SIDEBAR FILTERS */}
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
                color: COLORS.textMain,
                borderBottom: `1px solid ${COLORS.border}`,
                pb: 2,
                mb: 2.5,
              }}
            >
              Filter By
            </Typography>

            {/* Category */}
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: COLORS.textSub,
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
                      checked={selectedCategories.includes(cat._id)}
                      onChange={() => toggleCategory(cat._id)}
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

            <Divider sx={{ my: 2, borderColor: "#F3F4F6" }} />

            {/* Brand */}
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: COLORS.textSub,
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
                      checked={selectedBrands.includes(brand._id)}
                      onChange={() => toggleBrand(brand._id)}
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

            <Divider sx={{ my: 2, borderColor: "#F3F4F6" }} />

            {/* Price Range */}
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: COLORS.textSub,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  mb: 1.5,
                }}
              >
                Price Range
              </Typography>
              <Slider
                value={priceRange}
                onChange={(e, newValue) => setPriceRange(newValue)}
                min={500}
                max={50000}
                sx={{ color: COLORS.primary, px: 0.5 }}
              />
              <Stack
                direction="row"
                sx={{ mt: 0.5, justifyContent: "space-between" }}
              >
                <Typography sx={{ fontSize: "0.8rem", color: COLORS.textSub }}>
                  ₹{formatPrice(priceRange[0])}
                </Typography>
                <Typography sx={{ fontSize: "0.8rem", color: COLORS.textSub }}>
                  ₹{formatPrice(priceRange[1])}+
                </Typography>
              </Stack>
            </Box>

            <Button
              fullWidth
              variant="outlined"
              onClick={clearFilters}
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

          {/* RIGHT COLUMN: MAIN CONTENT */}
          <Box sx={{ flexGrow: 1, width: "100%", minWidth: 0 }}>
            {/* Search + Stats */}
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
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    fontSize: "0.88rem",
                    fontFamily: "'Poppins', sans-serif",
                    color: COLORS.textMain,
                    background: "transparent",
                  }}
                />
              </Box>
              <Typography
                sx={{
                  fontSize: "0.82rem",
                  color: COLORS.textSub,
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                {paginatedProducts.length} of {totalCount}
              </Typography>
            </Box>

            {loading ? (
              <LoadingSpinner />
            ) : paginatedProducts.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 12 }}>
                <Typography
                  sx={{
                    color: COLORS.textSub,
                    fontSize: "1rem",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  No products found
                </Typography>
              </Box>
            ) : (
              <>
                {/* Product Cards Grid */}
                <Grid container spacing={3}>
                  {paginatedProducts.map((product) => {
                    const discountLabel = getDiscountLabel(product);
                    const displayPrice =
                      product.discountPrice &&
                        product.discountPrice < product.price
                        ? product.discountPrice
                        : product.price;

                    return (
                      <Grid item xs={12} sm={6} lg={4} key={product._id}>
                        <Card
                          elevation={0}
                          onClick={() => navigate(`/products/${product._id}`)}
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
                              boxShadow:
                                "0 10px 30px rgba(0,0,0,0.08)",
                              transform: "translateY(-4px)",
                            },
                          }}
                        >
                          {/* Top Badges */}
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{
                              position: "absolute",
                              justifyContent: "space-between",
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
                              onClick={(e) => {
                                e.stopPropagation();
                                dispatch(toggleWishlist(product));
                              }}
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
                              {wishlistItems.some(
                                (w) => w._id === product._id
                              ) ? (
                                <FavoriteIcon
                                  sx={{ fontSize: 16, color: "#DC2626" }}
                                />
                              ) : (
                                <FavoriteBorderIcon
                                  sx={{ fontSize: 16, color: "#6B7280" }}
                                />
                              )}
                            </IconButton>
                          </Stack>

                          {/* Image */}
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
                              src={product.images?.[0] || "/placeholder.png"}
                              alt={product.productName}
                              sx={{
                                width: 180,
                                height: 180,
                                objectFit: "contain",
                                transition: "0.3s",
                                "&:hover": {
                                  transform: "scale(1.05)",
                                },
                              }}
                            />
                          </Box>

                          {/* Content Details */}
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
                            {/* Title */}
                            <Typography
                              sx={{
                                fontFamily: "'Poppins', sans-serif",
                                fontSize: "0.9rem",
                                fontWeight: 600,
                                color: COLORS.textMain,
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

                            {/* Brand */}
                            {product.brand && (
                              <Typography
                                sx={{
                                  fontSize: "0.78rem",
                                  color: COLORS.textSub,
                                  mb: 1,
                                }}
                              >
                                {product.brand.brandName}
                              </Typography>
                            )}

                            {/* Price */}
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
                                  color: COLORS.textMain,
                                }}
                              >
                                ₹{formatPrice(displayPrice)}
                              </Typography>
                              {discountLabel && (
                                <Typography
                                  sx={{
                                    fontSize: "0.8rem",
                                    color: COLORS.priceStrike,
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
                                color:
                                  product.stock > 0
                                    ? COLORS.primary
                                    : "#DC2626",
                                fontWeight: 600,
                                mb: 2,
                              }}
                            >
                              {product.stock > 0
                                ? "● In Stock"
                                : "● Out of Stock"}
                            </Typography>

                            {/* CTA Buttons */}
                            <Stack
                              direction="row"
                              spacing={1}
                              sx={{ mt: "auto" }}
                            >
                              <Button
                                fullWidth
                                variant="outlined"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddToCart(product);
                                }}
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
                                onClick={(e) => e.stopPropagation()}
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
                                    boxShadow:
                                      "0 4px 12px rgba(21,115,71,0.25)",
                                  },
                                }}
                              >
                                Buy Now
                              </Button>
                            </Stack>
                          </Box>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                    <Pagination
                      count={totalPages}
                      page={page}
                      onChange={(e, val) => setPage(val)}
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
                )}
              </>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Products;
