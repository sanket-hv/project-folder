// src/components/Loader.js
import React from "react";
import { Box, LinearProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        zIndex: 1300,
      }}
    >
      <Box sx={{ width: "50%" }}>
        <LinearProgress />
      </Box>
    </Box>
  );
};

export default Loader;
