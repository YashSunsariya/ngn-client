import React from "react";
import { Box, Typography, Avatar, Stack } from "@mui/material";
import DS from "../../../theme/designSystem";

const SidebarPanel = ({ title, items, activeId, onSelect, renderItem }) => {
  return (
    <Box sx={DS.sidebar}>
      <Typography
        sx={{
          fontFamily: DS.fonts.heading,
          fontSize: "0.9rem",
          fontWeight: 700,
          color: DS.colors.heading,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          mb: 2,
          pl: 1,
        }}
      >
        {title}
      </Typography>

      <Stack spacing={1}>
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <Box
              key={item.id}
              onClick={() => onSelect(item.id)}
              sx={
                isActive
                  ? DS.sidebarItem.active(DS.colors.primary)
                  : DS.sidebarItem.inactive
              }
            >
              {item.icon && (
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: isActive ? DS.colors.primary : "#E2E8F0",
                    color: isActive ? "#FFF" : DS.colors.sub,
                  }}
                >
                  {item.icon}
                </Avatar>
              )}
              <Box>
                <Typography
                  sx={{
                    fontFamily: DS.fonts.body,
                    fontWeight: isActive ? 600 : 500,
                    fontSize: "0.9rem",
                  }}
                >
                  {item.label}
                </Typography>
                {item.sub && (
                  <Typography sx={{ fontSize: "0.75rem", color: DS.colors.sub }}>
                    {item.sub}
                  </Typography>
                )}
              </Box>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default SidebarPanel;
