import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";

const features = [
  {
    icon: "⚡",
    title: "National Energy Oversight",
    description:
      "This platform enables STEG to monitor and analyze electricity production across all centrales in Tunisia.",
  },
  {
    icon: "📊",
    title: "Data-Driven Decisions",
    description:
      "Centralized reporting and dashboards allow teams to make informed operational and strategic decisions.",
  },
  {
    icon: "🛠️",
    title: "Tools for Every Role",
    description:
      "From machine operators to supervisors, each team member gets tailored tools based on their responsibilities.",
  },
  {
    icon: "🔐",
    title: "Secure Access",
    description:
      "Only authorized STEG personnel may log in. Roles define access to reporting, validation, and dashboards.",
  },
];

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
