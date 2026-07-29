import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DS from "../../../theme/designSystem";

const PageBanner = ({ title, breadcrumbs, py }) => {
  const crumbs = breadcrumbs || [{ label: "Home", href: "/" }];

  return (
    <Box
      sx={{
        ...DS.banner,
        borderBottom: `1px solid ${DS.colors.border}`,
        py: py || { xs: 4, md: 5 },
      }}
    >
      <Container maxWidth={DS.container.maxWidth}>
        <Typography
          variant="h4"
          sx={{
            ...DS.typography.h4,
            color: DS.colors.heading,
            mb: 1,
            fontSize: { xs: "1.3rem", md: "1.5rem" },
          }}
        >
          {title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flexWrap: "wrap" }}>
          {crumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              {i > 0 && (
                <ChevronRightIcon sx={{ fontSize: 16, color: DS.colors.muted }} />
              )}
              {crumb.href ? (
                <Typography
                  component={Link}
                  to={crumb.href}
                  sx={{
                    ...DS.typography.body,
                    color: DS.colors.sub,
                    textDecoration: "none",
                    fontSize: "0.85rem",
                    "&:hover": { color: DS.colors.primary },
                  }}
                >
                  {crumb.label}
                </Typography>
              ) : (
                <Typography
                  sx={{
                    ...DS.typography.body,
                    color: DS.colors.primary,
                    fontWeight: 500,
                    fontSize: "0.85rem",
                  }}
                >
                  {crumb.label}
                </Typography>
              )}
            </React.Fragment>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default PageBanner;
