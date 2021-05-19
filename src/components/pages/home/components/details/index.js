import React, { useState , useEffect} from "react";
import axios from "axios"
import { Modal } from 'react-bootstrap';
import { createProduct , getProductById, updateProductById } from '../../../../../actions/product';
import { connect } from "react-redux";
import "./index.scss";
import { useHistory } from "react-router";
import Shimmer from "../../../../widgets/shimmerEffect/index";
import { REACT_APP_SERVER_URL } from "../../../../../config";
import CKEditor from "ckeditor4-react";
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

const Detail = (props) => {
    const [id , setId] = useState(props.match.params.id ? props.match.params.id : "");
    const [fields , setFields] = useState(props.fields);
    const [ imgType, setimgtype] = useState(false);
    const [inputBox , setInputBox] = useState(null);
    const [error , setError] = useState(false);
    
    const handleChange = (e ,key, value) => {
        let field = fields;
        field[key] = value ? value : e.target.value;
        setFields(fieldOb => ({...fieldOb , ...field}))
        if(key == "imageType"){
            setimgtype(false);
        }
        // let errOb = errorObj;
        // errOb[e.target.name].error = validateField(e.target.name);

        // setErrorObj( errorOb => ( { ...errorOb , errOb}))
    }

    useEffect(() => {
        if(id){
            props.getProductById(id);
        }
    } , [id]);
    

    useEffect(() => {
        if(props.productDetail){
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
        setFields(detail)}
    } , [props.productDetail]);
    const handleImageSubmit = (files) => {
        let formData = new FormData()
        formData.append("file", files[0])
        axiosInstance.post(process.env.REACT_APP_SERVER_URL + "/api/file/upload", formData, {
            headers: {
                'content-type':'application/json',
            }
            
        }).then(res => {
            let field = fields;
            field.imgUrl = res.data;
            setFields(fieldOb => ({...fieldOb , ...field}))
            setimgtype(true);
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
        id ? props.updateProductById(id , fields ) : props.createProduct(fields);
    }
    if(props.product_detail_loading){
        return <Shimmer />;
    }
    return (
        <div className="createMain">
            <div className={'listingSec'}>
                <div className={'d-flex flex-column justify-content-start header'}>
                    <div className="row">
                        <div className="col-md-6 text-left">
                            <h1 className={'label'}>Create Your Listing</h1>
                        </div>
                        <div className="col-md-6">
                            <button className={"btn button-success justify-content-end doneBtn"} onClick={handleSubmit}>Done</button>
                        </div>
                    </div>    
                </div>
                <div className="row">
                    <div className="col-md-5">

                        <div className={''}>
                        <div className={''}>
                            <div class="image-upload">

                                <label for="file-input" className="imgLabel">
                                    {fields.imgUrl ?  <div className={'pic listingCard'}>
                                        <img height="100%" width="100%" src={fields.imgUrl}></img>
                                    </div> : <div className={'pic listingCard'}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="currentColor" class="bi bi-image-fill imgIcon" viewBox="0 0 16 16">
                                            <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"/>
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-plus-circle-fill impIconPlus" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                                        </svg>

                                    </div>}
                                </label>

                                <input 
                                    id="file-input"
                                    type="file"
                                    onChange={e => {
                                        handleImageSubmit(e.target.files)
                                    }}
                                />
                            </div>

                        </div>

                        </div>

                    </div>

                    <div className="col-md-5">
                        <div className="rightContent">

                        <div className={'listingDiv'}>
                    {error && <span className="error">{error}</span>}
                    <div className={'listConatiner'}>
                        <div className={'d-flex flex-row'}>
                            <div className={'list'}>
                            <div className={'listConatiner'}>
                                <div className={'d-flex flex-row'}>
                                    <div className={'list'}>
                                        <input type="text" value={fields.brandName} placeholder="Brand Name" onChange={(e) => handleChange(e , 'brandName')} className={`${inputBox == "brandName" ? "" : "d-none"}`}></input>
                                        {inputBox !== "brandName" && <div><span>{fields.brandName ? fields.brandName : "Brand Name"}</span> <span onClick={() => setInputBox("brandName")}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                    </svg></span></div>}
                                        
                                        <input type="text" value={fields.productName} placeholder="Product Name" onChange={(e) => handleChange(e , 'productName')} className={`${inputBox == "productName" ? "" : "d-none"}`} /> 
                                        {inputBox !== "productName" && <div><span>{fields.productName ? fields.productName : "Product Name"}</span> <span onClick={() => setInputBox("productName")}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                    </svg></span></div>}
                                        
                                        <input type="text" value={fields.promoCode} placeholder="Promo Code" onChange={(e) => handleChange(e , 'promoCode')} className={`${inputBox == "promoCode" ? "" : "d-none"}`}></input>
                                        {inputBox !== "promoCode" && <div><span>{fields.promoCode ? fields.promoCode : "Promo Code"}</span> <span onClick={() => setInputBox("promoCode")}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                    </svg></span></div>}
                                        
                                        <input type="text" value={fields.url} placeholder="Product url" onChange={(e) => handleChange(e , 'url')} className={`${inputBox == "url" ? "" : "d-none"}`}></input>
                                        {inputBox !== "url" && <div><span>{fields.url ? fields.url : "Url"}</span> <span onClick={() => setInputBox("url")}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                    </svg></span></div>}
                                        
                                    <div className={`${inputBox == "productDescription" ? "" : "d-none"}`}><CKEditor
                                        data={fields.productDescription ? fields.productDescription.replaceAll('&lt;','<') : "Write description here"}
                                        config={{
                                        height: 400,
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
                                        ]}}
                                        onReady={ editor => {
                                            // You can store the "editor" and use when it is needed.
                                        } }
                                        onChange={ ( event, editor ) => {
                                            const data = event.editor.getData();
                                            handleChange(data , 'productDescription', data)
                                        } }
                                        onBlur={ ( event, editor ) => {
                                        } }
                                        onFocus={ ( event, editor ) => {
                                        } }
                                        onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) }

                                    /></div>
                                        {inputBox !== "productDescription" && <div style={{display: "flex"}}><span dangerouslySetInnerHTML={{ __html: fields.productDescription ? fields.productDescription.replaceAll('&lt;' , '<') : "product description" }}></span> <span onClick={() => setInputBox("productDescription")}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                    </svg></span></div>}
                                        
                                    </div>
                                    {/* <div class="image-upload">
                                        <label for="file-input">
                                            {fields.imgUrl ?  <div className={'pic'}><img height="50" width="50" src={fields.imgUrl}></img></div> : <div className={'pic'}></div>}
                                        </label>

                                        <input 
                                            id="file-input"
                                            type="file"
                                            onChange={e => {
                                                handleImageSubmit(e.target.files)
                                            }}
                                        />
                                    </div> */}
                                </div>
                                <div className="d-flex justify-content-end">
                            
                                </div>

                            </div>

                        
                                
                                {/* <input type="text" value={fields.brandName} placeholder="Brand Name" onChange={(e) => handleChange(e , 'brandName')} className={`${inputBox == "brandName" ? "" : "d-none"}`}></input>
                                {inputBox !== "brandName" && <div><span>{fields.brandName ? fields.brandName : "Brand Name"}</span> <span onClick={() => setInputBox("brandName")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                    </svg>
                                </span></div>}
                                
                                <input type="text" value={fields.productName} placeholder="Product Name" onChange={(e) => handleChange(e , 'productName')} className={`${inputBox == "productName" ? "" : "d-none"}`} /> 
                                {inputBox !== "productName" && <div><span>{fields.productName ? fields.productName : "Product Name"}</span> <span onClick={() => setInputBox("productName")}>
                                                               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                                            </svg>
                                </span></div>}
                                
                                <input type="text" value={fields.promoCode} placeholder="Promo Code" onChange={(e) => handleChange(e , 'promoCode')} className={`${inputBox == "promoCode" ? "" : "d-none"}`}></input>
                                {inputBox !== "promoCode" && <div><span>{fields.promoCode ? fields.promoCode : "Promo Code"}</span> <span onClick={() => setInputBox("promoCode")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                        </svg>
                                </span></div>}
                                
                                <input type="text" value={fields.url} placeholder="Product url" onChange={(e) => handleChange(e , 'url')} className={`${inputBox == "url" ? "" : "d-none"}`}></input>
                                {inputBox !== "url" && <div><span>{fields.url ? fields.url : "Url"}</span> <span onClick={() => setInputBox("url")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                    </svg>
                                </span></div>}
                                
                                <input type="textarea" value={fields.productDescription} placeholder="product Description" onChange={(e) => handleChange(e , 'productDescription')} className={`${inputBox == "productDescription" ? "" : "d-none"}`}></input>
                                {inputBox !== "productDescription" && <div><span>{fields.productDescription ? fields.productDescription : "Product Descirption"}</span> <span onClick={() => setInputBox("productDescription")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                    </svg>
                                </span></div>}
                                
                                <input type="number" value={fields.price} placeholder="Price" onChange={(e) => handleChange(e , 'price')} className={`${inputBox == "price" ? "" : "d-none"}`}></input>
                                {inputBox !== "price" && <div><span>{fields.price ? fields.price : "Price"}</span> <span onClick={() => setInputBox("price")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                </svg>
                                </span>
                            </div>} */}
                                
                        </div>

                    </div>
                </div>
            </div>
        </div>
            </div>

                <div className="col-md-2">
                    <div className="rightContent">
                        <span className="pull-right">
                                <input type="number" value={fields.price} placeholder="Price" onChange={(e) => handleChange(e , 'price')} className={`${inputBox == "price" ? "" : "d-none"}`}></input>
                                    {inputBox !== "price" && <div><h2>${fields.price ? fields.price : "Price"} <span onClick={() => setInputBox("price")}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                </svg></span></h2></div>}
                                
                        </span>
                    </div>
            </div>
    </div>

            </div>

            <Modal show={imgType}>
            <Modal.Dialog>
                <Modal.Header>
                    <div style={{color : "black"}} className={'d-flex flex-column justify-content-start '}>
                        <span className={'label'}>How do you want to present your product?</span>
                        {/* <span className="" onClick={() => props.closeCallback(false)}> close</span> */}
                    </div>   
                </Modal.Header>
                <Modal.Body>
                        <div classname="row" style={{display: "inline-flex", color : "black"}}>
                            <div className={`squareIcon ${fields.imageType == 'square' ? "active" : ""}`} onClick={ (e) => handleChange({target : {value:"square"}} , 'imageType')} value="square">
                                <div className="">
                                    </div></div>
                            <div className={`rectangleIcon ${fields.imageType == 'horizontal' ? "active" : ""}`} onClick={ (e) => handleChange({target : {value:"vertical"}} , 'imageType')} value="vertical">                                
                                <div className="">
                                </div>
                            </div>
                        </div>    
                </Modal.Body> 
            </Modal.Dialog>
            </Modal>                   
        </div>
    )
}

Detail.defaultProps = defaultProps;

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

export default connect( mapStateToProps, mapDispatchToProps )( Detail );
