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
          // document.body.style.backgroundColor = 'white';
          history.push("/home");
        } else {
          // document.body.style.backgroundColor = '#ee7843';
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
            <section class="hero-banner">
              <div class="container-fluid">
                <div class="banner-content">
                  <h2 class="banner-big-text">An online store made just</h2>
                  <h2 class="banner-big-text bordered-text">for you</h2>
                  <div class="banner-btn">
                    <a href="#">claim your username</a>
                  </div>
                </div>
                <img class="banner-image" src="https://ik.imagekit.io/lcq5etn9k/productlisting/home-banner_isZHOveiw.png" alt="" />
              </div>
            </section>

            <section class="our-brands">
              <div class="container-fluid">
                <div class="brand-text">
                  <h3>Offer brands sold at top retailers in your own store:</h3>
                </div>
                <ul>
                  <li><img src="https://ik.imagekit.io/lcq5etn9k/productlisting/whole-foods_sWpde6_mP.png" alt="" /></li>
                  <li><img src="https://ik.imagekit.io/lcq5etn9k/productlisting/urban-outfitters_OmXKc9qtv.png" alt="" /></li>
                  <li><img src="https://ik.imagekit.io/lcq5etn9k/productlisting/ulta_-faUCrwCi.png" alt="" /></li>
                  <li><img src="https://ik.imagekit.io/lcq5etn9k/productlisting/taks-fifth-avenue_rZDEKYSPj.png" alt="" /></li>
                  <li><img src="https://ik.imagekit.io/lcq5etn9k/productlisting/sephora_UrJpy51sZ.png" alt="" /></li>
                  <li><img src="https://ik.imagekit.io/lcq5etn9k/productlisting/nordstrom_z9GZaq5i52.png" alt="" /></li>
                  <li><img src="https://ik.imagekit.io/lcq5etn9k/productlisting/neiman-marcus_VRNNwR76p.png" alt="" /></li>
                  <li><img src="https://ik.imagekit.io/lcq5etn9k/productlisting/hot-topic_gBNl-ZAzWh.png" alt="" /></li>
                  <li><img src="https://ik.imagekit.io/lcq5etn9k/productlisting/erewhon_RQa3SALZd.png" alt="" /></li>
                </ul>
              </div>
            </section>

            <section class="second-section">
              <div class="container-fluid">
                <h3 class="medium-text">earn more. dream more. be more.</h3>
                <h2 class="big-text">The easiest way to start your own boutique</h2>

                <div class="sec-text">
                  <h4 class="section-title">Connect your audience to everything you sell with just one store</h4>

                  <div class="row second-wrapper">
                    <div class="col-lg-4 mb-5">
                      <h2 class="big-text bordered-text">20%</h2>
                      <p>profit on all products sold</p>
                    </div>
                    <div class="col-lg-4 mb-5">
                      <h2 class="big-text bordered-text">0</h2>
                      <p>cost and effort on shipping, packing, and holding inventory</p>
                    </div>
                    <div class="col-lg-4">
                      <h2 class="big-text bordered-text">1000+</h2>
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
