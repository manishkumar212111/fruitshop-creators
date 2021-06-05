import React, { useEffect, useState } from "react";
import { loginUser, registerUser, sendResetLink, UpdateUserById } from "../../../actions/auth";
import { connect } from 'react-redux';
import Login from "../../widgets/Login";
import Register from "../../widgets/Register";
import ForgotPassword from "../../widgets/forgotPassword";
import Social from "../../widgets/social";
import { setLocalStorageItem , getUserData } from "../../../utils/globals";
import "./home.scss"
import { useHistory } from "react-router";

const Homepage = (props) => {
  
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
                    window.location.href='/landing';
                },1000)
            }
        }
    }, [props.userDetail]);

    useEffect(() => {
      if(!popupText){
        const users = getUserData('id')
        if(users){
          // document.body.style.backgroundColor = 'white';
          history.push("/landing");
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
            window.location.href='/landing';
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
              <div className="container-fluid">
                <div className="banner-content">
                  <h2 className="banner-big-text">An online store made just</h2>
                  <h2 className="banner-big-text bordered-text">for you</h2>
                  <div className="banner-btn">
                    <a href="#">claim your username</a>
                  </div>
                </div>
                <img className="banner-image" src="https://ik.imagekit.io/lcq5etn9k/productlisting/home-banner_isZHOveiw.png" alt="" />
              </div>
            </section>

            <section className="our-brands">
              <div className="container-fluid">
                <div className="brand-text">
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

            <section className="second-section">
              <div className="container-fluid">
                <h3 className="medium-text">earn more. dream more. be more.</h3>
                <h2 className="big-text">The easiest way to start your own boutique</h2>

                <div className="sec-text">
                  <h4 className="section-title">Connect your audience to everything you sell with just one store</h4>

                  <div className="row second-wrapper">
                    <div className="col-lg-4 mb-5">
                      <h2 className="big-text bordered-text">20%</h2>
                      <p>profit on all products sold</p>
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

export default connect( mapStateToProps, mapDispatchToProps )( Homepage );
