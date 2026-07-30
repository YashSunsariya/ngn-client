import React from "react";
import { Box, Container, Typography, Divider, useMediaQuery } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

export default function TopBar() {
  const hideOnMobile = useMediaQuery("(max-width:900px)");

  return (
    <Box
      component="section"
      aria-label="Site announcements and contact information"
      sx={{
        bgcolor: "#0F5E36",
        color: "#fff",
        py: 0.75,
        display: hideOnMobile ? "none" : "block",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 13,
          }}
        >
          <Typography sx={{ fontSize: 13, opacity: 0.95 }}>
            Welcome to NGN Enterprises &amp; Automation
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <VerifiedIcon aria-hidden="true" sx={{ fontSize: 16 }} />
              <Typography sx={{ fontSize: 13 }}>High Quality Products</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <SupportAgentIcon aria-hidden="true" sx={{ fontSize: 16 }} />
              <Typography sx={{ fontSize: 13 }}>Expert Support</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <LocalShippingIcon aria-hidden="true" sx={{ fontSize: 16 }} />
              <Typography sx={{ fontSize: 13 }}>Pan India Delivery</Typography>
            </Box>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ borderColor: "rgba(255,255,255,0.3)", my: 0.5 }}
            />

            {/* Real tel:/mailto: links instead of static text */}
            <Box
              component="a"
              href="tel:+919399484682"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "inherit",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
                "&:focus-visible": { outline: "2px solid #fff", outlineOffset: 2 },
              }}
            >
              <PhoneIcon aria-hidden="true" sx={{ fontSize: 16 }} />
              <Typography sx={{ fontSize: 13 }}>+91 93994 84682</Typography>
            </Box>
            <Box
              component="a"
              href="mailto:info@ngnenterprises.com"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "inherit",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
                "&:focus-visible": { outline: "2px solid #fff", outlineOffset: 2 },
              }}
            >
              <EmailIcon aria-hidden="true" sx={{ fontSize: 16 }} />
              <Typography sx={{ fontSize: 13 }}>info@ngnenterprises.com</Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}