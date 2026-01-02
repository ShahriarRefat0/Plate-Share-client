import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../pages/Home";
import AvailableFoods from "../pages/AvailableFoods";
import AboutUs from "../pages/AboutUs";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddFood from "../pages/AddFood";
import MyFoodRequests from "../pages/MyFoodRequests";
import ManageMyFoods from "../pages/ManageMyFoods";
import FoodsDetails from "../pages/FoodsDetails";
import PrivateRoute from "./PrivetRoute";
import ErrorPage from "../pages/ErrorPage";
import LoadingSpinner from "../Components/LoadingSpinner";
import ContactUs from "../pages/Contact-Us";
import DashboardLayout from "../Layouts/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import Profile from "../pages/dashboard/Profile";



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>,
    errorElement: <ErrorPage></ErrorPage>,
    hydrateFallbackElement: <LoadingSpinner></LoadingSpinner>,
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
            <ManageMyFoods></ManageMyFoods>
          </PrivateRoute>
        ),
      },
      {
        path: "/foods-details/:id",
        element: <FoodsDetails></FoodsDetails>,
      },
      {
        path: "/about-us",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/contact-us",
        element: <ContactUs></ContactUs>,
      },
      {
        path: '/*',
        element: <ErrorPage></ErrorPage>
      }
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: 'profile', element: <Profile /> },
      { path: 'add-food', element: <AddFood /> },
      { path: 'manage-my-foods', element: <ManageMyFoods /> },
      { path: 'my-food-requests', element: <MyFoodRequests /> },
    ],
  },
]);

export default router;
