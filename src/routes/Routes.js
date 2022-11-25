import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import Blogs from "../Pages/Blogs/Blogs";
import Categories from "../Pages/Categories/Categories";
import AddProduct from "../Pages/Dashboard/AddAProduct/AddProduct";
import AllBuyers from "../Pages/Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../Pages/Dashboard/AllSellers/AllSellers";
import MyBuyers from "../Pages/Dashboard/MyBuyers/MyBuyers";
import MyOrders from "../Pages/Dashboard/MyOrders/MyOrders";
import MyProducts from "../Pages/Dashboard/MyProducts/MyProducts";
import Payment from "../Pages/Dashboard/Payment/Payment";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ErrorPage from "../Shared/ErrorPage/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/blogs",
                element: <Blogs />
            },
            {
                path: "/category/:id",
                loader: ({ params }) => fetch(`http://localhost:5000/products/${params.id}`) ,
                element: <Categories />
            },
        ]
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/dashboard/addProduct",
                element: <AddProduct />
            },
            {
                path: "/dashboard/allbuyers",
                element: <AllBuyers />
            },
            {
                path: "/dashboard/allsellers",
                element: <AllSellers />
            },
            {
                path: "/dashboard/myproducts",
                element: <MyProducts /> 
            },
            {
                path: "/dashboard/mybuyers",
                element: <MyBuyers /> 
            },
            {
                path: "/dashboard/myorders",
                element: <MyOrders /> 
            },
            {
                path: "/dashboard/payment/:id",
                loader: ({params}) => fetch(`http://localhost:5000/orders/${params.id}`) ,
                element: <Payment /> 
            },
        ]
    }
])

export default router