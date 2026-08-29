import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

import Dashboard from "../pages/Dashboard/Dashboard";

import SalesPrediction from "../pages/SalesPrediction/SalesPrediction";
import FraudDetection from "../pages/FraudDetection/FraudDetection";
import CustomerAnalytics from "../pages/CustomerAnalytics/CustomerAnalytics";
import SentimentAnalysis from "../pages/SentimentAnalysis/SentimentAnalysis";
import Reports from "../pages/Reports/Reports";
import Settings from "../pages/Settings/Settings";

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/sales-prediction"
          element={<SalesPrediction />}
        />

        <Route
          path="/fraud-detection"
          element={<FraudDetection />}
        />

        <Route
          path="/customer-analytics"
          element={<CustomerAnalytics />}
        />

        <Route
          path="/sentiment-analysis"
          element={<SentimentAnalysis />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;