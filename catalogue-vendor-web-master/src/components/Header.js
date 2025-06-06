import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { keyframes } from "@mui/system";

const slideInAnimation = keyframes`
  0% { transform: translateY(-100%); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

const Header = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#263238",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        animation: `${slideInAnimation} 0.5s ease-out`,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}
        >
          My Application
        </Typography>

        {/* <Button
          color="inherit"
          sx={{
            "&:hover": {
              backgroundColor: "rgb(0 99 109)",
              color: "#fff",
              transform: "scale(1.05)",
              transition: "all 0.3s ease",
            },
          }}
        >
          Login
        </Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
