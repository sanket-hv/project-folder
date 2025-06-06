import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

const Dashboard = () => {
  return (
    <>
      <div>
        <h2>Dashboard</h2>
      </div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "space-between",
        }}
      >
        <Card sx={{ flex: "1 1 calc(33% - 16px)", minWidth: 200 }}>
          <CardContent>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4">1,245</Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: "1 1 calc(33% - 16px)", minWidth: 200 }}>
          <CardContent>
            <Typography variant="h6">Active Projects</Typography>
            <Typography variant="h4">8</Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: "1 1 calc(33% - 16px)", minWidth: 200 }}>
          <CardContent>
            <Typography variant="h6">Total Sales</Typography>
            <Typography variant="h4">₹ 34,567</Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: "1 1 calc(33% - 16px)", minWidth: 200 }}>
          <CardContent>
            <Typography variant="h6">Tasks Completed</Typography>
            <Typography variant="h4">125</Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: "1 1 calc(33% - 16px)", minWidth: 200 }}>
          <CardContent>
            <Typography variant="h6">Pending Notifications</Typography>
            <Typography variant="h4">3</Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Dashboard;
