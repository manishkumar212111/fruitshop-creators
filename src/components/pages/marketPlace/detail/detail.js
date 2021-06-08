import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {  getProductById , addToStore } from "../../../../actions/product";
import "./detail.scss"

const MarketPlaceDetail = (props) => {
    
    const history = useHistory()
    const [productDetail , steProductDetail] = useState([]);
    const [id] = useState(props.match.params.id ? props.match.params.id : "");

    useEffect(() => {
        props.productDetail && steProductDetail(props.productDetail)
    }, [props.productDetail])

    const handleDuplicate = () => {
        props.addToStore(id);
    } 
    useEffect(() => {
        if(id){
            props.getProductById(id);
        }
    } , [id]);

    const gotoMarketPlace = () => {
        history.push("/marketplace")
    }

    console.log("fffffffffff", productDetail)

    return(
        <>
        {/* <div className="return-to-store" onClick={gotoMarketPlace}>
            Return To SuperFruit Marketplace
        </div> */}
        <div className='menu'>
            <ul>
                <li>Free shipping on orders over $30</li>
                <li>Support a creator</li>
                <li>Easy domestic returns</li>
            </ul>
        </div>
        <div className="detail-main">
            <div className="avatar">
                <img src={productDetail.imgUrl} alt="" />
            </div>
        
            <div className="detail">
                <p className="title">{productDetail.productName && productDetail.productName}</p>
                <p className="price">${productDetail.price}</p>
                <p className="author">{productDetail.brandName && productDetail.brandName}</p>
                <p className="author">{productDetail.sold_at && productDetail.sold_at}</p>
                <div className="buy_now">
                <button onClick={handleDuplicate} disabled={props.duplicating_product}>Add To Store</button>
                </div>
                {productDetail.productDescription && <div dangerouslySetInnerHTML={{ __html: productDetail.productDescription ? productDetail.productDescription.replaceAll('&lt;' , '<') : 'product description' }} className="description">
                </div>}
            </div>
        </div>
        </>
      )
}


const mapStateToProps = ( state ) => ( {
    productDetail : state.product.productDetail,
    product_detail_loading : state.product.product_detail_loading,
    duplicating_product : state.product.duplicating_product
} );

const mapDispatchToProps = {
    getProductById,
    addToStore
};

export default connect( mapStateToProps, mapDispatchToProps )( MarketPlaceDetail );
