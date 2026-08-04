import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";

import ProtectedRoute from "@/components/ProtectedRoute";

import LoginPage from "@/pages/login";

import Home from "@/pages/home";

import TransactionPage from "@/pages/transaction";

import NotFound from "@/pages/not found";

import PeriodPage from "@/pages/period";


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





  {


    path: "*",

    element: <NotFound />,


  },

  {
    path: "periods",
    element: <PeriodPage />,
  },

]);


export default router;