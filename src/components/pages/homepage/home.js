import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { connect } from 'react-redux';
import Marquee from "react-fast-marquee";
import Login from "../../widgets/Login";
import Register from "../../widgets/Register";
import ForgotPassword from "../../widgets/forgotPassword";
import Social from "../../widgets/social";
import { setLocalStorageItem , getUserData } from "../../../utils/globals";
import { loginUser, registerUser, sendResetLink, UpdateUserById } from "../../../actions/auth";
import "./home.scss"
import 'swiper/swiper.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import BannerImg1 from '../../../assets/img/banner/1.png'
import BannerImg2 from '../../../assets/img/banner/2.png'
import BannerImg3 from '../../../assets/img/banner/3.png'
import BannerImg4 from '../../../assets/img/banner/4.png'
import ContentImg1 from '../../../assets/img/content/1.png'
import ContentImg2 from '../../../assets/img/content/2.png'
import ContentImg3 from '../../../assets/img/content/3.png'
import ContentImg4 from '../../../assets/img/content/4.png'

// const sponserImages = [
//  "https://ik.imagekit.io/lcq5etn9k/productlisting/whole-foods_sWpde6_mP.png",
//  "https://ik.imagekit.io/lcq5etn9k/productlisting/urban-outfitters_OmXKc9qtv.png",
//  "https://ik.imagekit.io/lcq5etn9k/productlisting/ulta_-faUCrwCi.png",
//  "https://ik.imagekit.io/lcq5etn9k/productlisting/taks-fifth-avenue_rZDEKYSPj.png",
//  "https://ik.imagekit.io/lcq5etn9k/productlisting/sephora_UrJpy51sZ.png",
//  "https://ik.imagekit.io/lcq5etn9k/productlisting/nordstrom_z9GZaq5i52.png",
//  "https://ik.imagekit.io/lcq5etn9k/productlisting/neiman-marcus_VRNNwR76p.png",
//  "https://ik.imagekit.io/lcq5etn9k/productlisting/hot-topic_gBNl-ZAzWh.png",
//  "https://ik.imagekit.io/lcq5etn9k/productlisting/erewhon_RQa3SALZd.png",
// ]

