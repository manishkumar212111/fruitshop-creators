import React, { useEffect, useState } from "react";
import Login from "../widgets/Login";
import {loginUser , registerUser , sendResetLink, UpdateUserById} from "../../actions/auth";
import {connect} from 'react-redux';
import Register from "../widgets/Register";
import Social from "../widgets/social";
import FileUpload from "../widgets/fileUpload";
import ForgotPassword from "../widgets/forgotPassword";
import { setLocalStorageItem , getUserData } from "../../utils/globals";
import "./home.scss"
import { useHistory } from "react-router";
const Home = (props) => {
    const history = useHistory();
    const [popupText , setShowPopupText] = useState("");
    useEffect(() => {
        if(props.userDetail && props.userDetail.user && props.userDetail.user.email){
            setLocalStorageItem('userDetail' , props.userDetail);
            // setShowPopupText('social');
            
            if(!(props.userDetail.user.category && props.userDetail.user.category.length > 0)){
                setShowPopupText('social');
            } else {
                setShowPopupText('');
                setTimeout(() =>{
                    window.location.href='/home';
                },1000)
            }
        }
    }, [props.userDetail]);

    useEffect(() => {
      if(!popupText){
        const users = getUserData('id')
        if(users){
          document.body.style.backgroundColor = 'white';
          history.push("/home");
        } else {
          document.body.style.backgroundColor = 'black';
        }
      }
    })
    useEffect(() => {
        setShowPopupText(
            props.location.hash == '#login' ? "login" : props.location.hash == '#register' ? 'register' : props.location.hash == '#forgot' ? "forgot" : "");
    }, [props.location.hash]);
    const SubmitCb = (obj) => {
        props.loginUser(obj);
    }

    const registerSubmitCb = (obj) => {
        props.registerUser(obj);
    }

    const handleSocialClick = (social_url, category) => {
        if(!social_url){
            window.location.href='/home';
            return;
        }
        props.UpdateUserById(getUserData('id') , { social_url : social_url , category : category})
    }

    const handleForgotPassword = (field) => {
        props.sendResetLink(field);
    }
    return(

        <div className={"home"}>
            <section className="hero-banner">
              <div className="container">
                <div className="banner-content">
                  <h2 className="big-text">An online store</h2>
                  <h2 className="big-text">made just</h2>
                  <h2 className="big-text bordered-text">for you</h2>
                  <div className="banner-btn">
                    <a href="#">claim your username</a>
                  </div>
                </div>
              </div>
            </section>

            <section className="second-section">
              <div className="container">
                <h3 className="medium-text">earn more. dream more. be more.</h3>
                <h2 className="big-text">The ultimate</h2>
                <h2 className="big-text">boutique maker</h2>

                <div className="sec-text">
                  <h4 className="section-title">Connect your audience to everything you sell with just one store</h4>

                  <div className="row second-wrapper">
                    <div className="col-lg-4 mb-5">
                      <h2 className="big-text bordered-text">25%</h2>
                      <p>commission on all products</p>
                    </div>
                    <div className="col-lg-4 mb-5">
                      <h2 className="big-text bordered-text">0</h2>
                      <p>cost and effort on shipping, packing, and holding inventory</p>
                    </div>
                    <div className="col-lg-4">
                      <h2 className="big-text bordered-text">1000+</h2>
                      <p>products from the best brands across 5 categories to help you express your full self</p>
                    </div>
                  </div>
                </div>
              </div>
        </section>




            {/* <button onClick={() => setShowPopupText('login')}>Login</button>
            <button onClick={() => setShowPopupText('register')}>Register</button> */}
            {popupText == 'forgot' && <ForgotPassword SubmitCb = {handleForgotPassword} login_user_loading={props.login_user_loading}/>}
            {popupText == 'register' && <Register login_user_loading={props.login_user_loading} SubmitCb = {registerSubmitCb }/>}
            {popupText == 'login' && <Login SubmitCb={SubmitCb} login_user_loading={props.login_user_loading}/>}
            {popupText == 'social' && <Social categories = {props.userDetail.user.category} social_url = {props.userDetail.user.social_url} handleFinish={handleSocialClick} />}
        </div>

    )
}

const mapStateToProps = ( state ) => ( {
    userDetail: state.auth.userDetail,
    login_user_loading: state.auth.login_user_loading,
    update_user_loading : state.auth.update_user_loading
} );

const mapDispatchToProps = {
    loginUser,
    registerUser,
    UpdateUserById,
    sendResetLink
};

export default connect( mapStateToProps, mapDispatchToProps )( Home );
