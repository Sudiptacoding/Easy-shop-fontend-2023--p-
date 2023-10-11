import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Moredetails from "../pages/Moredetails";
import Admin from "../components/Admin";
import AdminDashbord from "../pages/AdminDashbord";
import Dashbord from "../pages/DashbordDetails/Dashbord";
import ProductList from "../pages/DashbordDetails/ProductList";
import AllbuyProductList from "../pages/DashbordDetails/AllbuyProductList";
import ProductUplod from "../pages/DashbordDetails/ProductUplod";
import Privetroutes from "../privetroutes/Privetroutes";
import About from "../pages/About";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <Error></Error>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/about",
                element: <About></About>,
            },
            {
                path: "/registration",
                element: <Registration></Registration>,
            },
            {
                path: "/moredetails/:id",
                element: <Privetroutes><Moredetails></Moredetails></Privetroutes>,

            },
            {
                path: "/admin",
                element: <Privetroutes><Admin></Admin></Privetroutes>,
            },
            {
                path: "/dashbord",
                element: <AdminDashbord></AdminDashbord>,
                children: [
                    {
                        path: "/dashbord",
                        element: <Privetroutes><Dashbord></Dashbord></Privetroutes>,
                    },
                    {
                        path: "/dashbord/product",
                        element: <ProductList></ProductList>,
                    },
                    {
                        path: "/dashbord/uplod",
                        element: <ProductUplod></ProductUplod>,
                    },
                    {
                        path: "/dashbord/allbuyproduct",
                        element: <AllbuyProductList></AllbuyProductList>,
                    },
                ]
            },


            // 


        ],
    },
]);

export default router