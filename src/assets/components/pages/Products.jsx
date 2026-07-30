import { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Box, Container } from "@mui/material";
import { fetchProducts } from "../../../redux/slices/productSlice";
import { fetchCategories } from "../../../redux/slices/categorySlice";
import { fetchBrands } from "../../../redux/slices/brandSlice";
import { addToCart } from "../../../redux/slices/cartSlice";
import { toggleWishlist } from "../../../redux/slices/wishlistSlice";
import DS from "../../../theme/designSystem";
import PageBanner from "../ui/PageBanner";
import ProductGrid from "../../../components/ProductGrid";
import ProductFilters from "../../../components/ProductFilters";
import ProductSearch from "../../../components/ProductSearch";
import ProductPagination from "../../../components/ProductPagination";
import { PRODUCTS_PER_PAGE, PRICE_MIN, PRICE_MAX } from "../../../constants";

const COLORS = DS.colors;

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
  const [priceRange, setPriceRange] = useState([PRICE_MIN, PRICE_MAX]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartLoadingId, setCartLoadingId] = useState(null);

  const fetchParams = useMemo(
    () => {
      const params = {};
      if (selectedCategories.length === 1) params.category = selectedCategories[0];
      if (selectedBrands.length === 1) params.brand = selectedBrands[0];
      if (priceRange[0] > PRICE_MIN) params.minPrice = priceRange[0];
      if (priceRange[1] < PRICE_MAX) params.maxPrice = priceRange[1];
      if (searchQuery.trim()) params.search = searchQuery.trim();
      return params;
    },
    [selectedCategories, selectedBrands, priceRange, searchQuery]
  );

  useEffect(() => {
    dispatch(fetchProducts(fetchParams));
  }, [dispatch, fetchParams]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBrands());
  }, [dispatch]);

  useEffect(() => {
    setPage(1);
  }, [selectedCategories, selectedBrands, priceRange, searchQuery]);

  const totalCount = products.length;
  const totalPages = Math.ceil(totalCount / PRODUCTS_PER_PAGE);

  const paginatedProducts = useMemo(
    () => products.slice(
      (page - 1) * PRODUCTS_PER_PAGE,
      page * PRODUCTS_PER_PAGE
    ),
    [products, page]
  );

  const toggleCategory = useCallback((id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }, []);

  const toggleBrand = useCallback((id) => {
    setSelectedBrands((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  }, []);

  const handlePriceChange = useCallback((newValue) => {
    setPriceRange(newValue);
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([PRICE_MIN, PRICE_MAX]);
    setSearchQuery("");
  }, []);

  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value);
  }, []);

  const handlePageChange = useCallback((val) => {
    setPage(val);
  }, []);

  const handleToggleWishlist = useCallback(
    (product) => {
      dispatch(toggleWishlist(product));
    },
    [dispatch]
  );

  const handleAddToCart = useCallback(
    async (product) => {
      if (!isAuthenticated) return navigate("/login");
      setCartLoadingId(product._id);
      const result = await dispatch(addToCart({ productId: product._id }));
      setCartLoadingId(null);
      if (result.meta?.requestStatus === "fulfilled") {
        toast.success("Item added to cart");
      } else {
        toast.error(result.payload || "Failed to add to cart");
      }
    },
    [dispatch, isAuthenticated, navigate]
  );

  const handleBuyNow = useCallback(
    async (product) => {
      if (!isAuthenticated) return navigate("/login");
      setCartLoadingId(product._id);
      const result = await dispatch(addToCart({ productId: product._id }));
      setCartLoadingId(null);
      if (result.meta?.requestStatus === "fulfilled") {
        toast.success("Item added to cart");
        navigate("/checkout");
      } else {
        toast.error(result.payload || "Failed to add to cart");
      }
    },
    [dispatch, isAuthenticated, navigate]
  );

  const handleProductClick = useCallback(
    (product) => {
      navigate(`/products/${product._id}`);
    },
    [navigate]
  );

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: COLORS.bg, pb: 10 }}>
      <PageBanner
        title="Solar Products"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
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
          <ProductFilters
            categories={categories}
            brands={brands}
            selectedCategories={selectedCategories}
            selectedBrands={selectedBrands}
            priceRange={priceRange}
            onToggleCategory={toggleCategory}
            onToggleBrand={toggleBrand}
            onPriceChange={handlePriceChange}
            onClearFilters={clearFilters}
          />

          <Box sx={{ flexGrow: 1, width: "100%", minWidth: 0 }}>
            <ProductSearch
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              resultCount={paginatedProducts.length}
              totalCount={totalCount}
            />

            <ProductGrid
              products={paginatedProducts}
              loading={loading}
              wishlistItems={wishlistItems}
              isAuthenticated={isAuthenticated}
              cartLoadingId={cartLoadingId}
              onToggleWishlist={handleToggleWishlist}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              onProductClick={handleProductClick}
            />

            <ProductPagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Products;
