import React, { useState } from "react";
import {
  Box, Typography, Button, Stack, Container, Grid, Card, Divider, List, ListItem, ListItemIcon, ListItemText,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import EngineeringRoundedIcon from "@mui/icons-material/EngineeringRounded";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import CleanHandsRoundedIcon from "@mui/icons-material/CleaningServicesRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import DS from "../../../theme/designSystem";
import PageBanner from "../ui/PageBanner";
import SidebarPanel from "../ui/SidebarPanel";

const servicesData = [
  {
    id: "consultation",
    title: "Free Solar Consultation & Feasibility Study",
    icon: <EngineeringRoundedIcon sx={{ fontSize: 18 }} />,
    label: "Solar Assessment",
    image: "http://googleusercontent.com/image_collection/image_retrieval/2047218982146198505_0",
    tagline: "Custom Engineering From Day One",
    description: "Every structure catches light differently. Our experts complete a thorough 3D structural mapping and solar analysis to evaluate your roof health, shading patterns, and historical energy bills.",
    deliverables: [
      "Advanced drone-assisted shade and roof architecture report",
      "Tailored 12-month savings and ROI financial projection model",
      "Transparent engineering proposal with zero hidden costs",
    ],
  },
  {
    id: "residential",
    title: "End-to-End Residential Rooftop Installation",
    icon: <HomeWorkRoundedIcon sx={{ fontSize: 18 }} />,
    label: "Residential Setup",
    image: "http://googleusercontent.com/image_collection/image_retrieval/15237076828028304096_0",
    tagline: "Turnkey Clean Power Solutions for Families",
    description: "Transition your household to a modern energy ecosystem stress-free. Our team manages your full custom blueprint layout, internal electrical wiring, and direct utility grid connections.",
    deliverables: [
      "Tier-1 ultra-high efficiency monocrystalline panel arrays",
      "Complete management of local building permits and DISCOM approvals",
      "Full mobile app pairing for live system production tracking",
    ],
  },
  {
    id: "commercial",
    title: "Commercial & Industrial Solar Infrastructure",
    icon: <BusinessRoundedIcon sx={{ fontSize: 18 }} />,
    label: "Commercial Infrastructure",
    image: "http://googleusercontent.com/image_collection/image_retrieval/17229224383976835416_0",
    tagline: "Slash High Operational Demand Charges",
    description: "Convert unutilized warehouse, retail, or industrial factory roof space into a predictable cost-saving center. Engineered for heavy industrial loads and high-capacity electrical matching.",
    deliverables: [
      "Custom load profile alignment to lower steep peak demand charges",
      "Accelerated depreciation & corporate green tax incentive filing assistance",
      "Robust utility infrastructure with advanced grid synchronization",
    ],
  },
  {
    id: "maintenance",
    title: "Proactive Panel Maintenance & System Cleaning",
    icon: <CleanHandsRoundedIcon sx={{ fontSize: 18 }} />,
    label: "Maintenance Care",
    image: "http://googleusercontent.com/image_collection/image_retrieval/6915844287165795138_0",
    tagline: "Protect and Maximize Your Clean Energy Generation",
    description: "Environmental dust, airborne pollen, and rooftop debris can degrade total power output by over 20%. Keep your system running at maximum peak capacity with scheduled cleaning plans.",
    deliverables: [
      "Deionized chemical-free panel washing to prevent scaling and hotspots",
      "Comprehensive structural torque checkups and inverter thermal imagery scans",
      "Rapid warranty support adjustments and live cell optimization tuning",
    ],
  },
];

const Services = () => {
  const [activeTab, setActiveTab] = useState("consultation");
  const selectedService = servicesData.find((s) => s.id === activeTab) || servicesData[0];

  const sidebarItems = servicesData.map((s) => ({
    id: s.id,
    label: s.label,
    icon: s.icon,
  }));

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: DS.colors.bg, pb: 10 }}>
      <PageBanner
        title="Our Engineering Services"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <Container maxWidth={DS.container.maxWidth} sx={{ mt: { xs: 3, md: 4 } }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4, alignItems: "flex-start" }}>
          <SidebarPanel
            title="Service Catalog"
            items={sidebarItems}
            activeId={activeTab}
            onSelect={setActiveTab}
          />

          <Box sx={{ flexGrow: 1, width: "100%" }}>
            <Card elevation={0} sx={{ ...DS.card, p: { xs: 3, md: 5 }, "&:hover": { boxShadow: DS.shadows.xs } }}>
              <Grid container spacing={4}>
                <Grid item xs={12} lg={7}>
                  <Typography sx={{ ...DS.typography.label, color: DS.colors.primary, fontSize: "0.8rem", mb: 1 }}>
                    {selectedService.tagline}
                  </Typography>
                  <Typography sx={{ ...DS.typography.h5, color: DS.colors.heading, mb: 2.5 }}>
                    {selectedService.title}
                  </Typography>
                  <Typography sx={{ ...DS.typography.body, lineHeight: 1.7, mb: 4 }}>
                    {selectedService.description}
                  </Typography>

                  <Divider sx={{ mb: 3 }} />

                  <Typography sx={{ ...DS.typography.h6, fontFamily: DS.fonts.heading, fontWeight: 700, color: DS.colors.heading, mb: 2 }}>
                    What We Deliver:
                  </Typography>

                  <List disablePadding sx={{ mb: 4 }}>
                    {selectedService.deliverables.map((item, index) => (
                      <ListItem key={index} disableGutters sx={{ alignItems: "flex-start", py: 0.75 }}>
                        <ListItemIcon sx={{ minWidth: 28, mt: 0.2 }}>
                          <CheckCircleRoundedIcon sx={{ color: DS.colors.primary, fontSize: 18 }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={item}
                          primaryTypographyProps={{
                            sx: { ...DS.typography.body, lineHeight: 1.5 },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Button variant="contained" disableElevation endIcon={<ArrowForwardRoundedIcon />} sx={{ ...DS.button.primary, px: 4, py: 1.2 }}>
                    Book Service Appointment
                  </Button>
                </Grid>

                <Grid item xs={12} lg={5}>
                  <Box sx={{ width: "100%", height: { xs: 260, sm: 340, lg: "100%" }, minHeight: { lg: 380 }, borderRadius: DS.radii.lg, overflow: "hidden", border: `1px solid ${DS.colors.border}` }}>
                    <Box component="img" src={selectedService.image} alt={selectedService.title} sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
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

export default Services;
