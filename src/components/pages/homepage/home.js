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
import Soko from '../../../assets/img/soko.jpg'

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
              Starting your own store<br className="line-blocker"/>has never been easier
              </p>
              <p className="description">
              Pick your favorite products from top retailers. Earn extra cash with every sale.
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
                Transformed For<br/>
                Creators and Brands
              </p>
              <p className="description">
                <b>CREATORS</b><br/>
                Superfruit helps creators monetize their content with commerce.
                <ul style={{marginBottom: 0}}>
                  <li>Curate your own retail shop with products you love.</li>
                  <li>Earn 20% profit on every sale.</li>
                  <li>No cost, no hassle, no risk.</li>
                </ul><br/>
                <b>BRANDS</b><br/>
                Superfruit helps brands build a real relationship with creators.
                <ul>
                  <li>We initiate communication with creators you love. We enable deep and lasting partnerships.</li>
                  <li>Leverage in-depth data to drive maximum campaign performance and sales.</li>
                </ul>
              </p>
            </div>
            <div className="superfruit">
              <div className="left">
                <p className="title">
                  Superfruit is for everyone
                </p>
                <p className="description">
                We make commerce better for everyone, so creators and brands can focus on what they do best — growing with unparralleled creativity, speed, and drive.
                </p>
              </div>
              {isMobile ? 
              <div className="mobileSwiper">
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1.15}
                  loop={true}
                >
                  <SwiperSlide>
                    <div className="item">
                      <img src={ContentImg1} alt=""/>
                      <p className="title">
                        1. Create & Curate
                      </p>
                      <ul>
                        <li>Create a store that looks and feels like you</li>
                        <li>Add products you love</li>
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
                        <li>Promote your store launch</li>
                        <li>Connect your store to your social media</li>
                        <li>Share products with your community</li>
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
                        <li>Get 20% profit on every sale</li>
                        <li>We handle the rest including shipping, customer support, vendor relationships, and holding inventory.</li>
                        <li>Tap into exclusive first-party insights on audience demos, growth trends, best-performing stores and much more</li>
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
                        <li>Optimize your catalog by adding, removing, or editing your listings to your taste</li>
                        <li>Feature your own brands, brand deals, and collaborations</li>
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
                        <li>Create a store that looks and feels like you</li>
                        <li>Curate your catalog with products you love</li>
                        <li>Launch your business in minutes, not weeks</li>
                      </ul>
                </div>
                <div className="item">
                  <img src={ContentImg3} />
                  <p className="title">
                    3. Get results
                  </p>
                      <ul>
                        <li>Get 20% profit on every sale</li>
                        <li>We handle the rest including shipping, customer support, vendor relationships, and holding inventory.</li>
                        <li>Tap into exclusive first-party insights on audience demos, growth trends, best-performing stores and much more</li>
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
                        <li>Promote your store launch</li>
                        <li>Connect your store to your social media</li>
                        <li>Share products with your community</li>
                      </ul>
                </div>
                <div className="item">
                  <img src={ContentImg4} alt=""/>
                  <p className="title">
                    4. Optimize
                  </p>
                      <ul>
                        <li>Optimize your catalog by adding, removing, or editing your listings to your taste</li>
                        <li>Feature your own brands, brand deals, and collaborations</li>
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
                <a href="https://www.notion.so/joinguppy/Terms-of-Services-05d20bf0aebc4c8bbf435edd8d429a13"target="_blank">Terms of Service</a>
                <a href="https://www.notion.so/joinguppy/Privacy-Policy-77c1bac7873f46868a410b109e1312c4"target="_blank">Privacy Policy</a>
                <a href="https://www.notion.so/joinguppy/FAQ-e8cfcca57e6b4c779c53c81ed7ef9803"target="_blank">FAQ</a>
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
