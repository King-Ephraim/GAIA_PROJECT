import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout/Layout";

import LoginPage from "@/pages/Login/Login";
import LogupPage from "@/pages/Logup/Logup";
import AboutPage from "@/pages/About/About";
import DashboardPage from "@/pages/Dashboard/Dashboard";
import ActivityPage from "@/pages/Activity/Activity";
import SettingsPage from "@/pages/Settings/Settings";
import UserProfilePage from "@/pages/UserProfile/UserProfile";
import CollectionPage from "@/pages/Collection/Collection";
import RecyclingPage from "@/pages/Recycling/Recycling";
import ResourcesPage from "@/pages/Resources/Resources";
import AchievementsPage from "@/pages/Achievements/Achievements";
import Agents from "@/pages/agents/Agents";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      document.title = "Duneko - Connexion";
      return null;
    }
  },
  {
    path: "/logup",
    element: <LogupPage />,
    loader: () => {
      document.title = "Duneko - Inscription";
      return null;
    }
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
        loader: () => {
          document.title = "Tableau de bord | Duneko";
          return null;
        }
      },
      {
        path: "activity",
        element: <ActivityPage />,
        loader: () => {
          document.title = "Activité | Duneko";
          return null;
        }
      },
      {
        path: "collection",
        element: <CollectionPage />,
        loader: () => {
          document.title = "Collecte | Duneko";
          return null;
        }
      },
      {
        path: "recycling",
        element: <RecyclingPage />,
        loader: () => {
          document.title = "Recyclage | Duneko";
          return null;
        }
      },
      {
        path: "settings",
        element: <SettingsPage />,
        loader: () => {
          document.title = "Paramètres | Duneko";
          return null;
        }
      },
      {
        path: "about",
        element: <AboutPage />,
        loader: () => {
          document.title = "À propos | Duneko";
          return null;
        }
      },
      {
        path: "agents",
        element: <Agents />,
        loader: () => {
          document.title = "Agents | Duneko";
          return null;
        }
      },
      {
        path: "profile",
        element: <UserProfilePage />,
        loader: () => {
          document.title = "Profil | Duneko";
          return null;
        }
      },
      {
        path: "resources",
        element: <ResourcesPage />,
        loader: () => {
          document.title = "Ressources | Duneko";
          return null;
        }
      },
      {
        path: "achievements",
        element: <AchievementsPage />,
        loader: () => {
          document.title = "Récompenses | Duneko";
          return null;
        }
      },
      {
        path: "*",
        element: <Navigate to="/dashboard" replace />
      }
    ]
  }
]);

export default router;
