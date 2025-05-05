import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

export default function AppRouter() {
  return (
    <Router basename="/rapidshare">
      <ScrollToTop />
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
    </Router>
  );
}
