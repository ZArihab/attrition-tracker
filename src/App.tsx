import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import AppLayout from "@cloudscape-design/components/app-layout";
import SideNavigation from "@cloudscape-design/components/side-navigation";
import TopNavigation from "@cloudscape-design/components/top-navigation";
import Spinner from "@cloudscape-design/components/spinner";
import Box from "@cloudscape-design/components/box";
import "@cloudscape-design/global-styles/index.css";
import "./App.css";
import { signInWithRedirect, getCurrentUser } from "aws-amplify/auth";

import DashboardPage from "./pages/DashboardPage";
import AttritionsPage from "./pages/attritions/AttritionsPage";
import EmployeesPage from "./pages/employees/EmployeesPage";

type AuthState = "checking" | "signedIn" | "signedOut" | "error";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [authState, setAuthState] = useState<AuthState>("checking");
  const [federateId, setFederateId] = useState<string | null>(null);

  // Only attempt sign-in once, and only if the user isn't already signed in.
  useEffect(() => {
    getCurrentUser()
      .then(({ username }) => {
        const prefix = "amazonfederate_";
        const id = username.startsWith(prefix)
          ? username.slice(prefix.length)
          : username;
        setFederateId(id);
        // console.log("user id", userId);
        setAuthState("signedIn");
      })
      .catch(() => {
        setAuthState("signedOut");
        signInWithRedirect({ provider: { custom: "AmazonFederate" } }).catch(
          (err) => {
            console.error("Sign-in redirect failed", err);
            setAuthState("error");
          }
        );
      });
  }, []);

  if (authState === "error") {
    return (
      <div className="full-page-center">
        <Box variant="p" color="text-status-error">
          We couldn't sign you in. Please refresh the page or try again later.
        </Box>
      </div>
    );
  }

  if (authState !== "signedIn") {
    return (
      <div className="full-page-center">
        <Spinner size="large" />
        <Box variant="p" padding={{ top: "s" }} color="text-body-secondary">
          {authState === "signedOut" ? "Redirecting…" : "Loading…"}
        </Box>
      </div>
    );
  }


  return (
    <>
      <div id="top-nav" style={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <TopNavigation
          identity={{
            href: "/",
            title: "Attrition Tracker",
            onFollow: (e) => {
              e.preventDefault();
              navigate("/");
            },
          }}
          utilities={[
            {
              type: "button",
              iconName: "notification",
              title: "Notifications",
              ariaLabel: "Notifications",
            },
            {
              type: "menu-dropdown",
              text: federateId ?? undefined,
              iconName: "user-profile",
              items: [
                { id: "profile", text: "Profile" },
                { id: "signout", text: "Sign out" },
              ],
            },
          ]}
        />
      </div>

      <AppLayout
        headerSelector="#top-nav"
        toolsHide
        navigation={
          <SideNavigation
            activeHref={location.pathname}
            onFollow={(e) => {
              e.preventDefault();
              navigate(e.detail.href);
            }}
            items={[
              { type: "link", text: "Dashboard", href: "/" },
              { type: "link", text: "Attritions", href: "/attritions" },
              { type: "link", text: "Employees", href: "/employees" },
            ]}
          />
        }
        content={
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/attritions" element={<AttritionsPage />} />
            <Route path="/employees" element={<EmployeesPage />} />
          </Routes>
        }
      />
    </>
  );
}

export default App;

