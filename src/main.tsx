import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

import Dashboard from "./pages/Dashboard";
import UploadPage from "./pages/UploadPage";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/SignUp";
import ForecastingPage from "./pages/Forecasting";
import ReportsPage from "./pages/Reports";
import FinancialsPage from "./pages/Financials";
import SupportPage from "./pages/Support";
import SettingsPage from "./pages/Settings";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/forecasting" element={<ForecastingPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/financials" element={<FinancialsPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
