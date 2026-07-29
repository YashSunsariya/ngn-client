import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Typography, Button, Stack, Container, Grid, Card, Chip,
} from "@mui/material";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import DS from "../../../theme/designSystem";
import PageBanner from "../ui/PageBanner";
import SidebarPanel from "../ui/SidebarPanel";

const projectCategories = [
  { id: "all", label: "All Case Studies" },
  { id: "commercial", label: "Commercial Hubs" },
  { id: "residential", label: "Residential Systems" },
  { id: "offgrid", label: "Off-Grid & Microgrids" },
];

const portfolioData = [
  {
    id: 1, catId: "commercial",
    title: "Apex Logistics Hub Rooftop Array",
    location: "Indore, MP", capacity: "450 kWp", timeline: "Completed 2025",
    image: "http://googleusercontent.com/image_collection/image_retrieval/11797157166095193171_0",
    description: "Full turnkey deployment over a massive 45,000 sq. ft. commercial warehouse facility. Engineered with multi-string structural setups to balance heavy central air conditioning loads and lower high corporate peak tariff costs.",
  },
  {
    id: 2, catId: "residential",
    title: "The Green Estate Modern Residential Grid",
    location: "Bhopal, MP", capacity: "15 kWp", timeline: "Completed 2026",
    image: "http://googleusercontent.com/image_collection/image_retrieval/8967562160480268966_0",
    description: "An elegant net-metered monocrystalline structure integrated onto an architectural villa design. Paired with a sleek smart lithium battery bank to keep critical automated systems uninterrupted through municipal power fluctuations.",
  },
  {
    id: 3, catId: "offgrid",
    title: "Remote Agri-Farm Autonomous Microgrid",
    location: "Dewas District, MP", capacity: "35 kWp", timeline: "Completed 2025",
    image: "http://googleusercontent.com/image_collection/image_retrieval/2316303680923986999_0",
    description: "A complete stand-alone remote solar plant engineered with advanced charge controllers to run high-torque water pumping machinery and complex automated cold-storage facilities off the primary electric grid.",
  },
  {
    id: 4, catId: "commercial",
    title: "Textile Mill Industrial Captive Power Plant",
    location: "Surat, GJ", capacity: "1.2 MWp", timeline: "Completed 2026",
    image: "http://googleusercontent.com/image_collection/image_retrieval/3210814084104712544_0",
    description: "A heavy industrial grid-tied framework designed to dramatically lower high operational production expenses. Built using high-durability ground-mount structures equipped with automated dust-shedding tilting mounts.",
  },
];

const Projects = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = activeCategory === "all"
    ? portfolioData
    : portfolioData.filter((p) => p.catId === activeCategory);

  const sidebarItems = projectCategories.map((c) => ({
    id: c.id,
    label: c.label,
  }));

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: DS.colors.bg, pb: 10 }}>
      <PageBanner
        title="Our Completed Projects"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
      />

      <Container maxWidth={DS.container.maxWidth} sx={{ mt: { xs: 3, md: 4 } }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4, alignItems: "flex-start" }}>
          <SidebarPanel
            title="Filter Portfolio"
            items={sidebarItems}
            activeId={activeCategory}
            onSelect={setActiveCategory}
          />

          <Box sx={{ flexGrow: 1, width: "100%" }}>
            <Box sx={{ bgcolor: DS.colors.white, p: 2, borderRadius: DS.radii.lg, border: `1px solid ${DS.colors.border}`, mb: 3 }}>
              <Typography sx={{ ...DS.typography.body, fontWeight: 500 }}>
                Showing {filteredProjects.length} Engineering Case Studies
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {filteredProjects.map((project) => (
                <Grid item xs={12} sm={6} key={project.id}>
                  <Card elevation={0} sx={{ ...DS.card, display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", "&:hover": { boxShadow: DS.shadows.md } }}>
                    <Box sx={{ width: "100%", height: 220, overflow: "hidden" }}>
                      <Box component="img" src={project.image} alt={project.title} sx={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s ease", "&:hover": { transform: "scale(1.03)" } }} />
                    </Box>

                    <Box sx={{ p: 3, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                      <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} sx={{ mb: 2 }}>
                        <Chip
                          icon={<BoltRoundedIcon sx={{ fontSize: "14px !important", color: `${DS.colors.primary} !important` }} />}
                          label={project.capacity}
                          size="small"
                          sx={{ bgcolor: DS.colors.primaryLight, color: DS.colors.primary, fontWeight: 600, borderRadius: DS.radii.sm, fontFamily: DS.fonts.body, fontSize: "0.75rem" }}
                        />
                        <Chip
                          icon={<LocationOnRoundedIcon sx={{ fontSize: "14px !important" }} />}
                          label={project.location}
                          size="small"
                          sx={{ bgcolor: DS.colors.borderLight, color: DS.colors.heading, fontWeight: 500, borderRadius: DS.radii.sm, fontFamily: DS.fonts.body, fontSize: "0.75rem" }}
                        />
                        <Chip
                          icon={<CalendarMonthRoundedIcon sx={{ fontSize: "13px !important" }} />}
                          label={project.timeline}
                          size="small"
                          sx={{ bgcolor: DS.colors.borderLight, color: DS.colors.sub, fontWeight: 500, borderRadius: DS.radii.sm, fontFamily: DS.fonts.body, fontSize: "0.75rem" }}
                        />
                      </Stack>

                      <Typography sx={{ ...DS.typography.h6, fontFamily: DS.fonts.heading, fontWeight: 700, color: DS.colors.heading, mb: 1.5, fontSize: "1.05rem" }}>
                        {project.title}
                      </Typography>
                      <Typography sx={{ ...DS.typography.body, lineHeight: 1.6, mb: 3, flexGrow: 1 }}>
                        {project.description}
                      </Typography>

                      <Button variant="outlined" fullWidth endIcon={<ArrowOutwardRoundedIcon sx={{ fontSize: 14 }} />} onClick={() => navigate("/contact")} sx={{
                        ...DS.button.outlined,
                        color: DS.colors.primary,
                        borderColor: DS.colors.border,
                        py: 1,
                        "&:hover": { bgcolor: DS.colors.primaryTint, borderColor: DS.colors.primary },
                      }}>
                        View System Specs
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Projects;
