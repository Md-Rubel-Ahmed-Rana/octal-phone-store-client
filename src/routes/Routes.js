import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Categories from "../Pages/Categories/Categories";
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
                path: "/category/:id",
                loader: ({ params }) => fetch(`http://localhost:5000/products/${params.id}`) ,
                element: <Categories />
            },
        ]
    }
])

export default router