const Homepage = (props) => {

  
    const history = useHistory();
    const [popupText , setShowPopupText] = useState("");
    const [isMobile, setIsMobile] = useState(false)

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
      setIsMobile(window.innerWidth < 768 ? true : false);
    }, [])
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

    const gotoRegister = () => {
      history.push("/#register")
    }

    return(

      <div className="home">
        <div className="banner">
            <div>
              <img src={BannerImg1} alt=""/>
              <img src={BannerImg2} alt=""/>
            </div>
            <div className="main">
              <p className="title">
                Starting your own retail business has never been easier
              </p>
              <p className="description">
                Find and sell brands from top retailers immediately. $0 to get started.
              </p>
              <button onClick={gotoRegister}>JOIN SUPERFRUIT FREE</button>
            </div>
            <div>
              <img src={BannerImg3}  alt=""/>
              <img src={BannerImg4}  alt=""/>
            </div>
          </div>
          
          <Marquee speed="100" className="sponsors">
            <img src="https://ik.imagekit.io/lcq5etn9k/productlisting/whole-foods_sWpde6_mP.png" alt="" />
            <img src="https://ik.imagekit.io/lcq5etn9k/productlisting/urban-outfitters_OmXKc9qtv.png" alt="" />
            <img src="https://ik.imagekit.io/lcq5etn9k/productlisting/ulta_-faUCrwCi.png" alt="" />
            <img src="https://ik.imagekit.io/lcq5etn9k/productlisting/taks-fifth-avenue_rZDEKYSPj.png" alt="" />
            <img src="https://ik.imagekit.io/lcq5etn9k/productlisting/sephora_UrJpy51sZ.png" alt="" />
            <img src="https://ik.imagekit.io/lcq5etn9k/productlisting/nordstrom_z9GZaq5i52.png" alt="" />
            <img src="https://ik.imagekit.io/lcq5etn9k/productlisting/neiman-marcus_VRNNwR76p.png" alt="" />
            <img src="https://ik.imagekit.io/lcq5etn9k/productlisting/hot-topic_gBNl-ZAzWh.png" alt="" />
            <img src="https://ik.imagekit.io/lcq5etn9k/productlisting/erewhon_RQa3SALZd.png" alt="" />
          </Marquee>
          <div className="content">
            <div className="commerce">
              <p className="title">
                Commerce<br/>
                Transformed
              </p>
              <p className="description">
                Superfruit is a place where people come to build lasting businesses.<br/><br/>
                We’ve transformed every aspect of commerce so our store owners can focus on what they are best at — telling
                their story to the world.<br/><br/>
                Find and add products directly to your Superfruit store so you can start selling right away. We vetted thousands
                of brands from top retailers so you don’t have to. Run your business without the hassle of managing inventory,
                packaging, or shipping. Products are directly sent from Superfruit to your customer in 2 to 14 days. Generate
                healthy income with 20% profit on every sale. We’ll also help with brand deals and collaborations to get the
                most maximize how much you can earn.<br/>
                Learn more about how Superfruit works below:
              </p>
            </div>
            <div className="superfruit">
              <div className="left">
                <p className="title">
                  Superfruit is for everyone
                </p>
                <p className="description">
                  Anyone can join Superfruit and access thousands of diverse brands with profit margins you won’t find anywhere
                  else. We take care of retail logistics free of charge, so you never have to worry about the cost of running
                  your business.
                </p>
              </div>
              {isMobile ? 
              <div className="mobileSwiper">
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  loop={true}
                  onSlideChange={() => console.log('slide change')}
                  onSwiper={(swiper) => console.log(swiper)}
                >
                  <SwiperSlide>
                    <div className="item">
                      <img src={ContentImg1} alt=""/>
                      <p className="title">
                        1. Create & Curate
                      </p>
                      <ul>
                        <li>Personalize your store’s appearance and content</li>
                        <li>Pick products to sell or create your own listing</li>
                        <li>Launch your business in minutes, not weeks</li>
                      </ul>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="item">
                      <img src={ContentImg2} alt=""/>
                      <p className="title">
                        2. Share
                      </p>
                      <ul>
                        <li>Create content to inspire fans to visit your store</li>
                        <li>Make it easy for your fans to find your store by
                          adding links to your store in your content and profile</li>
                      </ul>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="item">
                      <img src={ContentImg3} />
                      <p className="title">
                        3. Get results
                      </p>
                      <ul>
                        <li>Tap into exclusive first-party insights on audience demos,, growth trends, best-performing stores and
                          much more</li>
                        <li>Generate custom reports on your store’s performance</li>
                        <li>Get paid immediately through Stripe</li>
                      </ul>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="item">
                      <img src={ContentImg4} alt=""/>
                      <p className="title">
                        4. Optimize
                      </p>
                      <ul>
                        <li>Add or remove products in your store</li>
                        <li>Customize your product image and description</li>
                        <li>Feature your own brand, brand deals, and brand collaborations</li>
                      </ul>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div> 
              : 
              <div className="right">
              <div className="col">
                <div className="item">
                  <img src={ContentImg1} alt=""/>
                  <p className="title">
                    1. Create & Curate
                  </p>
                  <ul>
                    <li>Personalize your store’s appearance and content</li>
                    <li>Pick products to sell or create your own listing</li>
                    <li>Launch your business in minutes, not weeks</li>
                  </ul>
                </div>
                <div className="item">
                  <img src={ContentImg3} />
                  <p className="title">
                    3. Get results
                  </p>
                  <ul>
                    <li>Tap into exclusive first-party insights on audience demos,, growth trends, best-performing stores and
                      much more</li>
                    <li>Generate custom reports on your store’s performance</li>
                    <li>Get paid immediately through Stripe</li>
                  </ul>
                </div>
              </div>
              <div className="col">
                <div className="item">
                  <img src={ContentImg2} alt=""/>
                  <p className="title">
                    2. Share
                  </p>
                  <ul>
                    <li>Create content to inspire fans to visit your store</li>
                    <li>Make it easy for your fans to find your store by
                      adding links to your store in your content and profile</li>
                  </ul>
                </div>
                <div className="item">
                  <img src={ContentImg4} alt=""/>
                  <p className="title">
                    4. Optimize
                  </p>
                  <ul>
                    <li>Add or remove products in your store</li>
                    <li>Customize your product image and description</li>
                    <li>Feature your own brand, brand deals, and brand collaborations</li>
                  </ul>
                </div>
              </div>
            </div>}
              
            </div>
          </div>
          <div className="footer">
            <div className="main">
              Earn more.<br/>
              Dream more.<br/>
              Be more.
            </div>
            <ul>
              <li>
                <a href="#">Terms of Service</a>
                <a href="#">Privacy Policy</a>
                <a href="#">FAQ</a>
              </li>
            </ul>
          </div>

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
