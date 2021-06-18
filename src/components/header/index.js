import React, { useEffect, useState } from "react"
import './index.scss'
import { getUserData , clearUserData} from "../../utils/globals"
import { Link, useHistory } from "react-router-dom"
import Logo from '../../assets/img/d-logo.png'
import MobileLogo from '../../assets/img/logo.png'
import WhiteLogo from '../../assets/img/white-logo.svg'
import SidebarIcon from '../../assets/img/hambuger.png'
import CloseIcon from '../../assets/img/close.svg'

const Header = (props) => {
  const history = useHistory();
  const [isLogin , setLogin] = useState(getUserData('id'));
  const [showSideMenu , setShowSideMenu] = useState(false);
  const [showSidebarMenu, setShowSidebarMenu] = useState(false);
  
  useEffect(() => {
    const users = getUserData('id');
    setLogin(users);
    if(users){
      document.body.style.backgroundColor = '#EED9C3';
    }
  }, [])

  const handleLogout = () => {
    setShowSideMenu(false)
    clearUserData();
    setTimeout(() => {
      setLogin(false);
      history.push("/")
    },500) 
  }

  const toggleMenu = () => {
    setShowSideMenu(!showSideMenu)
  }

  const toggleSidebarMenu = () => {
    setShowSidebarMenu(!showSidebarMenu)
  }

  const gotoMyAccount = () => {
    history.push("/my-account")
  }

  const gotoLanding = () => {
    history.push("/landing")
  }

  const gotoLogin = () => {
    setShowSidebarMenu(false)
    history.push("/#login")
  }

  const gotoRegister = () => {
    setShowSidebarMenu(false)
    history.push("/#register")
  }

  return (
    <>
    <header id="header" className='fixed-top' >
      {!isLogin &&
        <div className="header">
          <div className="desktop">
            <div className="left">
              <img src={Logo} alt="logo"  style={{ "marginTop" : "0px", width : "130px", height : "71px"}}/>
              <ul>
                <li>
                  <a href="https://superfruit.formstack.com/forms/owners">For creators</a>
                  <a href="https://superfruit.formstack.com/forms/business">For brands</a>
                  <a href="https://superfruit.formstack.com/forms/support">For shoppers</a>
                </li>
              </ul>
            </div>
            <div className="right">
              <a href="#login">Log In</a>
              <a href="#register">Claim your store</a>
            </div>
          </div>
          <div className="mobile">
            <img src={MobileLogo} alt="" style={{ "marginTop" : "0px", width : "130px", height : "93px"}}/>
            <img src={SidebarIcon} onClick={() => toggleSidebarMenu()} alt=""/>
          </div>
        </div>
      }

      {isLogin &&
        <div className="header-wrapper">
          <img src={Logo} className="desktop-logo" onClick={gotoLanding} alt="" style={{ "marginTop" : "-40px", width : "130px", height : "93px"}}></img>
          <img src={MobileLogo} style={{ "marginTop" : "-41px", width : "172px", height : "128px"}} className="mobile-logo" alt=""></img>
          <img src={SidebarIcon}  style={{ "marginTop" : "-12px", width : "42px", height : "42px"}} className="menu-icon" onClick={() => toggleMenu()} alt=""></img>
        </div>
      }
    </header>
    
    {showSideMenu &&
      <div className="side-menu">
        <img src={CloseIcon} className="close-button" onClick={() => toggleMenu()} alt=""></img>
        <img src={WhiteLogo} className="white-logo" alt=""></img>
        <p className="menu-item" onClick={gotoMyAccount}>My account</p>
        <hr className="menu-line"/>
        <p className="menu-item" onClick={handleLogout}>Log out</p>
      </div>
    }

    {showSidebarMenu &&
      <div id="menu">
        <div className="header">
          <img className="logo" src={WhiteLogo} alt="" />
          <img src={CloseIcon} alt="" onClick={() => toggleSidebarMenu()} />
        </div>

        <ul>
          <li>
            <a href="https://superfruit.formstack.com/forms/owners"target="_blank">For creators</a>
          </li>
          <li>
            <a href="https://superfruit.formstack.com/forms/business"target="_blank">For brands</a>
          </li>
          <li>
            <a href=" https://superfruit.formstack.com/forms/support"target="_blank">For shoppers</a>
          </li>
          <li>
            <a onClick={gotoLogin}>Log in</a>
          </li>
          <li>
            <a onClick={gotoRegister}>Claim your store</a>
          </li>
        </ul>
      </div>
    }
    </> 
  );
};

export default Header;
