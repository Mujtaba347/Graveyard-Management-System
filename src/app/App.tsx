import { useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { SignUpPage } from "./components/SignUpPage";
import { ForgotPasswordPage } from "./components/ForgotPasswordPage";
import { Dashboard } from "./components/Dashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import { AdminUserManagement } from "./components/AdminUserManagement";
import { BookGravePlot } from "./components/BookGravePlot";
import { GraveyardMap } from "./components/GraveyardMap";
import { GenerateReport } from "./components/GenerateReport";
import { Notifications } from "./components/Notifications";
import { SearchGravePage } from "./components/FamilyPortal";
import { BookingRequests } from "./components/BookingRequests";
import { GraveRecordManagement } from "./components/GraveRecordManagement";
import { toast } from "sonner";
import { Toaster } from "./components/ui/sonner";

type Page = "dashboard" | "manage-users" | "book-plot" | "map" | "reports" | "notifications" | "family-portal" | "search-grave" | "manage-graves" | "booking-requests";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState<"user" | "admin">("user");
  const [showSignUp, setShowSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");



  const handleLogin = (email: string, password: string) => {

    setUserEmail(email);
    setIsAuthenticated(true);
    setCurrentPage("dashboard");

    if (email === "admin@graveyard.com") {
      setUserRole("admin");
      toast.success("Welcome back, Administrator!");
    } else {
      setUserRole("user");
      toast.success("Successfully logged in!");
    }
  };

  const handleSignUp = (
    name: string,
    email: string,
    password: string,
    phone: string,
    cnic: string,
    city: string,
  ) => {

    console.log("Creating user:", { name, email, phone, cnic, city }); // Log the new details

    // Redirect to login page instead of auto-login
    setShowSignUp(false);
    toast.success(
      "Account created successfully! Please sign in with your credentials."
    );
  };

  const handleLogout = () => {
    setUserEmail("");
    setIsAuthenticated(false);
    setShowSignUp(false);
    setShowForgotPassword(false);
    setCurrentPage("dashboard");
    setUserRole("user");
    toast.info("Logged out successfully");
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const handleBackToDashboard = () => {
    setCurrentPage("dashboard");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "manage-users":
        return <AdminUserManagement onBack={handleBackToDashboard} />;
      case "manage-graves":
        return <GraveRecordManagement onBack={handleBackToDashboard} />;
      case "booking-requests":
        return <BookingRequests onBack={handleBackToDashboard} />;
      case "reports":
        return <GenerateReport onBack={handleBackToDashboard} />;
      case "book-plot":
        return <BookGravePlot onBack={handleBackToDashboard} />;
      case "map":
        return <GraveyardMap onBack={handleBackToDashboard} />;
      case "family-portal":
        return <SearchGravePage onBack={handleBackToDashboard} mode="family" />;
      case "search-grave": // Reusing SearchGravePage for both
        return <SearchGravePage onBack={handleBackToDashboard} />;
      default:
        return userRole === "admin" ? (
          <AdminDashboard
            userEmail={userEmail}
            onLogout={handleLogout}
            onNavigate={handleNavigate}
          />
        ) : (
          <Dashboard
            userEmail={userEmail}
            onLogout={handleLogout}
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return (
    <div className="size-full">
      <Toaster />
      {isAuthenticated ? (
        renderPage()
      ) : showSignUp ? (
        <SignUpPage
          onSignUp={handleSignUp}
          onSwitchToLogin={() => setShowSignUp(false)}
        />
      ) : showForgotPassword ? (
        <ForgotPasswordPage
          onBackToLogin={() => setShowForgotPassword(false)}
        />
      ) : (
        <LoginPage
          onLogin={handleLogin}
          onSwitchToSignUp={() => setShowSignUp(true)}
          onForgotPassword={() => setShowForgotPassword(true)}
        />
      )}
    </div>
  );
}