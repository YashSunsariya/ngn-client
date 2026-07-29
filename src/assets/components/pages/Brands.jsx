import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box, Typography, Button, Stack, Container, Grid, Card, Divider, Avatar,
} from "@mui/material";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { fetchBrands } from "../../../redux/slices/brandSlice";
import DS from "../../../theme/designSystem";
import PageBanner from "../ui/PageBanner";
import SidebarPanel from "../ui/SidebarPanel";
import LoadingSpinner from "../ui/LoadingSpinner";

const Brands = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: brands, loading } = useSelector((state) => state.brands);
  const [activeBrandId, setActiveBrandId] = useState(null);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  useEffect(() => {
    if (brands.length > 0 && !activeBrandId) {
      setActiveBrandId(brands[0]._id);
    }
  }, [brands, activeBrandId]);

  const selectedBrand = brands.find((b) => b._id === activeBrandId) || brands[0];
  const getInitial = (name) => name?.charAt(0).toUpperCase() || "?";

  const sidebarItems = brands.map((brand) => ({
    id: brand._id,
    label: brand.brandName,
    sub: brand.category,
    icon: (
      <Avatar
        sx={{
          width: 32,
          height: 32,
          fontSize: "0.95rem",
          fontWeight: 700,
          fontFamily: DS.fonts.heading,
        }}
      >
        {brand.brandImage ? (
          <Box component="img" src={brand.brandImage} alt={brand.brandName} sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
        ) : (
          getInitial(brand.brandName)
        )}
      </Avatar>
    ),
  }));

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: DS.colors.bg, pb: 10 }}>
      <PageBanner
        title="Our Authorized Brands"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Brands" }]}
      />

      <Container maxWidth={DS.container.maxWidth} sx={{ mt: { xs: 3, md: 4 } }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4, alignItems: "flex-start" }}>
          {loading ? (
            <LoadingSpinner py={4} size={24} />
          ) : brands.length === 0 ? (
            <Typography sx={{ ...DS.typography.body, textAlign: "center", py: 4, width: "100%" }}>No brands found.</Typography>
          ) : (
            <SidebarPanel
              title="Partner Directory"
              items={sidebarItems}
              activeId={activeBrandId}
              onSelect={setActiveBrandId}
            />
          )}

          <Box sx={{ flexGrow: 1, width: "100%" }}>
            {loading ? (
              <LoadingSpinner />
            ) : !selectedBrand ? (
              <Box sx={{ textAlign: "center", py: 10 }}>
                <Typography sx={{ ...DS.typography.body, color: DS.colors.sub }}>Select a brand to view details.</Typography>
              </Box>
            ) : (
              <Card elevation={0} sx={{ ...DS.card, p: { xs: 3, md: 5 }, "&:hover": { boxShadow: DS.shadows.xs } }}>
                <Grid container spacing={4}>
                  <Grid item xs={12} lg={selectedBrand.brandImage ? 7 : 12}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                      <VerifiedUserRoundedIcon sx={{ color: DS.colors.primary, fontSize: 18 }} />
                      <Typography sx={{ ...DS.typography.label, color: DS.colors.primary, fontSize: "0.8rem" }}>
                        Certified NGN Supplier Hub
                      </Typography>
                    </Stack>

                    <Typography sx={{ ...DS.typography.h5, color: DS.colors.heading, mb: 1 }}>
                      {selectedBrand.brandName}
                    </Typography>

                    {selectedBrand.category && (
                      <Typography sx={{ ...DS.typography.body, fontWeight: 500, color: DS.colors.sub, mb: 3 }}>
                        Category: {selectedBrand.category}
                      </Typography>
                    )}

                    <Divider sx={{ my: 3 }} />

                    <Button variant="contained" disableElevation endIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate("/products")} sx={{ ...DS.button.primary, px: 3.5, py: 1.1 }}>
                      View Hardware Inventory
                    </Button>
                  </Grid>

                  {selectedBrand.brandImage && (
                    <Grid item xs={12} lg={5}>
                      <Box sx={{ width: "100%", height: { xs: 240, sm: 300, lg: "100%" }, minHeight: { lg: 300 }, borderRadius: DS.radii.lg, overflow: "hidden", border: `1px solid ${DS.colors.border}` }}>
                        <Box component="img" src={selectedBrand.brandImage} alt={selectedBrand.brandName} sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Card>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Brands;
