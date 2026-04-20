import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./AppRoutes";
import "./App.css";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Header />
      <AppRoutes />
      <Footer />
    </Router>
  </ThemeProvider>
);

export default App;
