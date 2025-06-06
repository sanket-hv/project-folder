// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Typography, Paper } from "@mui/material";
import { isAuthenticated, login, vendorID } from "../../utils/auth";
import { logIn } from "../../backedHelper/helper/login";
import { CustomTextField } from "../../utils/textfiled";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  if (isAuthenticated()) {
    navigate("/dashboard");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await logIn(formData);
      const authToken = res?.payload?.token;
      const vendorId = res?.payload?.vendorId;

      login(authToken);
      vendorID(vendorId);
      toast.success("Login successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Invalid user");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Container maxWidth="xs">
          <Paper elevation={3} sx={{ padding: 4, borderRadius: "12px" }}>
            <Typography variant="h4" gutterBottom style={{ color: "#263238" }}>
              Log<span style={{ color: "rgb(0, 99, 109)" }}>in</span>
            </Typography>
            <form onSubmit={handleLogin}>
              <CustomTextField
                label="Username"
                name="username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <CustomTextField
                label="Password"
                name="password"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  mt: 2,
                  backgroundColor: "#263238",
                  borderRadius: "12px",
                  p: 1,
                  "&:hover": {
                    backgroundColor: "rgb(0, 99, 109)",
                  },
                }}
              >
                Login
              </Button>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default Login;
