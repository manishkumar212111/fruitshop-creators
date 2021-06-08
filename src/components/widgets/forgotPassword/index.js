import React , { useState , useEffect , Fragment } from "react";
import validateUtility from "../../../utils/ValidateUtility"
import Logo from '../../../assets/img/logo.png'
import { Link, useHistory } from "react-router-dom";

const ForgotPassword = (props) => {
    const history = useHistory()
    const [fieldobj , setFieldObj] = useState({ email : ""});
    const [errorObj , setErrorObj] = useState({ email : { error : true , msg : "Please enter valid email" } })
    const validateField = (key , value) => {
        value = value ? value : fieldobj[key] 
        switch(key) {
            case "email" :
                return  validateUtility.email(value);
            default :
                return true;
        }
    }
    const handleChange = (e) => {
        let field = fieldobj;
        field[e.target.name] = e.target.value;
        setFieldObj(fieldOb => ({...fieldOb , ...field}))

        let errOb = errorObj;
        errOb[e.target.name].error = validateField(e.target.name);

        setErrorObj( errorOb => ( { ...errorOb , errOb}))
    }
    
    const handleClick = () => {
        let requiredObj = ['email'];
        let errOb = errorObj;

        let status = true;
        requiredObj.forEach(element => {
            let errorStatus = validateField(element);
            errOb[element].error = errorStatus;
            status = status && errorStatus;
        })
        setErrorObj( errorOb => ( { ...errorOb , errOb}))
        if(!status)
            return;
        
        props.SubmitCb(fieldobj)  

    }
    const gotoHome = () => {
        history.push("/")
      }
    return (
        <div className="loginPopup">
        <div className="popupContainer">
        <header id="header" className="fixed-top">
            <div className="container d-flex align-items-center">

              <div className="logo mr-auto">
                <img src={Logo} alt="logo" onClick={gotoHome}/>
              </div>

             {/* <div className="login">
                <button type="button" class="close" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>*/} 

            </div>
          </header>
        <section className="align-items-center pt-5">
            <div className="container">
                <div className="row align-items-center mt-5 pt-2 mb-4 text-center">
                    <div className="col-lg-12"> 
                         <h2 className="loginHeading">Forgot Password</h2>
                         <p className="fb">Enter email associated with your account to get reset password link over email</p>
                    </div>
                </div>
                <div className="col-md-12 form-group mt-1">
                <span className="error">{!errorObj.email.error && errorObj.email.msg}</span>
                    <input className="form-control f-12 loginInput" type="text" placeholder="Enter Email" name="email" value={fieldobj.email} onChange={(e) => handleChange(e)} required />
                    <button className="btn btn-primary mt-3 loginButton" disabled={props.login_user_loading} type="button" onClick={handleClick}>Send Email</button>                
                </div>
            </div>
        </section>

        </div>
        </div>
    )
}

export default ForgotPassword;
