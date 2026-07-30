import { createBrowserRouter } from "react-router-dom";
import TransactionPage from "@/pages/transaction";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import Home from "@/pages/home";
import LoginPage from "@/pages/login";
import NotFound from "../pages/not found";

const router = createBrowserRouter([
  {
  path: "/",
  element: (
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      index: true,
      element: <Home />,
    },
    {
  path: "transactions",
  element: <TransactionPage />,
},
  ],
},
{
  path: "/login",
  element: <LoginPage />,
},
]);

export default router;