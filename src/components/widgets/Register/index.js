import React , { useState , useEffect , Fragment } from "react";
import "./register.css";
import validateUtility from "../../../utils/ValidateUtility"
import { Link } from "react-router-dom";
import Logo from '../../../assets/img/logo.png'

const Register = (props) => {
    const [fieldobj , setFieldObj] = useState({ userName : "",  email : "" , password : "" });
    const [errorObj , setErrorObj] = useState({ email : { error : true , msg : "Please enter valid email" } , 
                                                password : { error : true , msg : "Password should be minimum 8 chars" },
                                                userName : { error : true , msg : "This is required field" },
                                             })
    const validateField = (key , value) => {
        value = value ? value : fieldobj[key] 
        switch(key) {
            case "userName":
                return  validateUtility.required(value)
            case "email" :
                return  validateUtility.email(value)
            case "password" :
                return  validateUtility.minLength(value , 8) && validateUtility.required(value)
                
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
        let requiredObj = ['userName' , 'email' , 'password'];
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
        <div>

       <div className="loginPopup">
        <div className="popupContainer">
        <header id="header" className="fixed-top">
            <div className="container d-flex align-items-center">

              <div className="logo mr-auto">
                <img src={Logo} alt="logo"/>
              </div>

           

            </div>
          </header>

        <div className="tab-pane fade show active" id="registertab" role="tabpanel" aria-labelledby="v-pills-profile-tab">
            <h2 className="loginHeading">Sign Up</h2>
            <p className="fb">Continue to your store</p>
            <form onSubmit={ (e) => handleClick(e)} method="post">
                <div className="row">
                    <div className="col-md-12 form-group mt-1">
                        <span className="error">{!errorObj.userName.error && errorObj.userName.msg}</span>          
                        <input className="form-control f-12 loginInput" type="text" placeholder="Enter username" name="userName" value={fieldobj.userName} onChange={(e) => handleChange(e)}/>
                    </div>
                    
                    <div className="col-md-12 form-group mt-1">
                        <span className="error">{!errorObj.email.error && errorObj.email.msg}</span>
                        <input className="form-control f-12 loginInput" type="text" placeholder="Enter Email" name="email" value={fieldobj.email} onChange={(e) => handleChange(e)}/>
                    </div>
                    <div className="col-md-12 form-group mt-1">
                        <span className="error">{!errorObj.password.error && errorObj.password.msg}</span>
                        <input className="form-control f-12 loginInput" type="password" placeholder="Enter Password" name="password" value={fieldobj.password} onChange={(e) => handleChange(e)}/>
                    </div>
                    <div className="col-md-12">
                        <p className="f-12"><span className="mdi mdi-check"></span> By creating an account you are agreeing to our <strong>Terms of Service</strong> and <strong>Privacy Policy</strong></p></div>
                    <div className="col-md-12 text-center">
                        <button type="submit"  className="btn btn-primary d-block shadow loginButton" disabled={props.login_user_loading}>Register</button>
                        <Link className="loginLink" to="/#login"> Already have a store? <strong>Log in</strong></Link>
                    </div>
                    

                    
                </div>
            </form>
        </div>
        </div>
        </div>



        {/* About You */}

        {/*<div className="loginPopup">
        <div className="popupContainer">
        <header id="header" className="fixed-top">
            <div className="container d-flex align-items-center">

              <div className="logo mr-auto">
                <h1><a href="index.html"><span>Superfruit</span></a></h1>
              </div>

           

            </div>
          </header>

        <div className="tab-pane fade show active" id="registertab" role="tabpanel" aria-labelledby="v-pills-profile-tab">
            <h2 className="loginHeading">About you</h2>
            <p className="fb">How will you be driving traffic?</p>
            <div className="row">
                <div className="col-md-6 form-group mt-2">
                    <span className="error">{!errorObj.userName.error && errorObj.userName.msg}</span>          
                    <input className="form-control f-12 loginInput" type="text" placeholder="Your Website/Blog url" name="websiteurl" value={fieldobj.websiteurl} onChange={(e) => handleChange(e)}/>
                </div>
                
                <div className="col-md-6 form-group">
                    <span className="error">{!errorObj.email.error && errorObj.email.msg}</span>
                    <input className="form-control f-12 loginInput" type="text" placeholder="Your YouTube url" name="youtube" value={fieldobj.youtube} onChange={(e) => handleChange(e)}/>
                </div>

                <div className="col-md-6 form-group">
                    <span className="error">{!errorObj.email.error && errorObj.email.msg}</span>
                    <input className="form-control f-12 loginInput" type="text" placeholder="Your TikTok username" name="tiktok" value={fieldobj.tiktok} onChange={(e) => handleChange(e)}/>
                </div>

                <div className="col-md-6 form-group">
                    <span className="error">{!errorObj.email.error && errorObj.email.msg}</span>
                    <input className="form-control f-12 loginInput" type="text" placeholder="Your Instagram username" name="instagram" value={fieldobj.instagram} onChange={(e) => handleChange(e)}/>
                </div>

                <div className="col-md-6 form-group">
                    <span className="error">{!errorObj.email.error && errorObj.email.msg}</span>
                    <input className="form-control f-12 loginInput" type="text" placeholder="Other" name="other" value={fieldobj.other} onChange={(e) => handleChange(e)}/>
                </div>


                
             
                <div className="col-md-12 text-center" onClick={handleClick}>
                    <button  className="btn btn-primary d-block shadow loginButton" disabled={props.login_user_loading}>Register</button>
                    <Link className="loginLink" to="/#login"> Skip</Link>
                </div>
                

                
            </div>
        </div>
        </div>
        </div>*/}



        {/*<div className="loginPopup">
        <div className="popupContainer">
        <header id="header" className="fixed-top">
            <div className="container d-flex align-items-center">

              <div className="logo mr-auto">
                <h1><a href="index.html"><span>Superfruit</span></a></h1>
              </div>

           

            </div>
          </header>

        <div className="tab-pane fade show active" id="registertab" role="tabpanel" aria-labelledby="v-pills-profile-tab">
            <h2 className="loginHeading">What do you plan on selling?</h2>
            <p className="fb">This helps us find more products for you to sell and expand your business with.</p>
            <div className="row">
                <div className="col-md-12 form-group mt-2">
                    <button  className="btn btn-primary d-block shadow sellPlanBtn active">Beauty</button>
                </div>
                
                <div className="col-md-12 form-group">
                    <button  className="btn btn-primary d-block shadow sellPlanBtn active">Health & Wellness</button>
                </div>

                <div className="col-md-12 form-group">
                    <button  className="btn btn-primary d-block shadow sellPlanBtn">Home & Living</button>
                </div>

                <div className="col-md-12 form-group">
                    <button  className="btn btn-primary d-block shadow sellPlanBtn">Food & Drink</button>
                </div>

                <div className="col-md-12 form-group">
                    <button  className="btn btn-primary d-block shadow sellPlanBtn">Men’s Fashion</button>
                </div>

                <div className="col-md-12 form-group">
                    <button  className="btn btn-primary d-block shadow sellPlanBtn">Women’s Fashion</button>
                </div>

                <div className="col-md-12 form-group">
                    <span className="error">{!errorObj.email.error && errorObj.email.msg}</span>
                    <input className="form-control f-12 loginInput" type="text" placeholder="Other" name="other" value={fieldobj.other} onChange={(e) => handleChange(e)}/>
                </div>


                
             
                <div className="col-md-12 text-center" onClick={handleClick}>
                    <button  className="btn btn-primary d-block shadow loginButton" disabled={props.login_user_loading}>Finish</button>
                    <Link className="loginLink" to="/#login"> Skip</Link>
                </div>
                

                
            </div>
        </div>
        </div>
        </div>

        */}



        </div>






      

  
    )
}

export default Register;
