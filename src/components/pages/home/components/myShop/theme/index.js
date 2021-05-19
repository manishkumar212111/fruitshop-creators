import React, { useEffect, useState } from 'react'
import './index.scss'
import { getUserData , getLocalStorageItem, setLocalStorageItem } from "../../../../../../utils/globals";
import { colors } from "../../../../../../configs"
import axios from "axios"
import { Modal } from 'react-bootstrap';
import { UpdateUserById } from '../../../../../../actions/auth';
import { connect } from "react-redux";
import { REACT_APP_SERVER_URL } from "../../../../../../config";
const dotenv = require("dotenv");
dotenv.config();

const axiosInstance = axios.create({
  baseURL: REACT_APP_SERVER_URL,
})

// const getLoggedInUserToken = () => {
//     return typeof localStorage !== 'undefined' && localStorage.getItem('userDetail') && JSON.parse(localStorage.getItem('userDetail')).tokens && JSON.parse(localStorage.getItem('userDetail')).tokens.access.token;
// }


const Theme = (props) => {
    const [selectedLogo, setSelectedLogo] = useState([])
    const [selectedBanner, setSelectedBanner] = useState([])
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
        axiosInstance.post(process.env.REACT_APP_SERVER_URL + "/api/file/upload?type="+type+"&userId="+getUserData('id'), formData, {
            headers: {
                'content-type':'application/json',
                // 'Authorization' : 'Bearer ' + getLoggedInUserToken()
            }
            // onUploadProgress: data => {
            //     setProgress(Math.round((100 * data.loaded) / data.total))
            // },
        }).then(res => {
            let userDetail = getLocalStorageItem('userDetail');
            userDetail.user.style[type] = res.data;
            setLocalStorageItem('userDetail', userDetail);
            setStyle(userDetail.user.style);

        }).catch(err => {
            // cb(err.response);
        });        
    }

    const setColor = (itm) => {
        let fld= style;
        fld.buttonColor = itm;
        setStyle(fl => ({...fl , ...fld}))
    }

    const handleButtonColor = () => {
        props.UpdateUserById(getUserData('id') , {style : style});
        props.closeCallback(false);
    }
    return (
        <Modal show={true} onHide={props.closeCallback} style={{color : "black"}}>
            <Modal.Dialog>
                <div className={'theme'}>

                <Modal.Header closeButton>
                    <div className={'d-flex flex-column justify-content-start '}>
                        <span className={'label'}>Theme</span>
                        <span className={'text'}>Customize your logo,banner,and buttons</span>
                        {/* <span className="" onClick={() => props.closeCallback(false)}> close</span> */}
                    </div>   
                </Modal.Header>
                <Modal.Body>
                    <div className={'shopLogo'}>
                        {!style.logoUrl ? <div className={'circleIcon'}></div> : 
                        <div className={'circleIcon'}><img className="rounded-circle" width="200" height="200" src={style.logoUrl}></img></div>
                        }
                        <div class="image-upload">
                            <label for="file-input">
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
                    <div className={'shopBanner'}>
                        {!style.bannerUrl ? <div className={'rectangleIcon'}></div> : 
                            <div className={'rectangleIcon'}><img className="rounded" width="300" height="200" src={style.bannerUrl}></img></div>
                        }
                        <div class="image-upload">
                            <label for="file-input-banner">
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
                    <hr/>
                    <div className="d-flex justify-content-center">
                        <div className="button-color row mb-3">
                            {colors.map((itm) => (
                                <span className="rounded-circle">
                                    <div className={`round-box ${style.buttonColor == itm ? "active" : ""}`} style={{"background-color" : itm, border : style.buttonColor == itm ? "5px solid grey" : "" }} onClick={() => setColor(itm)}></div>
                                    {/* {style.buttonColor == itm && <span>Active</span>} */}
                                </span>
                            ))}
                            
                        </div>
                    </div>
                    {style.buttonColor && <div className={'d-flex justify-content-center'}>
                        <button className={'button'} onClick={handleButtonColor}>Update Button color</button>
                    </div>}
                </Modal.Body>
                </div>
            </Modal.Dialog>
        </Modal>                        
    )
}

const mapStateToProps = ( state ) => ( {
    update_user_loading : state.auth.update_user_loading
} );

const mapDispatchToProps = {
    UpdateUserById
};

export default connect( mapStateToProps, mapDispatchToProps )( Theme );

