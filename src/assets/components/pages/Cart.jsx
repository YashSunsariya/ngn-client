import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  Box,
  Divider,
  Button,
  IconButton,
  Container,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  fetchCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../../redux/slices/cartSlice";

import DS from "../../../theme/designSystem";
import PageBanner from "../ui/PageBanner";
import EmptyState from "../ui/EmptyState";
import LoadingSpinner from "../ui/LoadingSpinner";

const COLORS = DS.colors;

const TAX_RATE = 0.18;
const FREE_SHIPPING_THRESHOLD = 5000;
const SHIPPING_COST = 199;

const formatPrice = (val) => val.toLocaleString("en-IN");

const getDisplayPrice = (item) =>
  item.discountPrice && item.discountPrice < item.price
    ? item.discountPrice
    : item.price;

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const subtotal = items.reduce((sum, item) => {
    const product = item.product || item;
    return sum + getDisplayPrice(product) * item.quantity;
  }, 0);
  const shipping =
    subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : items.length > 0 ? SHIPPING_COST : 0;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax + shipping;

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: COLORS.bgLight, pb: 10 }}>
      <PageBanner
        title="Shopping Cart"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Cart" }]}
      />

      <Container maxWidth="xl" sx={{ mt: { xs: 3, md: 4 } }}>
        {loading && items.length === 0 ? (
          <LoadingSpinner />
        ) : items.length === 0 ? (
          <EmptyState
            icon={ShoppingCartIcon}
            title="Your cart is empty"
            subtitle="Looks like you haven't added any products yet."
            actionLabel="Continue Shopping"
            actionPath="/products"
          />
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 3, md: 4 },
              alignItems: "flex-start",
            }}
          >
            {/* LEFT: CART ITEMS */}
            <Box sx={{ flexGrow: 1, width: "100%", minWidth: 0 }}>
              {/* Header */}
              <Box
                sx={{
                  bgcolor: "#FFF",
                  borderRadius: "12px",
                  border: `1px solid ${COLORS.border}`,
                  px: 3,
                  py: 2,
                  mb: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: COLORS.textMain,
                  }}
                >
                  Cart Items ({items.reduce((s, i) => s + i.quantity, 0)})
                </Typography>
                <Button
                  size="small"
                  onClick={() => dispatch(clearCart())}
                  sx={{
                    color: "#DC2626",
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.8rem",
                    transition: "all 0.15s ease",
                    "&:hover": { bgcolor: "#FEF2F2" },
                  }}
                >
                  Clear All
                </Button>
              </Box>

              {/* Items */}
              {items.map((item) => {
                const product = item.product || item;
                const productId =
                  product._id || item.productId || item._id;
                const displayPrice = getDisplayPrice(product);
                const lineTotal = displayPrice * item.quantity;
                const hasDiscount =
                  product.discountPrice &&
                  product.discountPrice < product.price;

                return (
                  <Paper
                    key={productId}
                    elevation={0}
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: { sm: "center" },
                      gap: { xs: 2, sm: 3 },
                      p: { xs: 2, sm: 2.5 },
                      mb: 2,
                      borderRadius: "12px",
                      border: `1px solid ${COLORS.border}`,
                      bgcolor: "#FFF",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                      transition: "box-shadow 0.2s ease",
                      "&:hover": {
                        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                      },
                    }}
                  >
                    {/* Image */}
                    <Box
                      sx={{
                        width: { xs: 80, sm: 100 },
                        height: { xs: 80, sm: 100 },
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "#F9FAFB",
                        borderRadius: "10px",
                        border: `1px solid ${COLORS.border}`,
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        component="img"
                        src={product.images?.[0] || ""}
                        alt={product.productName}
                        sx={{
                          maxWidth: "90%",
                          maxHeight: "90%",
                          objectFit: "contain",
                        }}
                      />
                    </Box>

                    {/* Info */}
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: "0.9rem",
                          fontWeight: 600,
                          color: COLORS.textMain,
                          mb: 0.5,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {product.productName}
                      </Typography>
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
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="baseline"
                      >
                        <Typography
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: "1rem",
                            fontWeight: 700,
                            color: COLORS.textMain,
                          }}
                        >
                          ₹{formatPrice(displayPrice)}
                        </Typography>
                        {hasDiscount && (
                          <Typography
                            sx={{
                              fontSize: "0.78rem",
                              color: COLORS.priceStrike,
                              textDecoration: "line-through",
                            }}
                          >
                            ₹{formatPrice(product.price)}
                          </Typography>
                        )}
                      </Stack>
                    </Box>

                    {/* Quantity Controls */}
                    <Stack
                      direction="row"
                      alignItems="center"
                      sx={{
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: "10px",
                        overflow: "hidden",
                        flexShrink: 0,
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              productId,
                              quantity: item.quantity - 1,
                            })
                          )
                        }
                        disabled={item.quantity <= 1 || loading}
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: 0,
                          color: COLORS.textSub,
                          transition: "all 0.15s ease",
                          "&:hover": {
                            bgcolor: "#F3F4F6",
                          },
                          "&.Mui-disabled": {
                            color: "#D1D5DB",
                          },
                        }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography
                        sx={{
                          px: 2,
                          fontWeight: 600,
                          fontSize: "0.9rem",
                          minWidth: 40,
                          textAlign: "center",
                          fontFamily: "'Poppins', sans-serif",
                          borderTop: "none",
                          borderBottom: "none",
                        }}
                      >
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              productId,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                        disabled={loading}
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: 0,
                          color: COLORS.textSub,
                          transition: "all 0.15s ease",
                          "&:hover": {
                            bgcolor: "#F3F4F6",
                          },
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Stack>

                    {/* Line Total + Remove */}
                    <Box
                      sx={{
                        textAlign: { xs: "left", sm: "right" },
                        minWidth: { xs: "auto", sm: 100 },
                        flexShrink: 0,
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 700,
                          color: COLORS.textMain,
                          mb: 0.5,
                        }}
                      >
                        ₹{formatPrice(lineTotal)}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() =>
                          dispatch(removeFromCart(productId))
                        }
                        disabled={loading}
                        sx={{
                          color: "#9CA3AF",
                          width: 32,
                          height: 32,
                          transition: "all 0.15s ease",
                          "&:hover": {
                            color: "#DC2626",
                            bgcolor: "#FEF2F2",
                          },
                        }}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Paper>
                );
              })}
            </Box>

            {/* RIGHT: ORDER SUMMARY */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 3.5 },
                borderRadius: "16px",
                border: `1px solid ${COLORS.border}`,
                position: "sticky",
                top: 20,
                width: { xs: "100%", md: 360 },
                flexShrink: 0,
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 2.5,
                  fontWeight: 700,
                }}
              >
                <ShoppingCartIcon sx={{ fontSize: 22, color: COLORS.primary }} />
                Order Summary
              </Typography>

              <Divider sx={{ mb: 2.5, borderColor: "#F3F4F6" }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.5,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    color: COLORS.textSub,
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Subtotal
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  ₹{formatPrice(subtotal)}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.5,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    color: COLORS.textSub,
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Tax (18% GST)
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  ₹{formatPrice(tax)}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    color: COLORS.textSub,
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Shipping
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: shipping === 0 ? COLORS.primary : COLORS.textMain,
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {shipping === 0
                    ? "FREE"
                    : `₹${formatPrice(SHIPPING_COST)}`}
                </Typography>
              </Box>

              {shipping > 0 && (
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    color: COLORS.textSub,
                    mb: 1,
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Free shipping on orders above ₹
                  {formatPrice(FREE_SHIPPING_THRESHOLD)}
                </Typography>
              )}

              <Divider sx={{ my: 2.5, borderColor: "#F3F4F6" }} />

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                  }}
                >
                  Total
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: COLORS.primary,
                  }}
                >
                  ₹{formatPrice(total)}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                onClick={() => navigate("/checkout")}
                sx={{
                  bgcolor: COLORS.primary,
                  color: "#FFF",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  py: 1.3,
                  borderRadius: "10px",
                  boxShadow: "none",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: COLORS.primaryHover,
                    boxShadow: "0 4px 12px rgba(21,115,71,0.25)",
                  },
                }}
              >
                Proceed to Checkout
              </Button>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate("/products")}
                sx={{
                  mt: 1.5,
                  color: COLORS.primary,
                  borderColor: COLORS.border,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.88rem",
                  py: 1.1,
                  borderRadius: "10px",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: COLORS.primary,
                    bgcolor: "rgba(21,115,71,0.04)",
                  },
                }}
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

export default Cart;
