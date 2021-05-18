import React , { useState , useEffect , Fragment } from "react";
import validateUtility from "../../../utils/ValidateUtility"
// import "./resetPassword.css"
const ChangeEmail = (props) => {
    const [fieldobj , setFieldObj] = useState({old_password : "", email : ""});
    const [errorObj , setErrorObj] = useState({ 
        old_password : { error : true , msg : "Enter correct password" } , 
        email : { error : true , msg : "Enter correct email" } 
     })
    
        const validateField = (key , value) => {
        value = value ? value : fieldobj[key] 
        switch(key) {
            case "old_password" :
                return  validateUtility.required(value);
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
        let requiredObj = ['old_password' ,'email'];
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
        
        props.SubmitCb(fieldobj.old_password , fieldobj.email)  

    }
    return (
            <>
                <div>
                    <label className="text-muted" for="uname"><b>Your Old password</b></label>
                    <input type="password" className="form-control mb-4"  placeholder="Enter Password" name="old_password" value={fieldobj.old_password} onChange={(e) => handleChange(e)} required />
                    <span className="error">{!errorObj.old_password.error && errorObj.old_password.msg}</span>
                </div>
                <div>
                    <label className="text-muted" for="uname"><b>Your New email</b></label>
                    <input className="form-control mb-4" type="text" placeholder="Enter email" name="email" value={fieldobj.email} onChange={(e) => handleChange(e)} required />
                    <span className="error">{!errorObj.email.error && errorObj.email.msg}</span>
                </div>
                <div className="col-md-8 pb-4">
                    <button type="submit" className="btn btn-primary btn-sm" onClick={handleClick}>Change Email</button>
                </div>
            </>
        
    )
}

export default ChangeEmail;
