import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./components/providers";
import AppLayout from "./components/app-layout";
import LandingPage from "./pages/landing";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import DashboardPage from "./pages/dashboard";
import MatchPage from "./pages/match";
import DuelPage from "./pages/duel";
import MentorPage from "./pages/mentor";
import CertificatesPage from "./pages/certificates";
import SettingsPage from "./pages/settings";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected app routes */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/match" element={<MatchPage />} />
        <Route path="/duel" element={<DuelPage />} />
        <Route path="/mentor" element={<MentorPage />} />
        <Route path="/certificates" element={<CertificatesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}
