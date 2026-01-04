import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

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
      {
        path: "issues", // This renders at "/dashboard/issues"
        element: (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-800">Issues Page</h2>
            <p className="text-blue-600 mt-1">
              This is a placeholder for the issues list.
            </p>
          </div>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
