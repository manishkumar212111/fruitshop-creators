import React , {useState} from 'react';
import Tab from "./tab/tab";
// import ShopOptions from "../components/myShop/listing";
import Listing from '../components/myShop/listing';


const Landing = (props) => {
    const [activeTab,setActiveTab] = useState(0) 
    
    return (
            <Listing />
    )
}

export default Landing;