import React , { useState , useEffect , Fragment } from "react";
import validateUtility from "../../../utils/ValidateUtility"
import "./resetPassword.css"
const ResetPassword = (props) => {
    const [fieldobj , setFieldObj] = useState({ password : "" , repeat_password : ""});
    const [errorObj , setErrorObj] = useState({ repeat_password : { error : true , msg : "Repeated password is not same" } , 
                                                password : { error : true , msg : "Password don't match" } })
    const validateField = (key , value) => {
        value = value ? value : fieldobj[key] 
        switch(key) {
            case "password" :
                return  validateUtility.required(value);
            case "repeat_password":
                return  validateUtility.required(value) && fieldobj.password == value;
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
        let requiredObj = ['password', "repeat_password"];
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
        
        props.SubmitCb(fieldobj.password)  

    }
    return (
        <section className="align-items-center pt-5">
            <div className="container">
                <div className="row align-items-center mt-5 pt-2 mb-4 text-center">
                    <div className="col-lg-12"> <h1 className="home-title">Reset Password</h1></div>
                </div>
                <div className="col-md-12 form-group mt-1">
                    <span className="error">{!errorObj.password.error && errorObj.password.msg}</span>
                    <input className="form-control f-12" type="password" placeholder="Enter Password" name="password" value={fieldobj.password} onChange={(e) => handleChange(e)} required />
                </div>
                <div className="col-md-12 form-group mt-1">
                    <span className="error">{!errorObj.repeat_password.error && errorObj.repeat_password.msg}</span>
                    <input className="form-control f-12" type="password" placeholder="Enter Password" name="repeat_password" value={fieldobj.repeat_password} onChange={(e) => handleChange(e)} required />
                    <input type="button" className="btn btn-primary mt-3" disabled={props.login_user_loading} type="button" onClick={handleClick} value="Reset password"></input>

                </div>                
                {/* <a href="/auth">Login </a> */}

            </div>
         </section>

    )
}

export default ResetPassword;
