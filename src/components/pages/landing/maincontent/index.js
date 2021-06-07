import React , { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductByUserId } from '../../../../actions/product'
import Tab from "./tab/tab";
import ProductSetting from "./product";
import ProductListing from "./listing";
import Theme from "./theme";
import Wallet from "./wallet"
import './index.scss'

const MainContent = () => {

    const dispatch = useDispatch()
    const productList = useSelector((state) => state.product.productList)

    useEffect(() => {
      dispatch(getProductByUserId())
    }, [dispatch])

    const [selectedTab, setSelectedTab] = useState('product');
    const setTab = (tabName) => {
        setSelectedTab(tabName);
    }
    
    return (
        <>
        <div className="main-content-wrapper">
            <Tab tab={selectedTab} setTab={setTab}/>
            {selectedTab === "product" && <ProductSetting productList={productList}/>}
            {selectedTab === "theme" && <Theme />}
            {selectedTab === "wallet" && <Wallet />}
        </div> 
        <ProductListing productList={productList}/>
        </>
    )
}

export default MainContent;