import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";

const features = 
  [
    {
      icon: "⚡",
      title: "National Energy Oversight",
      description:
        "Our platform replaces the outdated Excel-based reporting system with a modern digitalized solution. Instead of manually collecting and consolidating excel files from each central, data is now accessible and managed efficiently across all Tunisian centrals in real time.",
    },
    {
      icon: "📊",
      title: "Automated Data Consolidation",
      description:
        "No more manual file merging. The system automatically consolidates energy data from every central. Groupement staff can instantly view aggregated reports for their supervised centrals,  Direction has full nationwide visibility—all generated dynamically based on selected filters.",
    },
    {
      icon: "🛠️",
      title: "Tools for Every Role",
      description:
        "Each user gets a tailored experience. From machine operators to centrals chiefs to supervisors and directors, every role has access to the specific tools and dashboards needed for their daily operations and decision-making.",
    },
    {
      icon: "🔐",
      title: "Secure Access and Activity Tracking",
      description:
        "Only authorized STEG personnel can log in. User roles define access to reports, dashboards, and actions. Every operation performed on the platform is securely logged and tracked to ensure transparency and accountability.",
    },
    {
      icon: "🧩",
      title: "Error Correction and Dynamic Reporting",
      description:
        "If a central submits incorrect data, central employee can easily correct it without restarting the entire process. Reports automatically update based on the latest entries, ensuring accuracy and eliminating the need for manual re-consolidation.",
    },
  ]  
;

const fadeInVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      type: "spring",
    },
  }),
};

const Home = () => {
  return (
    <Box sx={{ py: 8, px: { xs: 2, md: 6 }, backgroundColor: "#f9fafb" }}>
      <Grid container spacing={4} maxWidth="lg" mx="auto">
        <Grid item xs={12} md={4}>
          <motion.div
            variants={fadeInVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Typography
              variant="overline"
              sx={{ color: "primary.main", fontWeight: 500 }}
            >
              Welcome to STEG
            </Typography>
            <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 1 }}>
              Empowering Tunisia through data-driven electricity management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              This platform connects the Direction, Groupements, and Centrales
              to streamline energy production and reporting.
            </Typography>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <motion.div
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInVariant}
                  whileHover={{ scale: 1.03 }}
                >
                  <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                    <Typography variant="h3" component="div" gutterBottom>
                      {feature.icon}
                    </Typography>
                    <Typography
                      variant="h6"
                      component="h3"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
