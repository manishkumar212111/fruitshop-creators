import Home from "./components/pages/Home";
import Login from "./components/widgets/Login";
import Register from "./components/widgets/Register";
import ResetPsd from "./components/pages/reset-password";

import Index from "./components/pages/home/index";
import Landing from "./components/pages/home/components/landing";
import Listing from "./components/pages/home/components/listing";
import Detail from "./components/pages/home/components/details/index";
import Account from "./components/pages/home/components/myShop/account"
import MarketPlace from "./components/pages/marketPlace/index"
import Analytics from "./components/pages/analytics/index"

export default [
    {
        path: "/",
        component: Home,
        exact: true,
    },
    {
        path: "/login",
        component: Login,
        exact: true,
    },
    {
        path: "/register",
        component: Register,
        exact: true,
    },
    {
        path: "/reset-password",
        component: ResetPsd,
        // exact: true,
    },
    {
        path: "/home/edit/:id",
        component: Detail,
    },
    {
        path: "/home/create",
        component: Detail,
    },
    {
        path: "/home/listing",
        component: Listing,
    },
    {
        path: "/home",
        component: Landing,
    },
    {
        path: "/marketplace",
        component: MarketPlace,
    },
    {
        path: "/analytics",
        component: Analytics,
    },
    // {
    //     path: "/marketplace",
    //     component: MarketPlace,
    // },
    {
        path: "/my-account",
        component: Account,
    },
    
];
