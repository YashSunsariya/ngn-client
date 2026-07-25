import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Paper, Typography, Box, Divider, Button, IconButton, Container, Stack } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { removeFromWishlist, clearWishlist } from "../../../redux/slices/wishlistSlice";
import { addToCart } from "../../../redux/slices/cartSlice";
import DS from "../../../theme/designSystem";
import PageBanner from "../ui/PageBanner";
import EmptyState from "../ui/EmptyState";

const formatPrice = (val) => val.toLocaleString("en-IN");
const getDisplayPrice = (item) => item.discountPrice && item.discountPrice < item.price ? item.discountPrice : item.price;

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.wishlist.items);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleAddToCart = (product) => {
    if (!isAuthenticated) return navigate("/login");
    dispatch(addToCart({ productId: product._id }));
  };

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: DS.colors.bg, pb: 10 }}>
      <PageBanner
        title="My Wishlist"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Wishlist" }]}
      />

      <Container maxWidth={DS.container.maxWidth} sx={{ mt: { xs: 3, md: 4 } }}>
        {items.length === 0 ? (
          <EmptyState
            icon={FavoriteIcon}
            title="Your wishlist is empty"
            subtitle="Save products you love to review them later."
            actionLabel="Browse Products"
            actionPath="/products"
          />
        ) : (
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4, alignItems: "flex-start" }}>
            {/* LEFT: WISHLIST ITEMS */}
            <Box sx={{ flexGrow: 1, width: "100%" }}>
              <Box sx={{ bgcolor: DS.colors.white, borderRadius: DS.radii.lg, border: `1px solid ${DS.colors.border}`, p: 3, mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography sx={{ ...DS.typography.h6, fontFamily: DS.fonts.heading, fontWeight: 700 }}>
                  Saved Items ({items.length})
                </Typography>
                <Button size="small" onClick={() => dispatch(clearWishlist())} sx={{ color: DS.colors.danger, textTransform: "none", fontWeight: 600, fontSize: "0.8rem" }}>
                  Clear All
                </Button>
              </Box>

              {items.map((item) => {
                const displayPrice = getDisplayPrice(item);
                const hasDiscount = item.discountPrice && item.discountPrice < item.price;

                return (
                  <Paper
                    key={item._id}
                    elevation={0}
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: { sm: "center" },
                      gap: 2,
                      p: 2,
                      mb: 2,
                      borderRadius: DS.radii.lg,
                      border: `1px solid ${DS.colors.border}`,
                      bgcolor: DS.colors.white,
                      cursor: "pointer",
                      transition: "box-shadow 0.3s ease",
                      "&:hover": { boxShadow: DS.shadows.sm },
                    }}
                    onClick={() => navigate(`/products/${item._id}`)}
                  >
                    <Box sx={{ width: 100, height: 100, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#F9FAFB", borderRadius: DS.radii.lg, border: `1px solid ${DS.colors.border}` }}>
                      <Box component="img" src={item.images?.[0] || ""} alt={item.productName} sx={{ maxWidth: "90%", maxHeight: "90%", objectFit: "contain" }} />
                    </Box>

                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography sx={{ ...DS.typography.h6, fontFamily: DS.fonts.heading, fontWeight: 600, fontSize: "0.9rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.productName}
                      </Typography>
                      {item.brand && <Typography sx={{ ...DS.typography.caption, mb: 0.5 }}>{item.brand.brandName}</Typography>}
                      <Stack direction="row" spacing={1} alignItems="baseline">
                        <Typography sx={{ ...DS.typography.price, fontSize: "1rem", color: DS.colors.heading }}>₹{formatPrice(displayPrice)}</Typography>
                        {hasDiscount && <Typography sx={{ fontSize: "0.78rem", color: DS.colors.muted, textDecoration: "line-through" }}>₹{formatPrice(item.price)}</Typography>}
                      </Stack>
                      <Typography sx={{ fontSize: "0.75rem", color: item.stock > 0 ? DS.colors.primary : DS.colors.danger, fontWeight: 600, mt: 0.5 }}>
                        {item.stock > 0 ? "● In Stock" : "● Out of Stock"}
                      </Typography>
                    </Box>

                    <Stack direction={{ xs: "row", sm: "column" }} spacing={1} alignItems={{ sm: "flex-end" }}>
                      <Button variant="contained" size="small" startIcon={<ShoppingCartIcon sx={{ fontSize: 16 }} />}
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(item); }}
                        disabled={item.stock <= 0}
                        sx={{ ...DS.button.primary, fontSize: "0.78rem", px: 2, py: 0.75, "&.Mui-disabled": { bgcolor: DS.colors.inputBorder, color: DS.colors.muted } }}
                      >
                        Add to Cart
                      </Button>
                      <IconButton size="small" onClick={(e) => { e.stopPropagation(); dispatch(removeFromWishlist(item._id)); }} sx={{ color: DS.colors.danger, "&:hover": { bgcolor: DS.colors.dangerLight } }}>
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Paper>
                );
              })}
            </Box>

            {/* RIGHT: WISHLIST SUMMARY */}
            <Paper elevation={0} sx={{ p: 3, borderRadius: DS.radii.xl, position: "sticky", top: 20, width: { xs: "100%", md: 340 }, flexShrink: 0, border: `1px solid ${DS.colors.border}`, bgcolor: DS.colors.white }}>
              <Typography sx={{ ...DS.typography.h5, display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <FavoriteIcon sx={{ color: DS.colors.primary }} />
                Wishlist Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ ...DS.typography.body }}>Total Items</Typography>
                <Typography sx={{ ...DS.typography.body, fontWeight: 700 }}>{items.length}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                <Typography sx={{ ...DS.typography.body }}>Total Value</Typography>
                <Typography sx={{ ...DS.typography.body, fontWeight: 700, color: DS.colors.primary }}>
                  ₹{formatPrice(items.reduce((sum, item) => sum + getDisplayPrice(item), 0))}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                <Typography sx={{ ...DS.typography.body }}>Best Savings</Typography>
                <Typography sx={{ ...DS.typography.body, fontWeight: 700, color: DS.colors.primary }}>
                  ₹{formatPrice(items.reduce((sum, item) => {
                    if (item.discountPrice && item.discountPrice < item.price) return sum + (item.price - item.discountPrice);
                    return sum;
                  }, 0))}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Button fullWidth variant="contained" disableElevation startIcon={<ShoppingCartIcon />}
                onClick={() => {
                  if (!isAuthenticated) return navigate("/login");
                  const inStock = items.filter((item) => item.stock > 0);
                  inStock.forEach((item) => dispatch(addToCart({ productId: item._id })));
                  if (inStock.length > 0) toast.success("All items added to cart!");
                }}
                sx={{ ...DS.button.primary, py: 1.2, mt: 1 }}
              >
                Add All to Cart
              </Button>
              <Button fullWidth variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate("/products")}
                sx={{ ...DS.button.outlined, mt: 1.5, color: DS.colors.primary, borderColor: DS.colors.primary, "&:hover": { borderColor: DS.colors.primaryHover, bgcolor: DS.colors.primaryTint } }}
              >
                Continue Shopping
              </Button>
            </Paper>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Wishlist;
