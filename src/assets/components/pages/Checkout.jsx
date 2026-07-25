import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  CircularProgress,
  Chip,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MoneyIcon from "@mui/icons-material/Money";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockIcon from "@mui/icons-material/Lock";
import { createOrder, clearCurrentOrder } from "../../../redux/slices/orderSlice";
import { clearCart } from "../../../redux/slices/cartSlice";
import DS from "../../../theme/designSystem";
import PageBanner from "../ui/PageBanner";
import toast, { Toaster } from "react-hot-toast";

const COLORS = DS.colors;
const TAX_RATE = 0.18;
const FREE_SHIPPING_THRESHOLD = 5000;
const SHIPPING_COST = 199;

const formatPrice = (val) => val.toLocaleString("en-IN");

const getDisplayPrice = (item) =>
  item.discountPrice && item.discountPrice < item.price
    ? item.discountPrice
    : item.price;

const paymentMethods = [
  { value: "cod", label: "Cash on Delivery", icon: MoneyIcon, description: "Pay when you receive" },
  { value: "upi", label: "UPI Payment", icon: AccountBalanceIcon, description: "Google Pay, PhonePe, etc." },
  { value: "card", label: "Credit / Debit Card", icon: CreditCardIcon, description: "Visa, Mastercard, RuPay" },
];

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { items, loading: cartLoading } = useSelector((state) => state.cart);
  const { loading: orderLoading, currentOrder } = useSelector((state) => state.order);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [payment, setPayment] = useState("cod");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isAuthenticated) navigate("/login", { replace: true });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (items.length === 0 && !cartLoading && !currentOrder) {
      navigate("/cart", { replace: true });
    }
  }, [items, cartLoading, currentOrder, navigate]);

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        fullName: prev.fullName || user.name || "",
        email: prev.email || user.email || "",
        phone: prev.phone || user.contact || "",
        address: prev.address || user.address || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    return () => {
      dispatch(clearCurrentOrder());
    };
  }, [dispatch]);

  const subtotal = items.reduce((sum, item) => {
    const product = item.product || item;
    return sum + getDisplayPrice(product) * item.quantity;
  }, 0);
  const shipping =
    subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : items.length > 0 ? SHIPPING_COST : 0;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax + shipping;

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(form.phone.replace(/\D/g, "")))
      newErrors.phone = "Enter a valid 10-digit number";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";
    if (!form.pincode.trim()) newErrors.pincode = "PIN code is required";
    else if (!/^\d{6}$/.test(form.pincode))
      newErrors.pincode = "Enter a valid 6-digit PIN";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validate()) return;

    const orderData = {
      items: items.map((item) => {
        const product = item.product || item;
        return {
          productId: product._id || item.productId,
          quantity: item.quantity,
          price: getDisplayPrice(product),
        };
      }),
      shippingAddress: {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
      },
      paymentMethod: payment,
      subtotal,
      tax,
      shipping,
      total,
    };

    const result = await dispatch(createOrder(orderData));
    if (createOrder.fulfilled.match(result)) {
      dispatch(clearCart());
      toast.success("Order placed successfully!", {
        duration: 3000,
        position: "top-right",
        style: {
          fontFamily: "'Poppins', sans-serif",
          fontSize: "0.9rem",
          fontWeight: 500,
          background: "#111827",
          color: "#FFF",
        },
      });
    } else {
      toast.error(result.payload || "Failed to place order", {
        duration: 4000,
        position: "top-right",
        style: {
          fontFamily: "'Poppins', sans-serif",
          fontSize: "0.9rem",
          fontWeight: 500,
        },
      });
    }
  };

  if (!isAuthenticated || items.length === 0) return null;

  if (currentOrder) {
    return (
      <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: COLORS.bg, pb: 10 }}>
        <PageBanner
          title="Order Confirmed"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Cart", href: "/cart" },
            { label: "Order Confirmed" },
          ]}
        />
        <Container maxWidth="sm" sx={{ mt: { xs: 4, md: 6 } }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 5 },
              textAlign: "center",
              borderRadius: DS.radii.lg,
              border: `1px solid ${COLORS.border}`,
              bgcolor: COLORS.white,
              boxShadow: DS.shadows.xs,
            }}
          >
            <CheckCircleIcon
              sx={{ fontSize: 64, color: COLORS.success, mb: 2 }}
            />
            <Typography
              sx={{
                ...DS.typography.h3,
                color: COLORS.heading,
                mb: 1,
              }}
            >
              Thank You!
            </Typography>
            <Typography
              sx={{
                ...DS.typography.body,
                color: COLORS.sub,
                mb: 1,
              }}
            >
              Your order has been placed successfully.
            </Typography>
            {currentOrder._id && (
              <Chip
                label={`Order #${currentOrder._id.slice(-8).toUpperCase()}`}
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  bgcolor: COLORS.primaryTint,
                  color: COLORS.primary,
                  border: `1px solid ${COLORS.primary}30`,
                  mb: 3,
                }}
              />
            )}
            <Typography
              sx={{
                ...DS.typography.body,
                color: COLORS.sub,
                mb: 4,
                fontSize: "0.88rem",
              }}
            >
              We'll send you a confirmation email with tracking details shortly.
            </Typography>
            <Stack spacing={1.5}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => navigate("/profile")}
                sx={{
                  ...DS.button.primary,
                  py: 1.3,
                }}
              >
                View My Orders
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate("/products")}
                sx={{
                  ...DS.button.outlined,
                  borderColor: COLORS.border,
                  color: COLORS.sub,
                  py: 1.1,
                  "&:hover": {
                    borderColor: COLORS.primary,
                    color: COLORS.primary,
                    bgcolor: COLORS.primaryTint,
                  },
                }}
              >
                Continue Shopping
              </Button>
            </Stack>
          </Paper>
        </Container>
        <Toaster />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: COLORS.bg, pb: 10 }}>
      <PageBanner
        title="Checkout"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout" },
        ]}
      />

      <Container maxWidth="xl" sx={{ mt: { xs: 3, md: 4 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 3, md: 4 },
            alignItems: "flex-start",
          }}
        >
          {/* LEFT: FORMS */}
          <Box sx={{ flexGrow: 1, width: "100%", minWidth: 0 }}>
            {/* Shipping Information */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 3.5 },
                borderRadius: DS.radii.lg,
                border: `1px solid ${COLORS.border}`,
                bgcolor: COLORS.white,
                boxShadow: DS.shadows.xs,
                mb: 3,
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2.5 }}>
                <LocalShippingIcon sx={{ color: COLORS.primary, fontSize: 22 }} />
                <Typography
                  sx={{
                    ...DS.typography.h5,
                    fontFamily: DS.fonts.heading,
                    fontWeight: 700,
                  }}
                >
                  Shipping Information
                </Typography>
              </Stack>

              <Divider sx={{ mb: 3, borderColor: COLORS.borderLight }} />

              <Stack spacing={2.5}>
                <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2.5 }}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={form.fullName}
                    onChange={handleChange("fullName")}
                    error={Boolean(errors.fullName)}
                    helperText={errors.fullName}
                    sx={DS.input}
                  />
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    sx={DS.input}
                  />
                </Box>

                <TextField
                  fullWidth
                  label="Phone Number"
                  value={form.phone}
                  onChange={handleChange("phone")}
                  error={Boolean(errors.phone)}
                  helperText={errors.phone}
                  sx={DS.input}
                />

                <TextField
                  fullWidth
                  label="Delivery Address"
                  multiline
                  rows={2}
                  value={form.address}
                  onChange={handleChange("address")}
                  error={Boolean(errors.address)}
                  helperText={errors.address}
                  sx={DS.input}
                />

                <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2.5 }}>
                  <TextField
                    fullWidth
                    label="City"
                    value={form.city}
                    onChange={handleChange("city")}
                    error={Boolean(errors.city)}
                    helperText={errors.city}
                    sx={DS.input}
                  />
                  <TextField
                    fullWidth
                    label="State"
                    value={form.state}
                    onChange={handleChange("state")}
                    error={Boolean(errors.state)}
                    helperText={errors.state}
                    sx={DS.input}
                  />
                  <TextField
                    fullWidth
                    label="PIN Code"
                    value={form.pincode}
                    onChange={handleChange("pincode")}
                    error={Boolean(errors.pincode)}
                    helperText={errors.pincode}
                    sx={DS.input}
                  />
                </Box>
              </Stack>
            </Paper>

            {/* Payment Method */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 3.5 },
                borderRadius: DS.radii.lg,
                border: `1px solid ${COLORS.border}`,
                bgcolor: COLORS.white,
                boxShadow: DS.shadows.xs,
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2.5 }}>
                <PaymentIcon sx={{ color: COLORS.primary, fontSize: 22 }} />
                <Typography
                  sx={{
                    ...DS.typography.h5,
                    fontFamily: DS.fonts.heading,
                    fontWeight: 700,
                  }}
                >
                  Payment Method
                </Typography>
              </Stack>

              <Divider sx={{ mb: 2.5, borderColor: COLORS.borderLight }} />

              <FormControl component="fieldset" fullWidth>
                <RadioGroup
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                >
                  <Stack spacing={1.5}>
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      const isSelected = payment === method.value;
                      return (
                        <Paper
                          key={method.value}
                          elevation={0}
                          onClick={() => setPayment(method.value)}
                          sx={{
                            p: 2,
                            borderRadius: DS.radii.md,
                            border: `1.5px solid ${isSelected ? COLORS.primary : COLORS.border}`,
                            bgcolor: isSelected ? COLORS.primaryTint : COLORS.white,
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              borderColor: isSelected ? COLORS.primary : COLORS.inputBorder,
                            },
                          }}
                        >
                          <FormControlLabel
                            value={method.value}
                            control={
                              <Radio
                                size="small"
                                sx={{
                                  color: COLORS.muted,
                                  "&.Mui-checked": { color: COLORS.primary },
                                }}
                              />
                            }
                            label={
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                <Icon sx={{ fontSize: 20, color: isSelected ? COLORS.primary : COLORS.sub }} />
                                <Box>
                                  <Typography
                                    sx={{
                                      fontFamily: "'Poppins', sans-serif",
                                      fontSize: "0.88rem",
                                      fontWeight: 600,
                                      color: COLORS.heading,
                                    }}
                                  >
                                    {method.label}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontFamily: "'Poppins', sans-serif",
                                      fontSize: "0.76rem",
                                      color: COLORS.sub,
                                    }}
                                  >
                                    {method.description}
                                  </Typography>
                                </Box>
                              </Box>
                            }
                            sx={{ m: 0, width: "100%" }}
                          />
                        </Paper>
                      );
                    })}
                  </Stack>
                </RadioGroup>
              </FormControl>
            </Paper>
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
              width: { xs: "100%", md: 380 },
              flexShrink: 0,
              boxShadow: DS.shadows.xs,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: DS.fonts.heading,
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

            <Divider sx={{ mb: 2, borderColor: COLORS.borderLight }} />

            {/* Items List */}
            <Box sx={{ maxHeight: 240, overflowY: "auto", mb: 2, pr: 0.5 }}>
              {items.map((item) => {
                const product = item.product || item;
                const productId = product._id || item.productId || item._id;
                const displayPrice = getDisplayPrice(product);

                return (
                  <Box
                    key={productId}
                    sx={{
                      display: "flex",
                      gap: 1.5,
                      alignItems: "center",
                      py: 1.5,
                      borderBottom: `1px solid ${COLORS.borderLight}`,
                      "&:last-child": { borderBottom: "none" },
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        flexShrink: 0,
                        borderRadius: DS.radii.sm,
                        bgcolor: "#F9FAFB",
                        border: `1px solid ${COLORS.border}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        component="img"
                        src={product.images?.[0] || ""}
                        alt={product.productName}
                        sx={{ maxWidth: "85%", maxHeight: "85%", objectFit: "contain" }}
                      />
                    </Box>
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          color: COLORS.heading,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {product.productName}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: "0.74rem",
                          color: COLORS.sub,
                        }}
                      >
                        Qty: {item.quantity}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        color: COLORS.heading,
                        flexShrink: 0,
                      }}
                    >
                      ₹{formatPrice(displayPrice * item.quantity)}
                    </Typography>
                  </Box>
                );
              })}
            </Box>

            <Divider sx={{ my: 1, borderColor: COLORS.borderLight }} />

            {/* Pricing Breakdown */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5, mt: 2 }}>
              <Typography sx={{ fontSize: "0.88rem", color: COLORS.sub, fontFamily: "'Poppins', sans-serif" }}>
                Subtotal
              </Typography>
              <Typography sx={{ fontSize: "0.88rem", fontWeight: 500, fontFamily: "'Poppins', sans-serif" }}>
                ₹{formatPrice(subtotal)}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
              <Typography sx={{ fontSize: "0.88rem", color: COLORS.sub, fontFamily: "'Poppins', sans-serif" }}>
                Tax (18% GST)
              </Typography>
              <Typography sx={{ fontSize: "0.88rem", fontWeight: 500, fontFamily: "'Poppins', sans-serif" }}>
                ₹{formatPrice(tax)}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography sx={{ fontSize: "0.88rem", color: COLORS.sub, fontFamily: "'Poppins', sans-serif" }}>
                Shipping
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  color: shipping === 0 ? COLORS.primary : COLORS.heading,
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {shipping === 0 ? "FREE" : `₹${formatPrice(SHIPPING_COST)}`}
              </Typography>
            </Box>

            {shipping > 0 && (
              <Typography
                sx={{ fontSize: "0.73rem", color: COLORS.sub, mb: 1, fontFamily: "'Poppins', sans-serif" }}
              >
                Free shipping on orders above ₹{formatPrice(FREE_SHIPPING_THRESHOLD)}
              </Typography>
            )}

            <Divider sx={{ my: 2, borderColor: COLORS.borderLight }} />

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
              <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "1rem" }}>
                Total
              </Typography>
              <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "1rem", color: COLORS.primary }}>
                ₹{formatPrice(total)}
              </Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              onClick={handlePlaceOrder}
              disabled={orderLoading}
              startIcon={orderLoading ? <CircularProgress size={18} sx={{ color: "#FFF" }} /> : <LockIcon sx={{ fontSize: 18 }} />}
              sx={{
                ...DS.button.primary,
                py: 1.4,
                fontSize: "0.95rem",
                boxShadow: DS.shadows.primary,
                "&:hover": {
                  bgcolor: COLORS.primaryHover,
                  boxShadow: DS.shadows.primaryHover,
                },
                "&.Mui-disabled": {
                  bgcolor: COLORS.border,
                  color: COLORS.muted,
                },
              }}
            >
              {orderLoading ? "Placing Order..." : "Place Order"}
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/cart")}
              sx={{
                mt: 1.5,
                ...DS.button.outlined,
                borderColor: COLORS.border,
                color: COLORS.sub,
                py: 1.1,
                "&:hover": {
                  borderColor: COLORS.primary,
                  color: COLORS.primary,
                  bgcolor: COLORS.primaryTint,
                },
              }}
            >
              Back to Cart
            </Button>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.5,
                mt: 2.5,
              }}
            >
              <LockIcon sx={{ fontSize: 13, color: COLORS.muted }} />
              <Typography sx={{ ...DS.typography.caption, fontSize: "0.72rem", color: COLORS.muted }}>
                Secure & encrypted checkout
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
      <Toaster />
    </Box>
  );
};

export default Checkout;
