import React, { useEffect, useState } from "react"
import './index.scss'
import { getUserData , clearUserData} from "../../utils/globals"
import { Link, useHistory } from "react-router-dom"
import Logo from '../../assets/img/logo.png'
import MobileLogo from '../../assets/img/mobile-logo.svg'
import WhiteLogo from '../../assets/img/white-logo.svg'
import SidebarIcon from '../../assets/img/sidebar-icon.svg'
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
              <img src={Logo} alt="logo"/>
              <ul>
                <li>
                  <a href="#">For store owners</a>
                  <a href="#">For vendors</a>
                  <a href="#">For shoppers</a>
                </li>
              </ul>
            </div>
            <div className="right">
              <a href="#login">Log In</a>
              <a href="#register">Claim your store</a>
            </div>
          </div>
          <div className="mobile">
            <img src={MobileLogo} alt="" />
            <img src={SidebarIcon} onClick={() => toggleSidebarMenu()} alt=""/>
          </div>
        </div>
      }

      {isLogin &&
        <div className="header-wrapper">
          <img src={Logo} className="desktop-logo" onClick={gotoLanding} alt=""></img>
          <img src={MobileLogo} className="mobile-logo" alt=""></img>
          <img src={SidebarIcon} className="menu-icon" onClick={() => toggleMenu()} alt=""></img>
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
            <a href="#">For store owners</a>
          </li>
          <li>
            <a href="#">For vendors</a>
          </li>
          <li>
            <a href="#">For shoppers</a>
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
