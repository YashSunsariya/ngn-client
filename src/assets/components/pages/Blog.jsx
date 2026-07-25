import React, { useState } from "react";
import {
  Box, Typography, Container, Grid, Card, Divider, Stack, Button, Avatar,
} from "@mui/material";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import DynamicFeedRoundedIcon from "@mui/icons-material/DynamicFeedRounded";
import DS from "../../../theme/designSystem";
import PageBanner from "../ui/PageBanner";
import SidebarPanel from "../ui/SidebarPanel";

const blogPosts = [
  {
    id: "telemetry",
    title: "IoT Solar Telemetry",
    shortTitle: "Smart IoT Telemetry",
    date: "June 14, 2026",
    author: "NGN Engineering",
    image: "http://googleusercontent.com/image_collection/image_retrieval/8986959634306722869_0",
    heading: "Building Web Interfaces for Real-Time Solar Grid Monitoring",
    summary: "Modern solar arrays require precise telemetry data pipelines to manage electrical strain. By integrating light weight automation scripts and clean HTML/CSS dashboards, plant operators can monitor output yields, flag cell degradation, and optimize storage parameters instantaneously.",
    takeaways: [
      "Real-time monitoring mitigates overhead costs by identifying micro-faults instantly.",
      "Custom responsive layouts ensure field workers can track systems across mobile breakpoints.",
      "Optimizing data packet rates keeps cloud infrastructure lightweight and cost-effective.",
    ],
  },
  {
    id: "storage",
    title: "Storage Architectures",
    shortTitle: "Storage Architecture",
    date: "May 28, 2026",
    author: "Technical Operations",
    image: "http://googleusercontent.com/image_collection/image_retrieval/8986959634306722869_1",
    heading: "Information Storage & Distribution Over Private Grids",
    summary: "Managing structural power backups requires looking at load balancing similarly to structured computer science data paradigms. Storing backup electricity efficiently relies heavily on optimizing physical network arrays to prevent active resistance bottleneck cross-talk.",
    takeaways: [
      "Paralleled storage cells act like multi-channel arrays to boost throughput capacity.",
      "Smart fail-safes function as logical loops to reroute current when voltage drops happen.",
      "Thermal mapping strategies keep battery cells balanced over intensive deployment cycles.",
    ],
  },
  {
    id: "efficiency",
    title: "Monocrystalline Yields",
    shortTitle: "Optimizing PV Yields",
    date: "April 10, 2026",
    author: "Hardware Desk",
    image: "http://googleusercontent.com/image_collection/image_retrieval/8986959634306722869_2",
    heading: "Maximizing Generation Efficiency via Passivated Emitter Cell Sets",
    summary: "Monocrystalline PERC technology drastically increases photon absorption rates compared to legacy cells. Implementing tracking configurations ensures consistent angles against daylight vectors, lifting net performance indicators across commercial footprints.",
    takeaways: [
      "Passivated backing layers reflect unabsorbed photons back for a secondary generation run.",
      "Anti-PID coatings defend hardware from environmental degradation for over 25 years.",
      "Strategic frame positioning handles high ambient temperatures without drop-offs.",
    ],
  },
];

const Blog = () => {
  const [activePost, setActivePost] = useState("telemetry");
  const selectedPost = blogPosts.find((p) => p.id === activePost) || blogPosts[0];

  const sidebarItems = blogPosts.map((p) => ({
    id: p.id,
    label: p.shortTitle,
    icon: <ArticleRoundedIcon sx={{ fontSize: 18 }} />,
  }));

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: DS.colors.bg, pb: 10 }}>
      <PageBanner
        title="Technical Insights Blog"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]}
      />

      <Container maxWidth={DS.container.maxWidth} sx={{ mt: { xs: 3, md: 4 } }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4, alignItems: "flex-start" }}>
          <SidebarPanel
            title="Recent Documentation"
            items={sidebarItems}
            activeId={activePost}
            onSelect={setActivePost}
          />

          <Box sx={{ flexGrow: 1, width: "100%" }}>
            <Card elevation={0} sx={{ ...DS.card, p: { xs: 3, md: 5 }, "&:hover": { boxShadow: DS.shadows.xs } }}>
              <Grid container spacing={4}>
                <Grid item xs={12} lg={7}>
                  <Stack direction="row" spacing={3} sx={{ mb: 2 }} flexWrap="wrap" useFlexGap>
                    <Stack direction="row" spacing={0.75} alignItems="center">
                      <CalendarTodayRoundedIcon sx={{ color: DS.colors.primary, fontSize: 16 }} />
                      <Typography sx={{ ...DS.typography.caption, fontSize: "0.82rem" }}>{selectedPost.date}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.75} alignItems="center">
                      <AccountCircleRoundedIcon sx={{ color: DS.colors.primary, fontSize: 16 }} />
                      <Typography sx={{ ...DS.typography.caption, fontSize: "0.82rem" }}>By {selectedPost.author}</Typography>
                    </Stack>
                  </Stack>

                  <Typography sx={{ ...DS.typography.h5, color: DS.colors.heading, mb: 3 }}>
                    {selectedPost.heading}
                  </Typography>
                  <Typography sx={{ ...DS.typography.body, lineHeight: 1.7, mb: 4 }}>
                    {selectedPost.summary}
                  </Typography>

                  <Divider sx={{ mb: 4 }} />

                  <Typography sx={{ ...DS.typography.h6, fontFamily: DS.fonts.heading, fontWeight: 700, color: DS.colors.heading, mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                    <MenuBookRoundedIcon sx={{ color: DS.colors.primary, fontSize: 18 }} /> Core Architecture Takeaways
                  </Typography>

                  <Stack spacing={2} sx={{ mb: 4 }}>
                    {selectedPost.takeaways.map((takeaway, index) => (
                      <Stack direction="row" spacing={1.5} alignItems="flex-start" key={index}>
                        <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: DS.colors.primary, mt: 1, flexShrink: 0 }} />
                        <Typography sx={{ ...DS.typography.body, lineHeight: 1.5 }}>{takeaway}</Typography>
                      </Stack>
                    ))}
                  </Stack>

                  <Button variant="contained" disableElevation endIcon={<DynamicFeedRoundedIcon sx={{ fontSize: 16 }} />} sx={{ ...DS.button.primary, px: 3.5, py: 1.1 }}>
                    Read Full Documentation
                  </Button>
                </Grid>

                <Grid item xs={12} lg={5}>
                  <Box sx={{ width: "100%", height: { xs: 240, sm: 300, lg: "100%" }, minHeight: { lg: 380 }, borderRadius: DS.radii.lg, overflow: "hidden", border: `1px solid ${DS.colors.border}` }}>
                    <Box component="img" src={selectedPost.image} alt={selectedPost.title} sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
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

export default Blog;
