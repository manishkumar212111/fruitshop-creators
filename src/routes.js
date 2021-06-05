import HomePage from "./components/pages/homepage/home";
import Login from "./components/widgets/Login";
import Register from "./components/widgets/Register";
import ResetPsd from "./components/pages/reset-password";
import Landing from "./components/pages/landing/landing";
import CustomListing from "./components/pages/custom-listing/index";
import Account from "./components/pages/account";
import MarketPlace from "./components/pages/marketPlace/index";
import MarketPlaceDetail from "./components/pages/marketPlace/detail/detail";

const RouterData = {
    publicRouter: [
        {
            path: "/",
            component: HomePage,
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
            exact: true,
        },
    ],
    privateRouter: [
        {
            path: "/custom-listing/:id",
            component: CustomListing,
        },
        {
            path: "/custom-listing",
            component: CustomListing,
        },
        {
            path: "/landing",
            component: Landing,
        },
        {
            path: "/marketplace/:id",
            component: MarketPlaceDetail,
        },
        {
            path: "/marketplace",
            component: MarketPlace,
        },
        {
            path: "/my-account",
            component: Account,
        }
    ],
}

export default RouterData
