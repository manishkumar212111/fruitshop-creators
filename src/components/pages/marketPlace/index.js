import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getUserData} from "../../../utils/globals";
import { connect } from "react-redux";
import {  getProductList , addToStore} from "../../../actions/product";
import {categories} from "../../../configs";
import Shimmer from "../../../components/widgets/shimmerEffect";
import "./index.scss"
import clsx from 'clsx'

const MarketPlace = (props) => {

    const history = useHistory()
    const [category , setCategory] = useState('')
    const [productList , steProductList] = useState([]);

    const handleCategoryClick = (category) => {
        setCategory(category);
        props.getProductList({user_type : "admin" , category : category});
    }

    const handleDuplicate = (id) => {
        props.addToStore(id);
    } 

    useEffect(() => {
        category && props.products && steProductList(props.products.results)
    }, [props.products])

    const goToDetailPage = (url) => {
        history.push(url);
    }
    const gotoLandingPage = () => {
        history.push("/landing")
    }

    return (
        <div className="marketplace-wrapper">
            <div className='menu'>
                <ul>
                    <li>Free shipping on orders over $30</li>
                    <li>Support a creator</li>
                    <li>Easy domestic returns</li>
                </ul>
            </div>
            <div className="content-wrapper">
                <div className="top-section">
                    <p className="browse-all">Browse All</p>
                    <button className="return-store" onClick={gotoLandingPage}>Return to store</button>

                </div>
                <div className="category-list-wrapper">
                    {categories.map((item) => (
                        <div className="category-list" onClick={() => handleCategoryClick(item.id)} key={item.id}>
                            <p className={clsx("category-name", category === item.id && "active-category-name")}>{item.text}</p>
                            <div className={clsx("dot", category === item.id && "active-dot")}></div>
                        </div>
                    ))}
                </div>
                <hr className="horizontal-line"></hr>
                <p className="category-top-title">{category}</p>
                <div className='products'>
                    {(Array.isArray(productList) && productList.length) ? productList.map((item) => (
                        <div className='product' key={item.id}>
                            <div className='avatar'>
                                <img src={item.imgUrl} alt=''  onClick={() => goToDetailPage(`/marketplace/${item.id}`)}/>
                                <button onClick={() => handleDuplicate(item.id)} className="add-to-store">Add To Store</button>
                            </div>
                            <div className='content' onClick={() => goToDetailPage(`/marketplace/${item.id}`)}>
                                <p className='brand-name'>{item.brandName}</p>
                                <p className='product-name'>{item.productName}</p>
                                <p className='sold-at'>Sold at</p>
                                <p className='sold-name'>{item.sold_at}</p>
                                <p className='price'>${item.price}</p>
                            </div>
                        </div>
                    )) : <div>No product Available</div>}
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = ( state ) => ( {
    products: state.product.products,
    product_detail_loading: state.product.product_detail_loading,
    duplicating_product: state.product.duplicating_product

} );

const mapDispatchToProps = {
    getProductList,
    addToStore
};

export default connect( mapStateToProps, mapDispatchToProps )( MarketPlace );
