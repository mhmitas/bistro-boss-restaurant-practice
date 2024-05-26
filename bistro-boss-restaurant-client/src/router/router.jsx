import { createBrowserRouter } from "react-router-dom";
import Root from "../routes/root";
import Home from "../pages/home/Home";
import Menu from "../pages/menu/Menu";
import Order from "../pages/order/order";
import Login from "../pages/authentication/Login";
import AuthRoutes from "../routes/AuthRoutes";
import SignUp from "../pages/authentication/SignUp";
import PriverRoute from "../routes/PriverRoute";
import DashboardRoutes from "../routes/DashboardRoutes";
import UserCart from "../pages/Dashboard/user/UserCart";
import ManageUsers from "../pages/Dashboard/admin/manage-users/ManageUsers";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'menu',
                element: <Menu />
            },
            {
                path: `order`,
                element: <PriverRoute><Order /></PriverRoute>
            },

        ]
    },
    // Dashboard routes
    {
        path: '/dashboard',
        element: <DashboardRoutes />,
        children: [
            // users routes
            {
                path: 'cart',
                element: <UserCart />,
            },
            // admin routes
            {
                path: 'manage-users',
                element: <ManageUsers />,
            },
        ]
    },
    {
        path: 'auth',
        element: <AuthRoutes></AuthRoutes>,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'signup',
                element: <SignUp />
            },
        ]
    }

]);