import React , {useState} from 'react';
import Tab from "./tab/tab";
import ShopOptions from "../components/myShop/option";

const Landing = (props) => {
    const [activeTab,setActiveTab] = useState(0) 
    
    return (
        <ShopOptions />          
    )
}

export default Landing;