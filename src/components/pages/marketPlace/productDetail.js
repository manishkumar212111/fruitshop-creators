import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import {  getProductById , addToStore} from "../../../actions/product";
import Shimmer from "../../../components/widgets/shimmerEffect";

const MarketPlaceDetail = (props) => {
    const [productDetail , steProductDetail] = useState([]);
    const [id , setId] = useState(props.match.params.id ? props.match.params.id : "");

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

    if(props.product_detail_loading){
        return <Shimmer />;
    }
    return(
        <div className="container" style={{"color": "black" , "margin-top" : "130px"}}>
            {productDetail && productDetail.brandName}<br></br>
            {productDetail && productDetail.price}<br></br>
            {productDetail && productDetail.productName}<br></br>
            <button onClick={handleDuplicate} disabled={props.duplicating_product}>Add to store</button>


        </div>
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
