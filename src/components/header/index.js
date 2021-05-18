import React, { useEffect, useState } from "react";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import './index.scss'
import  Tab from "../pages/home/components/tab/tab";
import { getUserData , clearUserData} from "../../utils/globals"
import { Link, useHistory } from "react-router-dom";
const Header = (props) => {
  const history = useHistory();
  const [isLogin , setLogin] = useState(getUserData('id'));
  
  useEffect(() => {
    const users = getUserData('id');
    setLogin(users);
    if(users){
      document.body.style.backgroundColor = 'white';
    } else {
      document.body.style.backgroundColor = 'black';
    }
  })

  const handleLogout = () => {
    clearUserData();
    setTimeout(() => {
      setLogin(false);
      history.push("/");
    },500) 
  }

  const userIcon = <div style={{width:'40px', height:'40px',borderRadius:'25px',backgroundColor:'white'}} ><i class="fa fa-user" aria-hidden="true"></i>
  </div>

  return (
    <>

    
  <header id="header" className="fixed-top">
    <div className="container d-flex align-items-center">

      <div className="logo mr-auto">
        <h1><a href="/"><span>Superfruit</span></a></h1>
      </div>

      {!isLogin ? <div className="login">
        <Link to="#login">Login</Link>
      </div> : <NavDropdown title={userIcon} id="collasible-nav-dropdown" left>
      <NavDropdown.Item href="/my-account">My Account</NavDropdown.Item>
              <NavDropdown.Item to="#" onClick={handleLogout}>
                Logout
              </NavDropdown.Item>
              

      </NavDropdown>
            }
      <div className="clearfix"></div>
      <div className="row">
        <div className="col-md-12">
         
        </div>
      </div>
    </div>
    
    {isLogin && <div className="container d-flex align-items-center">
      <div className="headerTab"><Tab /> </div>
    </div>}
  </header>



    {/*isLogin ? <><Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <NavDropdown title={userIcon} id="collasible-nav-dropdown" left>
              <NavDropdown.Item href="/my-account">My Account</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Logout
              </NavDropdown.Item>
              
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Tab /> </>
      : <Navbar>
        <Nav>
          <Nav.Link href="/#login">
            Login
          </Nav.Link>
          
        </Nav>
        </Navbar>*/}


    </> 
  );
};

export default Header;
