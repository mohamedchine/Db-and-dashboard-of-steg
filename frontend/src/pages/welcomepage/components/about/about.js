import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import {
  UsersIcon,
  BoltIcon,
  ShareIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const About = () => {
  const sections = [
    {
      icon: <UsersIcon style={{ height: 48, width: 48, color: "#2563EB", marginBottom: 16 }} />,
      title: "Our Mission",
      text: "To revolutionize energy management in Tunisia by fostering seamless collaboration and data-driven optimization across Direction, Groupements, and Centrales. We aim to build a connected energy ecosystem.",
    },
    {
      icon: <BoltIcon style={{ height: 48, width: 48, color: "#FACC15", marginBottom: 16 }} />,
      title: "The Challenge We Address",
      text: "Traditional energy management often faces hurdles like fragmented data, communication silos, and delayed insights. This can hinder optimal production, resource allocation, and responsiveness to the dynamic energy landscape.",
    },
    {
      icon: <ShareIcon style={{ height: 48, width: 48, color: "#22C55E", marginBottom: 16 }} />,
      title: "Our Innovative Solution",
      text: "Our platform provides a centralized, real-time hub that connects all key stakeholders. It enables efficient data collection, secure sharing, and powerful analytics, empowering informed decision-making at every level.",
    },
    {
      icon: <ChartBarIcon style={{ height: 48, width: 48, color: "#A855F7", marginBottom: 16 }} />,
      title: "Key Benefits & Impact",
      text: "By leveraging our solution, Tunisia can achieve enhanced operational efficiency, improved resource management, proactive incident response, and a significant stride towards a more sustainable and resilient energy future.",
    },
  ];

  return (
    <Box
      sx={{
        py: 10,
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #f8fafc, #e2e8f0)",
      }}
    >
      <Box maxWidth="md" mx="auto" px={3}>
        <Typography variant="h3" fontWeight="bold" textAlign="center" mb={3} color="text.primary">
          About Our Platform
        </Typography>
        <Typography variant="h6" color="text.secondary" textAlign="center" mb={6}>
          We are dedicated to transforming energy management in Tunisia. Our platform connects the Direction, Groupements, and Centrales, enabling seamless communication and data sharing for optimized energy production.
        </Typography>
      </Box>

      <Box maxWidth="lg" mx="auto" px={3}>
        <Grid container spacing={4}>
          {sections.map((section, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <Paper
                elevation={4}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  border: "1px solid #E2E8F0",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 8,
                    borderColor: "#60A5FA",
                  },
                }}
              >
                {section.icon}
                <Typography variant="h6" fontWeight="medium" gutterBottom>
                  {section.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {section.text}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box maxWidth="sm" mx="auto" mt={10} px={3}>
        <Typography variant="h6" color="text.secondary" textAlign="center">
          Join us in building a smarter, more efficient, and sustainable energy future for Tunisia.
        </Typography>
      </Box>
    </Box>
  );
};

export default About;
