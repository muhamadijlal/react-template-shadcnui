// Routes
import { createBrowserRouter, Navigate } from "react-router-dom";
import GuestRoute from "@routes/guest-route";
import ProtectedRoute from "@routes/protected-route";
// Layouts
import AuthLayout from "@src/layouts/auth-layout";
import MainLayout from "@src/layouts/main-layout";
// Icons
import { MdInsertChart } from "react-icons/md";
import { FaRegEdit, FaUserCircle } from "react-icons/fa";
import { PiClockCountdown, PiGearSixFill } from "react-icons/pi";
// Pages
import AccountPage from "@src/pages/account";
import ActivityPage from "@src/pages/activity";
import DashboardPage from "@src/pages/dashboard";
import NotFoundPage from "@src/pages/handle/404";
import ForbiddenPage from "@src/pages/handle/403";
import ManagementPage from "@src/pages/management";
import VerificationPage from "@src/pages/verification";
import AccountMediaPage from "@src/pages/account-media";

const routes = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard" replace />,
          },
          {
            path: "dashboard",
            element: <DashboardPage />,
            handle: {
              title: "Dashboard",
              sidebarName: "Dashboard",
              Icon: MdInsertChart,
              visible: true,
              description: "",
              breadcrumb: [{ name: "Home", clickable: false }],
            },
          },
          {
            path: "verification",
            element: <VerificationPage />,
            handle: {
              title: "Verifikasi",
              sidebarName: "Verifikasi",
              Icon: FaRegEdit,
              visible: true,
              description: "",
              breadcrumb: [{ name: "Verifikasi", clickable: false }],
            },
          },
          {
            path: "account",
            element: <AccountPage />,
            handle: {
              title: "Akun",
              sidebarName: "Akun",
              Icon: FaUserCircle,
              visible: true,
              description: "",
              breadcrumb: [{ name: "Akun", clickable: false }],
            },
          },
          {
            path: "activity",
            element: <ActivityPage />,
            handle: {
              title: "Aktivitas",
              sidebarName: "Aktivitas",
              Icon: PiClockCountdown,
              visible: true,
              description: "",
              breadcrumb: [{ name: "Aktivitas", clickable: false }],
            },
          },
          {
            path: "management",
            element: <ManagementPage />,
            handle: {
              title: "Managemen",
              sidebarName: "Managemen",
              Icon: PiGearSixFill,
              visible: true,
              description: "",
              breadcrumb: [{ name: "Managemen", clickable: false }],
            },
            children: [
              {
                path: "account/media",
                element: <AccountMediaPage />,
                handle: {
                  title: "Akun Media",
                  sidebarName: "Akun Media",
                  description: "",
                  visible: true,
                  breadcrumb: [
                    {
                      name: "Management",
                      path: "/management",
                      clickable: true,
                    },
                    { name: "Akun Media", clickable: false },
                  ],
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    element: <GuestRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [],
      },
    ],
  },
  {
    path: "forbidden",
    element: <ForbiddenPage />,
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default routes;
