import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/Dashboard";

// Define the router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true, // This renders at exactly "/dashboard"
        // element: <DashboardPage />,
        element: <LoginPage />,
      },

      {
        path: "signup", // This renders at "/dashboard/signup"
        element: <SignupPage />,
      },
      // {
      //   path: "issues", // This renders at "/dashboard/issues"
      //   element: <IssuePage />,
      // },
      {
        path: "dashboard", // This renders at "/dashboard"
        element: <DashboardPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
