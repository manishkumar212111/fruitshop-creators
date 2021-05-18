import { combineReducers } from "redux";

import Home from "./home";
import alert from "./alert";
import auth from "./auth";
import user from "./user"
import product from './product'
const sessionReducer = ( state = false, action ) => {
    switch ( action.type ) {
        case "INITIALIZE_SESSION":
            return true;
        default: return state;
    }
};

const appReducers = combineReducers({
    Home,
    sessionReducer,
    alert,
    auth,
    user,
    product
});

const rootReducer = (state, action) => {
    return appReducers(state, action);
}

export default rootReducer;