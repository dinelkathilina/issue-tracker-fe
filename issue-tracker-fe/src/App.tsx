import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/Dashboard";
import IssueDetailPage from "./pages/IssueDetailPage";

// Define the router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true, // This renders at exactly "/"
        // element: <DashboardPage />,
        element: <LoginPage />,
      },

      {
        path: "signup", // This renders at "/signup"
        element: <SignupPage />,
      },
      // {
      //   path: "issues", // This renders at "/issues"
      //   element: <IssuePage />,
      // },
      {
        path: "dashboard", // This renders at "/dashboard"
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
