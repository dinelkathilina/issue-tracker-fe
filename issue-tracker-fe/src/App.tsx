import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/Dashboard";
import IssueDetailPage from "./pages/IssueDetailPage";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Define the router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true, // This renders at exactly "/"
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        // Protected routes wrapper
        element: <ProtectedRoute />,
        children: [
          {
            path: "dashboard",
            children: [
              {
                index: true,
                element: <DashboardPage />,
              },
              {
                path: "issues/:id",
                element: <IssueDetailPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
