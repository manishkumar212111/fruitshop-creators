import React , { useState , useEffect , Fragment } from "react";
import "./register.css";
import validateUtility from "../../../utils/ValidateUtility"
import { Link, useHistory } from "react-router-dom";
import Logo from '../../../assets/img/logo.png'

const Register = (props) => {
    const history = useHistory()
    const [fieldobj , setFieldObj] = useState({ userName : "",  email : "manish.kumar212111@gmail.com" , password : "Password@123" });
    const [errorObj , setErrorObj] = useState({ email : { error : true , msg : "Please enter valid email" } , 
                                                password : { error : true , msg : "Please enter valid password" },
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
    
    const handleClick = () => {
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

    const loginCb = (token) => {
        props.googleLoginCb(token);
    }

    const gotoHome = () => {
        history.push("/")
      }
    return (
        <div>

        <div className="loginPopup">
        <div className="popupContainer">

        <header id="header" className="fixed-top">
            <div className="container d-flex align-items-center">

              {/* <div className="logo mr-auto">
                <img src={Logo} alt="logo" onClick={gotoHome}/>
              </div> */}

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



        </div>






      

  
    )
}

export default Register;
