import React , { useState , useEffect , Fragment } from "react";
import validateUtility from "../../../utils/ValidateUtility"
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const EditUserDetail = (props) => {
    const [fieldobj , setFieldObj] = useState({ email : props.email ? props.email : "" ,
                                                first_name : props.first_name ? props.first_name :  "",
                                                last_name : props.last_name ? props.last_name : "",
                                                dob : props.dob ? props.dob : ""
                                             });
    const [errorObj , setErrorObj] = useState({ email : { error : true , msg : "Please enter valid email" } , 
                                                first_name : { error : true , msg : "Please enter valid first name"},
                                                last_name : { error : true , msg : "Please enter valid last name"},
                                                dob : { error : true , msg : "Please enter valid dob"},
                                             })
    const validateField = (key , value) => {
        value = value ? value : fieldobj[key] 
        switch(key) {
            case "first-name":
                return  validateUtility.required(value)
            case "first-name":
                return  validateUtility.required(value)
            case "email" :
                return  validateUtility.email(value)

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

    const handleDateSelect = (date) => {
        let field = fieldobj;
         field['dob'] = new Date(date);
        setFieldObj(fieldOb => ({...fieldOb , ...field}))

        let errOb = errorObj;
        errOb['dob'].error = validateField(date);

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
        
        props.handleUserUpdate(fieldobj)  

    }

                                             
    return(
        <div className="row">
                <div className="col-md-12 ">
                    <h6> <span className="mdi mdi-account"></span> Account Info</h6>
                </div>
                <div className="col-md-12">
                    <div className="bg-light p-4">
                   <div className="row">
                       <div className="col-md-4">
                           <label className="text-muted">First Name</label>
                           <input className="form-control mb-4" type="text" placeholder="Enter First Name" name="first_name" value={fieldobj.first_name} onChange={(e) => handleChange(e)} required />
                           <span className="error">{!errorObj.first_name.error && errorObj.first_name.msg}</span>
                       </div>
                       <div className="col-md-4">
                           <label className="text-muted">Last name</label>
                           <input className="form-control mb-4"  placeholder="Enter Last Name" name="last_name" value={fieldobj.last_name} onChange={(e) => handleChange(e)}/>
                           <span className="error">{!errorObj.last_name.error && errorObj.last_name.msg}</span>
                       </div>
                       <div className="col-md-4">
                           <label className="text-muted">Date of birth</label>
                           <DatePicker
                                selected={fieldobj.dob ? new Date(fieldobj.dob) : ""}
                                dateFormat="dd/MM/yyyy"
                                onSelect={handleDateSelect} //when day is clicked
                                maxDate={new Date('01-01-2005')}
                                showYearDropdown = {true}
                                showMonthDropdown = {true}
                                placeholderText="Enter date of birth"
                                className="form-control mb-4"
                            />
                            <span className="error">{!errorObj.email.error && errorObj.email.msg}</span>
                           {/* <input type="text" className="form-control mb-4 "/> */}
                       </div>
                       <div className="col-md-12 text-right">
                           <button className={`btn btn-primary ${props.loading_account_info_edit ? "btnDisabled" : ""}`} disabled={props.loading_account_info_edit ? true : false} onClick={handleClick}>SAVE</button>
                       </div>
                   </div>
                    </div>
                </div>
            </div>
        
        // <div className="container">
        //         <span onClick={() => {props.closeCb(false)}}>close</span>
        //         <label for="uname"><b>First Name</b></label>
        //             <span className="error">{!errorObj.first_name.error && errorObj.first_name.msg}</span>
        //             <input type="text" placeholder="Enter First Name" name="first_name" value={fieldobj.first_name} onChange={(e) => handleChange(e)} required />
        //         <label for="uname"><b>Last Name</b></label>
        //             <span className="error">{!errorObj.last_name.error && errorObj.last_name.msg}</span>
        //             <input type="text" placeholder="Enter Last Name" name="last_name" value={fieldobj.last_name} onChange={(e) => handleChange(e)} required />
        //         <label for="uname"><b>Email</b></label>
        //             <span className="error">{!errorObj.email.error && errorObj.email.msg}</span>
        //             <input type="text" placeholder="Enter Email" name="email" value={fieldobj.email} onChange={(e) => handleChange(e)} disabled required />
        //         <label for="psw"><b>Date of birth</b></label>
                    
        //             <DatePicker
        //                     selected={fieldobj.dob ? new Date(fieldobj.dob) : ""}
        //                     dateFormat="dd/MM/yyyy"
        //                     onSelect={handleDateSelect} //when day is clicked
        //                     maxDate={new Date('01-01-2005')}
        //                     showYearDropdown = {true}
        //                     showMonthDropdown = {true}
        //                     placeholderText="Enter date of birth"
        //                 />
        //         <button type="submit" onClick={handleClick}>Update</button>
        //         {/* <span className="psw">Forgot <a href="#">password?</a></span> */}

        // </div>
    )
}

export default EditUserDetail;