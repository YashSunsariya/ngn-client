export const formatPrice = (val) => val?.toLocaleString("en-IN") ?? "0";

export const getDiscountLabel = (product) => {
  if (product.discountPrice && product.discountPrice < product.price) {
    const pct = Math.round(
      ((product.price - product.discountPrice) / product.price) * 100
    );
    return `${pct}% OFF`;
  }
  return null;
};

export const getDisplayPrice = (product) =>
  product.discountPrice && product.discountPrice < product.price
    ? product.discountPrice
    : product.price;

export const getStockColor = (stock, colors) =>
  stock > 0 ? colors.primary : "#DC2626";

export const getStockLabel = (stock) =>
  stock > 0 ? "● In Stock" : "● Out of Stock";
