import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Typography, Container, Grid, Card, Divider, Stack, Button, Avatar,
} from "@mui/material";
import CorporateFareRoundedIcon from "@mui/icons-material/CorporateFareRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import FactCheckRoundedIcon from "@mui/icons-material/FactCheckRounded";
import EngineeringRoundedIcon from "@mui/icons-material/EngineeringRounded";
import ShieldCheckeredIcon from "@mui/icons-material/Shield";
import DS from "../../../theme/designSystem";
import PageBanner from "../ui/PageBanner";
import SidebarPanel from "../ui/SidebarPanel";

const aboutSections = [
  {
    id: "vision",
    title: "Company Vision",
    label: "Future Scope",
    icon: <CorporateFareRoundedIcon sx={{ fontSize: 18 }} />,
    image: "http://googleusercontent.com/image_collection/image_retrieval/1521332295649456061_0",
    tagline: "Empowering Sustainable Automation",
    heading: "Driving Industrial Energy Efficiency Through Smart Innovation",
    description: "NGN Enterprises and Automation stands at the forefront of combining clean solar energy grids with highly advanced automated web-based telemetry interfaces. Our core philosophy is to build robust, self-sustaining green energy ecosystems that significantly reduce grid dependencies while lowering the long-term carbon footprint for commercial and domestic infrastructures alike.",
    points: [
      "Integrating IoT-enabled automation modules into core solar setups.",
      "Providing real-time telemetry metrics to track generation and unit consumption.",
      "Delivering dependable industrial-grade clean infrastructure blueprints.",
    ],
  },
  {
    id: "framework",
    title: "System Architecture",
    label: "Core Tech",
    icon: <SettingsSuggestRoundedIcon sx={{ fontSize: 18 }} />,
    image: "http://googleusercontent.com/image_collection/image_retrieval/1521332295649456061_1",
    tagline: "Precision Engineering & Architecture",
    heading: "Optimized High-Performance Hardware Synchronization",
    description: "Every setup deployed under the NGN brand matches premium monocrystalline solar tracking grids with micro-inverter matrix networks to prevent single points of failure. The architecture handles massive electrical surges and converts power outputs efficiently with minimal operational line loss.",
    points: [
      "Advanced multi-tier storage management using smart safety fuses.",
      "Ultra-low internal resistance configurations to minimize thermal generation.",
      "Rigorous structural compliance tested against heavy environmental loads.",
    ],
  },
  {
    id: "quality",
    title: "Quality Assurance",
    label: "Testing Bench",
    icon: <FactCheckRoundedIcon sx={{ fontSize: 18 }} />,
    image: "http://googleusercontent.com/image_collection/image_retrieval/1521332295649456061_2",
    tagline: "Uncompromised Safety Standards",
    heading: "Rigorous Diagnostics for Maximum Operational Lifetime",
    description: "Quality is embedded directly into our deployment workflow. Before commissioning any rooftop or industrial solar frame, our engineering grid performs full electroluminescence diagnostics, insulating resistance testing, and ground-fault circuit mapping to guarantee a long-lasting, stable infrastructure lifespan.",
    points: [
      "100% certified hardware sourcing through verified global manufacturers.",
      "Comprehensive multi-point post-installation commissioning checks.",
      "Continuous performance auditing and predictive maintenance loops.",
    ],
  },
];

const About = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("vision");
  const current = aboutSections.find((s) => s.id === activeSection) || aboutSections[0];

  const sidebarItems = aboutSections.map((s) => ({
    id: s.id,
    label: s.title,
    icon: s.icon,
  }));

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: DS.colors.bg, pb: 10 }}>
      <PageBanner
        title="About NGN Enterprises"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />

      <Container maxWidth={DS.container.maxWidth} sx={{ mt: { xs: 3, md: 4 } }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4, alignItems: "flex-start" }}>
          <SidebarPanel
            title="Corporate Pillars"
            items={sidebarItems}
            activeId={activeSection}
            onSelect={setActiveSection}
          />

          <Box sx={{ flexGrow: 1, width: "100%" }}>
            <Card elevation={0} sx={{ ...DS.card, p: { xs: 3, md: 5 }, "&:hover": { boxShadow: DS.shadows.xs } }}>
              <Grid container spacing={4}>
                <Grid item xs={12} lg={7}>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <ShieldCheckeredIcon sx={{ color: DS.colors.primary, fontSize: 18 }} />
                    <Typography sx={{ ...DS.typography.label, color: DS.colors.primary, fontSize: "0.8rem" }}>
                      {current.label} Overview
                    </Typography>
                  </Stack>

                  <Typography sx={{ ...DS.typography.h5, color: DS.colors.heading, mb: 1 }}>
                    {current.heading}
                  </Typography>
                  <Typography sx={{ ...DS.typography.body, fontWeight: 500, fontStyle: "italic", color: DS.colors.sub, mb: 3 }}>
                    &ldquo;{current.tagline}&rdquo;
                  </Typography>
                  <Typography sx={{ ...DS.typography.body, lineHeight: 1.7, mb: 4 }}>
                    {current.description}
                  </Typography>

                  <Divider sx={{ mb: 4 }} />

                  <Typography sx={{ ...DS.typography.h6, fontFamily: DS.fonts.heading, fontWeight: 700, color: DS.colors.heading, mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                    <EngineeringRoundedIcon sx={{ color: DS.colors.primary, fontSize: 18 }} /> Operational Commitments
                  </Typography>

                  <Stack spacing={2} sx={{ mb: 4 }}>
                    {current.points.map((point, idx) => (
                      <Stack direction="row" spacing={1.5} alignItems="flex-start" key={idx}>
                        <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: DS.colors.primary, mt: 1, flexShrink: 0 }} />
                        <Typography sx={{ ...DS.typography.body, lineHeight: 1.5 }}>{point}</Typography>
                      </Stack>
                    ))}
                  </Stack>

                  <Button variant="contained" disableElevation onClick={() => navigate("/projects")} sx={{ ...DS.button.primary, px: 4, py: 1.2 }}>
                    Download Project Portfolio
                  </Button>
                </Grid>

                <Grid item xs={12} lg={5}>
                  <Box sx={{ width: "100%", height: { xs: 240, sm: 300, lg: "100%" }, minHeight: { lg: 400 }, borderRadius: DS.radii.lg, overflow: "hidden", border: `1px solid ${DS.colors.border}` }}>
                    <Box component="img" src={current.image} alt={current.title} sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
