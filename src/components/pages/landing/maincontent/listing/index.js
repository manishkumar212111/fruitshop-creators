import React, { useState } from 'react'
import './index.scss'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteProductById } from '../../../../../actions/product';
import DefaultImage from '../../../../../assets/img/default-image.svg'
import Gear from '../../../../../assets/img/Gear.svg'
import DeleteIcon from '../../../../../assets/img/delete-icon.svg'
import EditIcon from '../../../../../assets/img/edit-icon.svg'


const ProductListing = (props) => {

    const { productList } = props
    const dispatch = useDispatch()
    const [ settingIndex , setSettingIndex ] = useState(null);

    const handleDeleteClick = (productId) => {
        dispatch(deleteProductById(productId))
    }

    return (
        <div className="product-card-wrapper">
            {productList.length && productList.map((item, index) => (
                <div className="product-card" key={item.id}>
                    <div className="product-detail-wrapper">
                        <p className="product-detail">{item.brandName}</p>
                        <p className="product-detail">{item.productName}</p>
                        <p className="product-detail">${item.price}</p>
                        {item.productDescription && <p dangerouslySetInnerHTML={{ __html: item.productDescription ? item.productDescription.replaceAll('&lt;' , '<') : 'product description' }} className="product-detail">
                        </p>}
                        <p className="product-detail">{item.promoCode}</p>
                        <p className="product-detail">{item.url}</p>
                    </div>
                    {item.imgUrl ?
                        <img src={item.imgUrl} width="100" height="100" className="product-img" alt=""></img>
                        :
                        <div className="default-image">
                            <img src={DefaultImage} alt=""></img>
                        </div>
                    }
                    <img src={Gear} className="gear-icon" onClick={() => setSettingIndex(settingIndex == index+1 ? null : index+1)} alt=""></img>
                    {settingIndex == index+1 && 
                        <div className="setting-content">
                             <ul className="setting-list">
                                <li className="first"><Link to={`/custom-listing/${item.id}`}>
                                    <img src={EditIcon} alt=""></img> Edit
                                </Link></li>
                                <li onClick={() => handleDeleteClick(item.id)}>
                                    <img src={DeleteIcon} alt=""></img> Delete
                                </li>
                             </ul>
                        </div>
                    }
                </div>
            ))}
        </div>
    )
}

export default ProductListing


