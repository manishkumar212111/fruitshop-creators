import React from 'react';
import './index.scss'
import { useHistory } from "react-router-dom"

const ProductSetting = (props) => {

    const { productList } = props;
    const history = useHistory();
    const gotoCreat = () => {
        history.push("/custom-listing")
    }
    const gotoMarketPlace = () => {
        history.push("/marketplace")
    }

    return (
        <div className="product-setting-card">
            <p className="title">Add {productList.length === 0 ? 'your first' : 'another'} product</p>
            <p className="description">Express yourself through your product image and description!</p>
            <div className="button-group">
                <button className="custom-button" onClick={gotoCreat}>Add a custom listing</button>
                <button className="custom-button" onClick={gotoMarketPlace}>Add a product from Superfruit</button>
            </div>
        </div>
    )
}

export default ProductSetting;