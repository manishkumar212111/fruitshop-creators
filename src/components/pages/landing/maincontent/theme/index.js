import React, { useEffect, useState } from 'react'
import './index.scss'
import { getUserData , getLocalStorageItem, setLocalStorageItem } from "../../../../../utils/globals";
import axios from "axios"
import { UpdateUserById } from '../../../../../actions/auth';
import { connect } from "react-redux";
import { REACT_APP_SERVER_URL } from "../../../../../config";
import CameraIcon from '../../../../../assets/img/Camera.svg'
import Iamge from '../../../../../assets/img/showcase.jpg'

const dotenv = require("dotenv");
dotenv.config();

const axiosInstance = axios.create({
  baseURL: REACT_APP_SERVER_URL,
})


const Theme = () => {

    const [style , setStyle] = useState({});
    
    useEffect(() => {
        let obj = getUserData('style');
        if(!obj){
            window.href="/";
        } else {
            setStyle(obj);
        }                  
    }, []);

    const handleLogoSubmit = (files, type) => {
        // e.preventDefault() //prevent the form from submitting
        let formData = new FormData()
        formData.append("file", files[0])
        axiosInstance.post(process.env.REACT_APP_SERVER_URL + "api/file/upload?type="+type+"&userId="+getUserData('id'), formData, {
            headers: {
                'content-type':'application/json',
            }
        }).then(res => {
            let userDetail = getLocalStorageItem('userDetail');
            userDetail.user.style[type] = res.data;
            setLocalStorageItem('userDetail', userDetail);
            setStyle(userDetail.user.style);

        }).catch(err => {
            // cb(err.response);
        });        
    }

    return (
        <div className="theme-card-wrapper">
            <p className="title">Theme</p>
            <p className="description">Customize your logo and banner</p>
            <div className='shopLogo'>
                {!style.logoUrl ? 
                    <div className='circleIcon'>
                        <img src={CameraIcon}></img>
                    </div> 
                    : 
                    <div className='circleIcon'>
                        <img width="200" height="200" src={style.logoUrl} alt=""></img>
                    </div>
                }
                <div className="image-upload">
                    <label htmlFor="file-input">
                        <span><u>Update shop logo</u></span>
                    </label>

                    <input 
                        id="file-input"
                        type="file"
                        onChange={e => {
                            handleLogoSubmit(e.target.files , "logoUrl")
                        }}
                    />
                </div>
            </div>
            <hr/>
            <div className='shopBanner'>
                {!style.bannerUrl ? 
                    <div className='rectangleIcon'>
                        <img src={CameraIcon} alt=""></img>
                    </div> 
                    : 
                    <div className='rectangleIcon'>
                        <img width="400" height="216" src={style.bannerUrl} alt="" className="img-style"></img>
                    </div>
                }
                <div className="image-upload">
                    <label htmlFor="file-input-banner">
                        <span><u>Update shop banner (optional)</u></span>
                    </label>

                    <input 
                        id="file-input-banner"
                        type="file"
                        onChange={e => {
                            handleLogoSubmit(e.target.files , "bannerUrl")
                        }}
                    />
                </div>
            </div>
        </div>                     
    )
}

const mapStateToProps = ( state ) => ( {
    update_user_loading : state.auth.update_user_loading
} );

const mapDispatchToProps = {
    UpdateUserById
};

export default connect( mapStateToProps, mapDispatchToProps )( Theme );

