import React, { useState , useEffect} from "react";
import axios from "axios"
import { createProduct , getProductById, updateProductById } from '../../../actions/product';
import { connect, useDispatch } from "react-redux";
import "./index.scss";
import { useHistory } from "react-router";
import { REACT_APP_SERVER_URL } from "../../../config";
import CKEditor from "ckeditor4-react";
import UndoIcon from '../../../assets/img/Undo.svg'
// import WhiteUndoIcon from '../../../assets/img/white-undo.svg'
import AddImageIcon from '../../../assets/img/add-image.svg'

const dotenv = require("dotenv");
dotenv.config();

const axiosInstance = axios.create({
  baseURL: REACT_APP_SERVER_URL,
})

const defaultProps = {
    fields : {
        brandName : "",
        productName: "",
        promoCode : "",
        url: "",
        productDescription : "",
        price : "",
        imgUrl : "",
        imageType : "square"
    }
}

const CustomListing = (props) => {

    const history = useHistory()
    const dispatch = useDispatch()
    const [productID] = useState(props.match.params.id ? props.match.params.id : "");
    const [fields , setFields] = useState(props.fields);
    const [error , setError] = useState(false);
    const [checkSuperFruitProduct, setCheckSuperFruitProduct] = useState(false);
    const CKeditorConfig = {
        height: 100,
        toolbar: [
            ["Cut", "Copy", "Paste"],
            ["Undo", "Redo"],
            ["SpellChecker"],
            ["Link", "Unlink", "Anchor"],
            [
            "Image",
            "Table",
            "Horizontal Line",
            "Special Character"
            ],
            ["Maximize"],
            ["Bold", "Italic", "Strike"],
            ["RemoveFormat"],
            ["NumberedList", "BulletedList"],
            ["DecreaseIndent", "IncreaseIndent"],
            ["BlockQuote"],
            ["About"]
        ]
    }
    
    const handleChange = (e ,key) => {
        let field = fields;
        if (key === "productDescription") {
            field[key] = e
        } else {
            field[key] = e.target.value
        }
        setFields(fieldOb => ({...fieldOb , ...field}))
    }

    useEffect(() => {
        if(productID){
            dispatch(getProductById(productID))
        }
    } , [dispatch, productID]);
    

    useEffect(() => {
        if(props.productDetail && productID){
            const detail = {
                brandName : props.productDetail.brandName,
                productName : props.productDetail.productName,
                promoCode : props.productDetail.promoCode,
                url : props.productDetail.url,
                productDescription : props.productDetail.productDescription,
                price : props.productDetail.price,
                imgUrl :props.productDetail.imgUrl,
                imageType : props.productDetail.imageType,
        };
        if (props.productDetail.originalProductId) {
            setCheckSuperFruitProduct(true)
        } else {
            setCheckSuperFruitProduct(false)
        }
        setFields(detail)}
    } , [props.productDetail, productID]);

    const handleImageSubmit = (files) => {
        let formData = new FormData()
        formData.append("file", files[0])
        axiosInstance.post(process.env.REACT_APP_SERVER_URL + "api/file/upload", formData, {
            headers: {
                'content-type':'application/json',
            }
            
        }).then(res => {
            let field = fields;
            field.imgUrl = res.data;
            setFields(fieldOb => ({...fieldOb , ...field}))
        }).catch(err => {
            // cb(err.response);
        });    
    }
    const handleSubmit = () => {
        const requireArr = ['brandName' , 'productName' , 'productDescription' , 'url' , 'imgUrl' , 'price'];
        let err = [];
        for(var i in requireArr){
            if(!fields[requireArr[i]]){
                err.push(requireArr[i])
            }
        }
        if(err.length){
            setError("These fileds are required " + err.join(","));
            return;
        }
        if(!fields.promoCode){
            delete fields.promoCode;
        }
        productID ? props.updateProductById(productID , fields) : props.createProduct(fields);
    }

    const goBackHome = () => {
        setFields({})
        history.push("/landing")
    }

    return (
        <div className="custom-listing-wrapper">
            <div className="custom-listing">
                <div className="header">
                    <img src={UndoIcon} onClick={goBackHome} className="desktop-undo"></img>
                    {/* <img src={WhiteUndoIcon} onClick={goBackHome} className="mobile-undo"></img> */}
                    {/* <button className="mobile-undo" onClick={goBackHome}>Unsaved Product</button> */}
                    <button className="discard-button" onClick={goBackHome}>Discard</button>
                    <button className="save-button" onClick={handleSubmit}>Save</button>
                </div>
                <div className="listing-card">
                    {!checkSuperFruitProduct &&
                        <div className="left-group">
                            <p className="title">{productID ? "Edit your" : "Add a"} custom listing</p>
                            <label>Brand Name</label><br/>
                            <input type="text" value={fields.brandName} placeholder="Brand Name" onChange={(e) => handleChange(e , 'brandName')} ></input><br/>
                            <label>Product Name</label><br/>
                            <input type="text" value={fields.productName} placeholder="Product Name" onChange={(e) => handleChange(e , 'productName')} /><br/>
                            <label>Price</label><br/>
                            <input type="number" value={fields.price} placeholder="Price" onChange={(e) => handleChange(e , 'price')} ></input><br/>
                            <label>Promo Code(Optional)</label><br/>
                            <input type="text" value={fields.promoCode} placeholder="Promo Code" onChange={(e) => handleChange(e , 'promoCode')} ></input><br/>
                            <label>https://url</label><br/>
                            <input type="text" value={fields.url} placeholder="Product url" onChange={(e) => handleChange(e , 'url')} ></input>
                        </div>
                    }
                    <div className="right-group">
                        {checkSuperFruitProduct && <p className="title">Edit your Superfruit Listing</p>}
                        <label>Product description (Optional)</label><br/>
                        <CKEditor
                            data={fields.productDescription ? fields.productDescription.replaceAll('&lt;','<') : ""}
                            config={CKeditorConfig}
                            onChange={ ( event, editor ) => {
                                const data = event.editor.getData();
                                handleChange(data , 'productDescription')
                            } }
                            onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) }
                        />
                        <label className="image-top">Product Image</label><br/>
                        <div className="image-upload">
                            <label htmlFor="file-input">
                                {fields.imgUrl ?  
                                    <div className="product-image">
                                        <img height="100%" width="100%" src={fields.imgUrl}></img>
                                    </div>
                                    : 
                                    <div className="product-image">
                                        <img src={AddImageIcon}></img>
                                    </div>}
                            </label>
                            <input id="file-input" type="file" onChange={e => { handleImageSubmit(e.target.files) }}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

CustomListing.defaultProps = defaultProps;

const mapStateToProps = ( state ) => ( {
    productList : state.product.productList,
    productDetail : state.product.productDetail,
    product_detail_loading : state.product.product_detail_loading
} );

const mapDispatchToProps = {
    createProduct,
    getProductById,
    updateProductById
};

export default connect( mapStateToProps, mapDispatchToProps )( CustomListing );
