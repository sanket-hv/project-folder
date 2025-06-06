// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/Product";
import Category from "./pages/Category";
import PrivateRoute from "./components/PrivateRoute";
import theme from "./theme";
import Login from "./pages/loginSignUp/Login";
import SnackbarService from "./utils/SnackbarService";
import Inquiry from "./pages/Inquiry";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthRedirect from "./pages/loginSignUp/AuthRedirect";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <SnackbarService />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<AuthRedirect />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/*"
            element={
              <div style={{ display: "flex" }}>
                <Sidebar />
                <div style={{ flexGrow: 1 }}>
                  <Header />
                  <div style={{ padding: "40px" }}>
                    <Routes>
                      <Route
                        path="/dashboard"
                        element={
                          <PrivateRoute>
                            <Dashboard />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/product"
                        element={
                          <PrivateRoute>
                            <Product />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/category"
                        element={
                          <PrivateRoute>
                            <Category />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/inquiry"
                        element={
                          <PrivateRoute>
                            <Inquiry />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/Profile"
                        element={
                          <PrivateRoute>
                            <Profile />
                          </PrivateRoute>
                        }
                      />

                      <Route
                        path="/setting"
                        element={
                          <PrivateRoute>
                            <Setting />
                          </PrivateRoute>
                        }
                      />
                    </Routes>
                  </div>
                </div>
              </div>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
