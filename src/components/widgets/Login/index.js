import React , { useState , useEffect , Fragment } from "react";
import "./login.css";
import validateUtility from "../../../utils/ValidateUtility"
import { Link } from "react-router-dom";
const Login = (props) => {
    const [fieldobj , setFieldObj] = useState({ userName : "" , password : "" });
    const [errorObj , setErrorObj] = useState({ userName : { error : true , msg : "Please enter valid userName" } , 
                                                password : { error : true , msg : "Please enter valid password" } })
    const validateField = (key , value) => {
        value = value ? value : fieldobj[key] 
        switch(key) {
            case "userName" :
                return  validateUtility.required(value)
            case "password" :
                return  validateUtility.required(value)
                
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
    
    const handleClick = (e) => {
        e.preventDefault();
        let requiredObj = ['userName' , 'password'];
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

    
    return (
        <div className="loginPopup">
        <div className="popupContainer">
        <header id="header" className="fixed-top">
            <div className="container d-flex align-items-center">

              <div className="logo mr-auto">
                <h1><h1><a href="/"><span>Superfruit</span></a></h1></h1>
              </div>

             {/* <div className="login">
                <button type="button" class="close" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>*/} 

            </div>
          </header>
        <div className="" id="logintab" role="tabpanel" aria-labelledby="v-pills-home-tab">
            <h2 className="loginHeading">Log in</h2>
            <p className="fb">Continue to your store</p>
                <form onSubmit={(e)=> handleClick(e)}>

                    <div className="row">
                        <div className="col-md-12 form-group mt-1 text-right">
                        <span className="error">{!errorObj.userName.error && errorObj.userName.msg}</span>
                            
                            {/* <Link className="loginLink" to="/#forgot"> Forgot username?</Link> */}
                            <input className="form-control f-12 loginInput mt-1" type="text" placeholder="Enter UserName" name="userName" value={fieldobj.userName} onChange={(e) => handleChange(e)} />
                        </div>
                        <div className="col-md-12 form-group">
                            <span className="error">{!errorObj.password.error && errorObj.password.msg}</span>
                            <input className="form-control f-12 loginInput" type="password" placeholder="Enter Password" name="password" value={fieldobj.password} onChange={(e) => handleChange(e)} />
                        </div>

                        <div className="col-md-12 text-right">
                            <button type="submit" href="#" className={`btn btn-primary d-block shadow loginButton loginLink`} disabled={props.login_user_loading} >Login</button> 
                        </div>
                        {/* <div className="col-md-12"><div className="option text-center"><span>or</span></div></div> */}
                        <div className="col-md-12 text-center">

                            <Link className="loginLink" to="/#forgot"> Forgot password?</Link>
                            <div className="loginLink mt-2">New to Superfruit?<Link className="loginLink" to="/#register"> <strong>Get started</strong></Link></div>
                            

                            {/* <GoogleLoginButton loginCb = {loginCb} buttonText="Login with Google" />  */}
                            {/* <a href="#" className="btn btn-outline-muted d-block mt-4 shadow"><img src={google} /> Login with Google</a>  */}
                        </div>
                    </div>
            </form>
        </div>
        </div>
         </div>

        // <div className="login-container">  
        //     <GoogleLoginButton loginCb = {loginCb}/>  
        //     <div className="container">
        //         <label for="uname"><b>Email</b></label>
        //             <span className="error">{!errorObj.userName.error && errorObj.userName.msg}</span>
        //             <input type="text" placeholder="Enter Email" name="userName" value={fieldobj.userName} onChange={(e) => handleChange(e)} required />
        //         <label for="psw"><b>Password</b></label>
        //             <span className="error">{!errorObj.password.error && errorObj.password.msg}</span>
        //             <input type="password" placeholder="Enter Password" name="password" value={fieldobj.password} onChange={(e) => handleChange(e)} required />
        //         <button type="submit" onClick={handleClick}>Login</button>
        //         <label>
        //             <input type="checkbox" checked="checked" name="remember" /> Remember me
        //         </label>
        //     </div>
        // </div>
    )
}

export default Login;
