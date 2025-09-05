import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import UserLayout from "../layouts/UserLayout";
import Dashboard from "../pages/Dashboard";
import PrivacyPolicy from "../pages/CookiePolicy";
import TermsAndConditions from "../pages/TermsAndConditions";
import ScrollToTop from "../components/ScrollToTop";
import ForgotUsername from "../pages/ForgotUsername";
import CookiePopup from "../components/CookiePopup";
import CookiePolicy from "../pages/CookiePolicy";
import { useAuth } from "../utils/idb";
import { useEffect } from "react";

function AutoLoginWrapper({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const uname = params.get("uname");

    if (uname) {
      // Call login API with uname
      fetch("https://rapidcollaborate.com/rapidshare/api/Api/loginn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: uname }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status && data.user) {
            login(data.user); // Store in IDB
            navigate("/", { replace: true });
          } else {
            console.error("Invalid uname or user not found.");
          }
        })
        .catch((err) => {
          console.error("Auto-login error:", err);
        });
    }
  }, [location.search, login, navigate]);

  return children;
}

export default function AppRouter() {
  return (
    <Router > //basename="/rapidshare"
      <ScrollToTop />
      <AutoLoginWrapper>
      <Routes>
        {/* Public Restaurant Routes (NO layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-username" element={<ForgotUsername />} />

        <Route element={<PrivateRoute />}>
          <Route element={<UserLayout />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Route>
        
      </Routes>
      </AutoLoginWrapper>
    </Router>
  );
}
