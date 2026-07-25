import React from "react";
import { Box, Typography, Button, Stack, Container, Chip } from "@mui/material";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import DS from "../../../theme/designSystem";
import SectionHeader from "../ui/SectionHeader";

const stats = [
  { value: "12k+", label: "Installations completed" },
  { value: "48 MW", label: "Solar capacity delivered" },
  { value: "25 yr", label: "Panel warranty" },
];

const ResidentialIcon = ({ accent }) => (
  <svg viewBox="0 0 200 140" width="100%" height="100%">
    <rect width="200" height="140" fill={`${accent}14`} />
    <circle cx="164" cy="30" r="14" fill="#FFC857" />
    <path d="M40 90 L100 45 L160 90 L160 120 L40 120 Z" fill="#FFFFFF" stroke="#111827" strokeWidth="2" />
    <path d="M40 90 L100 45 L160 90" fill="none" stroke="#111827" strokeWidth="2" />
    <g stroke="#0F5E36" strokeWidth="1.5">
      <rect x="55" y="60" width="42" height="22" fill="#157347" />
      <line x1="55" y1="71" x2="97" y2="71" />
      <line x1="76" y1="60" x2="76" y2="82" />
    </g>
    <rect x="80" y="95" width="24" height="25" fill="#3FA9F5" opacity="0.25" stroke="#111827" strokeWidth="1.5" />
  </svg>
);

const CommercialIcon = ({ accent }) => (
  <svg viewBox="0 0 200 140" width="100%" height="100%">
    <rect width="200" height="140" fill={`${accent}14`} />
    <rect x="50" y="35" width="100" height="85" fill="#FFFFFF" stroke="#111827" strokeWidth="2" />
    <rect x="55" y="20" width="90" height="15" fill="#157347" stroke="#111827" strokeWidth="1.5" />
    {[0, 1, 2].map((row) => [0, 1, 2].map((col) => (
      <rect key={`${row}-${col}`} x={62 + col * 27} y={48 + row * 22} width="18" height="14" fill="#3FA9F5" opacity="0.35" stroke="#111827" strokeWidth="1" />
    )))}
  </svg>
);

const BatteryIcon = ({ accent }) => (
  <svg viewBox="0 0 200 140" width="100%" height="100%">
    <rect width="200" height="140" fill={`${accent}14`} />
    <rect x="70" y="40" width="60" height="80" rx="8" fill="#FFFFFF" stroke="#111827" strokeWidth="2" />
    <rect x="88" y="30" width="24" height="12" rx="3" fill="#111827" />
    <rect x="78" y="85" width="44" height="26" fill="#157347" />
    <polygon points="103,50 88,80 100,80 96,105 114,72 101,72" fill="#FFC857" stroke="#111827" strokeWidth="1" />
  </svg>
);

const MonitoringIcon = ({ accent }) => (
  <svg viewBox="0 0 200 140" width="100%" height="100%">
    <rect width="200" height="140" fill={`${accent}14`} />
    <rect x="40" y="35" width="120" height="75" rx="6" fill="#FFFFFF" stroke="#111827" strokeWidth="2" />
    <rect x="90" y="110" width="20" height="10" fill="#111827" />
    <polyline points="55,90 75,65 90,80 110,50 130,70 145,55" fill="none" stroke="#157347" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="145" cy="55" r="4" fill="#FFC857" stroke="#111827" strokeWidth="1" />
  </svg>
);

const products = [
  { tag: "Best seller", title: "Residential Solar Systems", copy: "Custom-designed rooftop arrays sized to your home's usage and roof — installed end to end.", accent: DS.colors.sky, Icon: ResidentialIcon },
  { tag: "Popular", title: "Commercial Solar Solutions", copy: "Large-scale installations for businesses looking to cut operating costs and emissions.", accent: DS.colors.primary, Icon: CommercialIcon },
  { tag: "New", title: "Battery Storage", copy: "Store excess solar energy and keep the lights on through outages and peak pricing.", accent: DS.colors.amber, Icon: BatteryIcon },
  { tag: "Care plan", title: "Monitoring & Maintenance", copy: "Ongoing performance monitoring and servicing to keep every panel running at full output.", accent: DS.colors.sky, Icon: MonitoringIcon },
];

