import React from "react";
import {
  Box, Container, Grid, Typography, Link, Stack, Divider, IconButton,
} from "@mui/material";
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import DS from "../../../theme/designSystem";

const socialIcons = [
  { icon: <FacebookIcon sx={{ fontSize: 18 }} />, label: "Facebook", href: "#" },
  { icon: <LinkedInIcon sx={{ fontSize: 18 }} />, label: "LinkedIn", href: "#" },
  { icon: <TwitterIcon sx={{ fontSize: 18 }} />, label: "Twitter", href: "#" },
];

const footerLinks = {
  "Quick Links": [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Brands", href: "/brands" },
    { label: "Blog & Articles", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
  ],
  "Our Products": [
    { label: "Solar Panels", href: "/products/panels" },
    { label: "Solar Inverters", href: "/products/inverters" },
    { label: "Lithium Batteries", href: "/products/batteries" },
    { label: "Automation Modules", href: "/products/automation" },
  ],
  "Solutions": [
    { label: "Residential Solar", href: "/solutions/residential" },
    { label: "Commercial Systems", href: "/solutions/commercial" },
    { label: "Industrial & Govt.", href: "/solutions/industrial" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#124429",
        color: "#FFFFFF",
        pt: 8,
        pb: 4,
        borderTop: "4px solid #2E7D52",
      }}
    >
      <Container maxWidth={DS.container.maxWidth}>
        <Grid container spacing={{ xs: 4, md: 6, lg: 8 }}>
          {/* Brand Column */}
          <Grid item xs={12} md={4}>
            <Stack spacing={2.5}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: DS.radii.md,
                    bgcolor: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SolarPowerIcon sx={{ color: "#1B5E3C", fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography sx={{ ...DS.typography.h6, fontFamily: DS.fonts.heading, fontWeight: 800, lineHeight: 1, letterSpacing: 0.5 }}>
                    NGN
                  </Typography>
                  <Typography sx={{ fontSize: 9, fontWeight: 700, opacity: 0.7, letterSpacing: 0.5, display: "block", fontFamily: DS.fonts.body }}>
                    ENTERPRISES & AUTOMATION
                  </Typography>
                </Box>
              </Box>

              <Typography sx={{ ...DS.typography.body, opacity: 0.8, lineHeight: 1.7, maxWidth: 320, fontSize: "0.88rem" }}>
                Powering a sustainable future with premium solar panels, clean energy inverters, and cutting-edge industrial automation components.
              </Typography>

              <Stack direction="row" spacing={1}>
                {socialIcons.map((item, idx) => (
                  <IconButton
                    key={idx}
                    href={item.href}
                    aria-label={item.label}
                    sx={{
                      color: "#FFFFFF",
                      bgcolor: "rgba(255,255,255,0.06)",
                      transition: "all 0.3s ease",
                      "&:hover": { bgcolor: "#2E7D52", transform: "translateY(-2px)" },
                    }}
                  >
                    {item.icon}
                  </IconButton>
                ))}
              </Stack>
            </Stack>
          </Grid>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <Grid item xs={6} sm={4} md={2} key={title}>
              <Typography sx={{ fontWeight: 700, mb: 2.5, letterSpacing: 0.5, textTransform: "uppercase", fontSize: 12, color: "#9AE1B7", fontFamily: DS.fonts.body }}>
                {title}
              </Typography>
              <Stack spacing={1.5} component="ul" sx={{ p: 0, m: 0, listStyle: "none" }}>
                {links.map((link) => (
                  <Box component="li" key={link.label}>
                    <Link
                      href={link.href}
                      underline="none"
                      sx={{
                        ...DS.typography.body,
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "0.85rem",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.5,
                        transition: "all 0.3s ease",
                        "&:hover": { color: "#FFFFFF", transform: "translateX(4px)" },
                      }}
                    >
                      {link.label}
                    </Link>
                  </Box>
                ))}
              </Stack>
            </Grid>
          ))}

          {/* Contact Column */}
          <Grid item xs={12} sm={4} md={2}>
            <Typography sx={{ fontWeight: 700, mb: 2.5, letterSpacing: 0.5, textTransform: "uppercase", fontSize: 12, color: "#9AE1B7", fontFamily: DS.fonts.body }}>
              Contact Us
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: "flex", gap: 1.5 }}>
                <LocationOnIcon sx={{ color: "#2E7D52", fontSize: 20, mt: 0.2 }} />
                <Typography sx={{ ...DS.typography.body, opacity: 0.8, fontSize: "0.85rem", lineHeight: 1.5 }}>
                  123, Automation Street, Industrial Area, India
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <PhoneIcon sx={{ color: "#2E7D52", fontSize: 18 }} />
                <Link href="tel:+919876543210" underline="none" sx={{ ...DS.typography.body, color: "rgba(255,255,255,0.8)", fontSize: "0.85rem", "&:hover": { color: "#FFF" } }}>
                  +91 98765 43210
                </Link>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <EmailIcon sx={{ color: "#2E7D52", fontSize: 18 }} />
                <Link href="mailto:info@ngnenterprises.com" underline="none" sx={{ ...DS.typography.body, color: "rgba(255,255,255,0.8)", fontSize: "0.85rem", "&:hover": { color: "#FFF" } }}>
                  info@ngnenterprises.com
                </Link>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.1)" }} />

        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography sx={{ ...DS.typography.caption, fontSize: "0.8rem", opacity: 0.6, textAlign: { xs: "center", sm: "left" }, color: "#fff" }}>
            © {currentYear} NGN Enterprises & Automation. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link href="/privacy" underline="none" sx={{ ...DS.typography.caption, fontSize: "0.78rem", color: "rgba(255,255,255,0.6)", "&:hover": { color: "#FFF" } }}>
              Privacy Policy
            </Link>
            <Link href="/terms" underline="none" sx={{ ...DS.typography.caption, fontSize: "0.78rem", color: "rgba(255,255,255,0.6)", "&:hover": { color: "#FFF" } }}>
              Terms of Service
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
