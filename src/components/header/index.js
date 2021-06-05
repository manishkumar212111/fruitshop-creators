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

  const gotoMyAccount = () => {
    history.push("/my-account")
  }

  const gotoLanding = () => {
    history.push("/landing")
  }

  return (
    <>
    <header id="header" className='fixed-top' >
      {!isLogin &&
        <div className="container d-flex align-items-center">
          <div className="logo mr-auto">
            <h1><a href="/"><span>Superfruit</span></a></h1>
          </div>

          <div className="login">
            <Link to="#login">Login</Link>
          </div>
          <div className="clearfix"></div>
          <div className="row">
            <div className="col-md-12">
            </div>
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
    </> 
  );
};

export default Header;