const features = [
  "Certified installation teams",
  "25-year manufacturer warranty",
  "Flexible financing & incentives support",
];

const Home = () => {
  return (
    <Box sx={{ width: "100%", overflow: "hidden", bgcolor: DS.colors.bg }}>
      {/* HERO */}
      <Box sx={{ position: "relative", width: "100%", minHeight: { xs: 520, md: 640 } }}>
        <Box component="img" src="/homeimage.png" alt="Solar panels and wind turbines powering a modern home at sunrise" sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <Box sx={{ position: "absolute", inset: 0, background: { xs: "linear-gradient(180deg, rgba(17,24,39,0.55) 0%, rgba(17,24,39,0.8) 60%, rgba(17,24,39,0.92) 100%)", md: "linear-gradient(100deg, rgba(17,24,39,0.88) 0%, rgba(17,24,39,0.72) 32%, rgba(17,24,39,0.25) 58%, rgba(17,24,39,0.05) 75%)" } }} />

        <Container maxWidth="lg" sx={{ position: "relative", height: "100%" }}>
          <Box sx={{ minHeight: { xs: 520, md: 640 }, display: "flex", flexDirection: "column", justifyContent: "center", py: { xs: 8, md: 0 }, maxWidth: 560 }}>
            <Chip label="12,000+ homes & businesses powered" sx={{ alignSelf: "flex-start", bgcolor: DS.colors.amberLight, color: DS.colors.amber, fontFamily: DS.fonts.body, fontWeight: 600, fontSize: "0.78rem", height: 28, mb: 3, border: `1px solid ${DS.colors.amber}55`, borderRadius: DS.radii.sm }} size="small" />
            <Typography sx={{ ...DS.typography.h1, color: "#fff", mb: 0 }}>
              Power your world with <Box component="span" sx={{ color: "#6FCF97" }}>clean solar energy</Box>.
            </Typography>
            <Typography sx={{ ...DS.typography.body, color: "rgba(255,255,255,0.85)", fontSize: { xs: "0.95rem", md: "1.05rem" }, lineHeight: 1.7, mt: 3, maxWidth: 460 }}>
              NGN Enterprises designs, installs, and maintains solar systems for homes and businesses — cutting energy costs while cutting carbon.
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mt: 4 }} flexWrap="wrap" useFlexGap>
              <Button variant="contained" disableElevation endIcon={<ArrowOutwardRoundedIcon sx={{ fontSize: 18 }} />} sx={{ ...DS.button.primary, px: 3.5, py: 1.25, "&:hover": { bgcolor: DS.colors.primaryHover, boxShadow: DS.shadows.primaryHover } }}>
                Get a free quote
              </Button>
              <Button variant="outlined" sx={{ ...DS.button.outlined, borderColor: "rgba(255,255,255,0.4)", color: "#fff", px: 3.5, py: 1.25, "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.08)" } }}>
                Explore products
              </Button>
            </Stack>

            <Stack spacing={1.5} sx={{ mt: 5 }}>
              {features.map((f) => (
                <Stack direction="row" spacing={1.5} alignItems="center" key={f}>
                  <CheckCircleRoundedIcon sx={{ fontSize: 18, color: "#6FCF97" }} />
                  <Typography sx={{ ...DS.typography.body, color: "rgba(255,255,255,0.85)", fontSize: "0.88rem" }}>{f}</Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* STATS */}
      <Container maxWidth="lg" sx={{ pb: { xs: 8, md: 10 }, mt: { xs: -4, md: -5 }, position: "relative", zIndex: 2 }}>
        <Box sx={{ bgcolor: DS.colors.white, border: `1px solid ${DS.colors.border}`, borderRadius: DS.radii.xl, px: { xs: 3, md: 6 }, py: { xs: 3.5, md: 4 }, display: "flex", flexWrap: "wrap", gap: { xs: 4, md: 0 }, boxShadow: DS.shadows.sm }}>
          {stats.map((s, i) => (
            <Box key={s.label} sx={{ flex: "1 1 auto", minWidth: 140, borderLeft: i === 0 ? "none" : { xs: "none", md: `1px solid ${DS.colors.border}` }, pl: { xs: 0, md: i === 0 ? 0 : 4 } }}>
              <Typography sx={{ ...DS.typography.price, fontSize: { xs: "1.6rem", md: "2rem" }, color: DS.colors.primary }}>{s.value}</Typography>
              <Typography sx={{ ...DS.typography.body, fontSize: "0.85rem", color: DS.colors.sub, mt: 0.5 }}>{s.label}</Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* PRODUCTS */}
      <Container maxWidth="xl" sx={{ pb: { xs: 8, md: 10 } }}>
        <SectionHeader label="Products & Services" title="Solar solutions for every roof and budget." />

        <Box sx={{ display: "flex", gap: 3, justifyContent: "space-between", flexWrap: { xs: "wrap", lg: "nowrap" } }}>
          {products.map((p) => (
            <Box key={p.title} sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)", lg: "1 1 25%" }, bgcolor: DS.colors.white, border: `1px solid ${DS.colors.border}`, borderRadius: DS.radii.xl, p: 3, display: "flex", flexDirection: "column", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", "&:hover": { transform: "translateY(-6px)", boxShadow: DS.shadows.md } }}>
              <Box sx={{ width: "100%", aspectRatio: "3 / 2", overflow: "hidden", borderRadius: DS.radii.md, border: `1px solid ${DS.colors.border}`, mb: 2.5 }}>
                <p.Icon accent={p.accent} />
              </Box>
              <Chip label={p.tag} size="small" sx={{ alignSelf: "flex-start", bgcolor: DS.colors.amberLight, color: DS.colors.amberDark, fontWeight: 600, fontSize: "0.72rem", height: 24, borderRadius: DS.radii.sm, mb: 2, fontFamily: DS.fonts.body }} />
              <Typography sx={{ ...DS.typography.h5, fontFamily: DS.fonts.heading, fontSize: "1.05rem", mb: 1 }}>{p.title}</Typography>
              <Typography sx={{ ...DS.typography.body, color: DS.colors.body, lineHeight: 1.7, flexGrow: 1, mb: 3 }}>{p.copy}</Typography>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ cursor: "pointer", color: DS.colors.primary, transition: "gap 0.2s ease", width: "fit-content", "&:hover": { gap: 1.5 } }}>
                <Typography sx={{ fontWeight: 600, fontSize: "0.88rem" }}>Learn More</Typography>
                <ArrowOutwardRoundedIcon sx={{ fontSize: 18 }} />
              </Stack>
            </Box>
          ))}
        </Box>
      </Container>

      {/* CTA BAND */}
      <Container maxWidth="xl" sx={{ pb: { xs: 8, md: 10 } }}>
        <Box sx={{ bgcolor: DS.colors.primary, borderRadius: DS.radii.xxl, px: { xs: 3, sm: 5, md: 8 }, py: { xs: 4, md: 5 }, boxShadow: DS.shadows.primaryHover }}>
          <Stack direction={{ xs: "column", md: "row" }} alignItems={{ xs: "flex-start", md: "center" }} spacing={{ xs: 3, md: 0 }} sx={{ width: "100%" }}>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ ...DS.typography.h2, color: "#fff", fontSize: { xs: "1.5rem", md: "1.85rem" }, mb: 1 }}>Ready to Go Solar?</Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.85)", fontSize: { xs: "0.9rem", md: "0.95rem" }, maxWidth: 550, lineHeight: 1.6, fontFamily: DS.fonts.body }}>
                Get a customized solar solution for your home or business. Save money on electricity bills with high-quality solar products and professional installation.
              </Typography>
            </Box>
            <Button variant="contained" disableElevation endIcon={<ArrowOutwardRoundedIcon />} sx={{ bgcolor: "#fff", color: DS.colors.primary, textTransform: "none", fontWeight: 600, fontFamily: DS.fonts.body, fontSize: "0.92rem", px: 3.5, py: 1, minWidth: 180, height: 48, borderRadius: DS.radii.lg, boxShadow: DS.shadows.lg, transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", "&:hover": { bgcolor: DS.colors.bg, boxShadow: "0 12px 32px rgba(0,0,0,0.15)", transform: "translateY(-2px)" } }}>
              Get Your Free Quote
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
