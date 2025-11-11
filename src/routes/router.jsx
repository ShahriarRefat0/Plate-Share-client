import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../pages/Home";
import AvailableFoods from "../pages/AvailableFoods";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddFood from "../pages/AddFood";
import MyFoodRequests from "../pages/MyFoodRequests";
import ManageMyFoods from "../pages/ManageMyFoods";
import FoodsDetails from "../pages/FoodsDetails";
import PrivateRoute from "./PrivetRoute";



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/available-foods",
        element: <AvailableFoods></AvailableFoods>,
       
      },
      {
        path: "/add-food",
        element: (
          <PrivateRoute>
            <AddFood></AddFood>
          </PrivateRoute>
        ),
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
        element: (
          <PrivateRoute>
            <MyFoodRequests></MyFoodRequests>
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-my-foods",
        element: (
          <PrivateRoute>
            <ManageMyFoods></ManageMyFoods>,
          </PrivateRoute>
        ),
      },
      {
        path: "/foods-details/:id",
        element: (
          <PrivateRoute>
            <FoodsDetails></FoodsDetails>,
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
