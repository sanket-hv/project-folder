import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  Button,
} from "@mui/material";
import { Dashboard } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, keyframes } from "@mui/system";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import InfoIcon from "@mui/icons-material/Info";
import PersonIcon from "@mui/icons-material/Person";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { logout } from "../utils/auth";
import { toast } from "react-toastify";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getLinkStyle = (path) => {
    const isActive = location.pathname === path;

    return {
      backgroundColor: isActive ? "rgb(0 99 109)" : "transparent",
      color: isActive ? "#fff" : "#fff",
      borderRadius: isActive ? "8px" : "0",
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: isActive ? "rgb(0 99 109)" : "",
        color: "#fff",
        borderRadius: "14px",
        transform: "scale(1.05)",
      },
    };
  };

  const slideInAnimation = keyframes`
    0% { transform: translateX(-100%); }
    100% { transform: translateX(0); }
  `;

  return (
    <Drawer
      sx={{
        width: 280,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 280,
          boxSizing: "border-box",
          backgroundColor: "#263238",
          border: "none",
          color: "#fff",
          animation: `${slideInAnimation} 0.5s ease-out`,
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <div
        style={{
          padding: "20px",
          textAlign: "center",
          animation: "fadeIn 1s ease",
        }}
      >
        <h2>My App</h2>
      </div>
      <Divider variant="middle" sx={{ backgroundColor: "white" }} />
      <List sx={{ p: 2 }}>
        <ListItem
          button
          component={Link}
          to="/dashboard"
          sx={getLinkStyle("/dashboard")}
        >
          <ListItemIcon
            sx={{ mr: 2, color: "inherit", transition: "all 0.3s ease" }}
          >
            <Dashboard
              sx={{
                transition: "all 0.3s ease",
                "&:hover": { transform: "scale(1.2)" },
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Dashboard" sx={{ color: "inherit" }} />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/category"
          sx={{ ...getLinkStyle("/category"), mt: 1.2 }}
        >
          <ListItemIcon
            sx={{ mr: 2, color: "inherit", transition: "all 0.3s ease" }}
          >
            <CategoryIcon
              sx={{
                transition: "all 0.3s ease",
                "&:hover": { transform: "scale(1.2)" },
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Category" sx={{ color: "inherit" }} />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/product"
          sx={{ ...getLinkStyle("/product"), mt: 1.2 }}
        >
          <ListItemIcon
            sx={{ mr: 2, color: "inherit", transition: "all 0.3s ease" }}
          >
            <InventoryIcon
              sx={{
                transition: "all 0.3s ease",
                "&:hover": { transform: "scale(1.2)" },
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Product" sx={{ color: "inherit" }} />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/inquiry"
          sx={{ ...getLinkStyle("/inquiry"), mt: 1.2 }}
        >
          <ListItemIcon
            sx={{ mr: 2, color: "inherit", transition: "all 0.3s ease" }}
          >
            <InfoIcon
              sx={{
                transition: "all 0.3s ease",
                "&:hover": { transform: "scale(1.2)" },
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Inquiry" sx={{ color: "inherit" }} />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/profile"
          sx={{ ...getLinkStyle("/profile"), mt: 1.2 }}
        >
          <ListItemIcon
            sx={{ mr: 2, color: "inherit", transition: "all 0.3s ease" }}
          >
            <PersonIcon
              sx={{
                transition: "all 0.3s ease",
                "&:hover": { transform: "scale(1.2)" },
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Profile" sx={{ color: "inherit" }} />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/setting"
          sx={{ ...getLinkStyle("/setting"), mt: 1.2 }}
        >
          <ListItemIcon
            sx={{ mr: 2, color: "inherit", transition: "all 0.3s ease" }}
          >
            <SettingsSuggestIcon
              sx={{
                transition: "all 0.3s ease",
                "&:hover": { transform: "scale(1.2)" },
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Setting" sx={{ color: "inherit" }} />
        </ListItem>
      </List>

      <Box
        sx={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          padding: "10px 0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={() => {
            logout();
            localStorage.clear();
            toast.success("Logout successfully!");
            navigate("/login");
          }}
          sx={{
            borderRadius: "12px",
            backgroundColor: "rgb(0, 99, 109)",
            width: "250px",
            "&:hover": {
              backgroundColor: "white",
              color: "black",
            },
          }}
        >
          Log Out
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
