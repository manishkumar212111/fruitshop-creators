import React from 'react';
import { Switch, Route } from "react-router-dom";
import Landing from "./components/landing";
import Listing from "./components/listing";
const Index = () => {
    return (
        <div>
            {/* <Switch>
                <Route key="/listing" path="/listing" component={Listing} />
                <Route key="/" path="/" component={Landing} />
            </Switch> */}
        </div>
    )
}

export default Index;