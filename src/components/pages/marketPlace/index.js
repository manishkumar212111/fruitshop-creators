import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { getUserData} from "../../../utils/globals";
import { connect } from "react-redux";
import {  getProductList , addToStore} from "../../../actions/product";
import {categories} from "../../../configs";
import Shimmer from "../../../components/widgets/shimmerEffect";
const MarketPlace = (props) => {
    const [activeId , setActiveId] = useState('');
    const [ category , setCategory] = useState('')
    const [productList , steProductList] = useState([]);
    const handleCategoryClick = (category) => {
        console.log(category)
        setCategory(category);
        props.getProductList({user_type : "admin" , category : category});
    }

    const handleDuplicate = (id) => {
        setActiveId(id);
        props.addToStore(id);
    } 

    useEffect(() => {
        props.products && steProductList(props.products.results)
    }, [props.products])
    if(props.product_detail_loading){
        return <Shimmer />;
    }
    return(
        <div className="container" style={{"color": "black" , "margin-top" : "130px"}}>
            {/* <h2>Coming soon</h2> */}
            <h2>Your one-stop shop for sourcing the best products</h2>
            <p>
                {categories.map((itm) => (
                    <li onClick={() => handleCategoryClick(itm.id)}>{itm.text}</li>
                ))}
            </p>
            {
                (Array.isArray(productList) && productList.length) ?  productList.map((itm) => (
                    <div>
                        <Link to={`/marketplace/${itm.id}`}><img src={"https://ik.imagekit.io/lcq5etn9k/productlisting/whole-foods_sWpde6_mP.png"}></img></Link>
                        <p>{itm.brandName}</p>
                        <p>$ {itm.price}</p>
                        <button onClick={() => handleDuplicate(itm.id)} disabled={(activeId == itm.id) && props.duplicating_product}>Add to store</button>

                     </div>   
                )) : "No product available"
            }
            {/* {success ? <span>Thank you! We will be touch in you soon !</span> : <button className={"btn"} style={{backgroundColor : "#FF7F00" , "border-radius": "15px" , color : "white", "font-size" : "13px"}} onClick={handleClick}>Get early access</button>} */}
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
