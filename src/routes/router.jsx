import React from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../pages/Home";
import AvailableFoods from "../pages/AvailableFoods";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddFood from "../pages/AddFood";
import MyFoodRequests from "../pages/MyFoodRequests";
import ManageMyFoods from "../pages/ManageMyFoods";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts>Hello World</MainLayouts>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/available-foods",
        element: <AvailableFoods></AvailableFoods>,
      },
      {
        path: "/add-food",
        element: <AddFood></AddFood>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/my-food-requests",
        element: <MyFoodRequests></MyFoodRequests>,
      },
      {
        path: "/manage-my-foods",
        element: <ManageMyFoods></ManageMyFoods>,
      },
    ],
  },
]);

export default router;
