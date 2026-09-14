// import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import AppLayout from "@cloudscape-design/components/app-layout";
import SideNavigation from "@cloudscape-design/components/side-navigation";
import TopNavigation from "@cloudscape-design/components/top-navigation";
import "@cloudscape-design/global-styles/index.css";
import "./App.css";
// import { signInWithRedirect, getCurrentUser } from "aws-amplify/auth";

import DashboardPage from "./pages/DashboardPage";
import AttritionsPage from "./pages/attritions/AttritionsPage";
import EmployeesPage from "./pages/employees/EmployeesPage";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Only attempt sign-in once, and only if the user isn't already signed in.
  /*useEffect(() => {
    getCurrentUser()
      .then((user) => console.log("Signed in as", user))
      .catch(() => {
        signInWithRedirect({ provider: { custom: "AmazonFederate" } });
      });
  }, []);*/

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
              text: "Account",
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

