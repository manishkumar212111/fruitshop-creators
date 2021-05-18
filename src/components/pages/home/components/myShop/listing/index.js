import React, { useEffect, useState } from 'react'
import './index.scss'
import { connect } from "react-redux";
import { getProductByUserId , deleteProductById } from '../../../../../../actions/product';
import Shimmer from "../../../../../widgets/shimmerEffect";
import { Link } from 'react-router-dom';
import { NavItem } from 'react-bootstrap';


const Listing = (props) => {
    const [productList , setProductList] = useState([]);
    const [ settingIndex , setSettingIndex ] = useState(null);    
    useEffect(() => {
        setProductList(props.productList);
    }, [props.productList])

    useEffect(() => {
        props.getProductByUserId();
    }, [props.getProductByUserId])  

    const handleDeleteClick = (productId) => {
        props.deleteProductById(productId);
    }

    if(props.product_detail_loading){
        return <Shimmer />;
    }
    return (
        <div className="listingMain">

            <div className={'listingSec'}>
                <div className={'d-flex flex-column justify-content-start header'}>
                    <h1 className={'label'}>Listing</h1>
                    <p className={'text'}>Create and customize your product listing</p>
                </div>

                {productList.map((itm , index) => (
                    <div className="listingCard">
                    <div className="clearfix">
                        <div className="leftPanel">

                            <ul>
                                <li className="listTxt">{itm.brandName}</li>
                                <li className="listTxt">{itm.productName}</li>
                                <li className="listTxt">${itm.price}</li>
                                <li className="listTxt">{itm.productDescription}</li>
                                <li className="listTxt">{itm.promoCode}</li>
                                <li className="listTxt">{itm.url}</li>
                            </ul>

                        </div>
                         <div className="rightPanel">
                         <div className="listingRight">
                             {itm.imgUrl ? <img style={{float: "right"}} src={itm.imgUrl} width="100" height="100"></img> : <div className="imgContainer">
                               <><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-image-fill imgIcon" viewBox="0 0 16 16">
                                  <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"/>
                               </svg>

                               <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="currentColor" class="bi bi-plus-circle-fill impIconPlus" viewBox="0 0 16 16">
                                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                               </svg></>
                              </div>}
                              
                              <div className={"container"} onClick={() => setSettingIndex(settingIndex == index+1 ? null : index+1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-gear-wide-connected settingIc" viewBox="0 0 16 16">
                                    <path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434l.071-.286zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5zm0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78h4.723zM5.048 3.967c-.03.021-.058.043-.087.065l.087-.065zm-.431.355A4.984 4.984 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8 4.617 4.322zm.344 7.646.087.065-.087-.065z"/>
                                </svg>
                                </div>
                                {settingIndex == index+1 && <div class="setting-content">
                                    <ul>
                                        <li><Link to={`/home/edit/${itm.id}`}><span >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                        </svg> Edit</span></Link></li>
                                        <li style={{"color" : "red"}}><span onClick={() => handleDeleteClick(itm.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                            </svg>
                                        </span> Delete</li>
                                    </ul>
                                </div>}
                           </div>
                        </div>
                    </div>
                    
                </div>
                
                ))}

                    {/* <div className={'listingDiv'}>
                        <div className={'listConatiner'}>
                            <div className={'d-flex flex-row'}>
                                <div className={'list'}>
                                    <span>{itm.productName}faf</span>
                                    <span>{itm.brandName}fafaf</span>
                                    <span>{itm.productDescription}fafa</span>
                                    <span>{itm.promoCode}faf</span>
                                    <span>{itm.url}</span>
                                    
                                </div>
                                {itm.imgUrl ? <div className={'pic'}><img height="50" width="50" src={itm.imgUrl}></img></div> : <div className={'pic'}></div>}
                            </div>
                            <div className="d-flex justify-content-end">
                                    {settingIndex == index+1 && <div>
                                        <Link to={`/home/edit/${itm.id}`}><span >Edit</span></Link>
                                        <span onClick={() => handleDeleteClick(itm.id)}>Delete</span>
                                    </div>}
                                    <div onClick={() => setSettingIndex(settingIndex == index+1 ? null : index+1)}>Settings</div>

                            </div>
                        </div>                
                    </div> */}
                {/* 
                <div>
                    <Link to="/home/create"><button><mark>add icon</mark>Add New Listing</button></Link>
                </div>

                */}

            </div>
             <Link to="/home/create" className="addListingBtn">
                
                    + <i class="bi bi-plus"></i> Add New Listing
            </Link>
        </div>
    )
}

const mapStateToProps = ( state ) => ( {
    productList : state.product.productList,
    product_detail_loading : state.product.product_detail_loading
} );

const mapDispatchToProps = {
    getProductByUserId,
    deleteProductById
};

export default connect( mapStateToProps, mapDispatchToProps )( Listing );


