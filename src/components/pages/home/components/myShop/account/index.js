import React, { useEffect, useState } from 'react'
import './index.scss';
import { getUserData} from "../../../../../../utils/globals";
import { connect } from "react-redux";
import { sendResetLink , UpdateUserById } from "../../../../../../actions/auth";
import { deleteMyAccount } from "../../../../../../actions/user";
import { propTypes } from 'react-bootstrap/esm/Image';
import { Modal } from 'react-bootstrap';
import validateUtility from '../../../../../../utils/ValidateUtility';

const Account = (props) => {
    const [user , setUser] = useState({
            email : getUserData('email'),
            userName : getUserData('userName'),
            id : getUserData('id')
    });
    const [resetLinkTxt , setResetLinkTxt] = useState(false);
    const [deletePopup , setDeletePopup] = useState(false);

    const [editUserOpen , setEditUserOpen] = useState(false);
    const [editEmailOpen , setEditEmailOpen] = useState(false); 

    const [userError , setUserError] = useState(false);
    const [emailError , setEmailError] = useState(false);

    const handleResetLink = () => {
        props.sendResetLink({email: user.email});
    }

    const handleDelete = () => {
        props.deleteMyAccount(user.id);  
    };

    const handleChange = (value , key) => {
        let field = user;
        field[key] = value;
        setUser(fieldOb => ({...fieldOb , ...field}))

    }

    const handleCancel = () => {
        setUser({email : getUserData('email'),
        userName : getUserData('userName'),
        id : getUserData('id')});

        setEditUserOpen(false);
        setEditEmailOpen(false);

    }
    const handleUserNameChange = () => {
        if(!user.userName){
            setUserError("Please enter valid userName");
            return;
        } else if(getUserData('id') == user.userName){
            setUserError("Current and new user name is same");
            return;
            
        }

        props.UpdateUserById(user.id , { userName : user.userName});
        // setEditUserOpen(false);
    }

    const handleEmailNameChange = () => {
        if(!validateUtility.email(user.email)){
            setEmailError("Please enter valid email");
            return;
        } else if(getUserData('email') == user.email){
            setUserError("Current and new email is same");
            return;
            
        }

        props.UpdateUserById(user.id , { email : user.email});
        // setEditUserOpen(false);
    }
    useEffect(() => {
        props.reset_link_sent && setResetLinkTxt(true);
    } , [props.reset_link_sent]);
    return (
        <div className="accoundMain">
            <div className={'account'}>
                <h1 className={'header'}>My Account</h1>
                <div className={'d-flex flex-row mt-2 medtxt'}>
                    <span className={"label"}>Username: &nbsp; </span>
                    <span>{editUserOpen ? <div>
                        <input type="text" className="roundedInput" value={user.userName} onChange={(e) => handleChange(e.target.value , "userName") }></input> <span onClick={handleUserNameChange}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg submitIc" viewBox="0 0 16 16">
  <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
</svg>
                        </span><span onClick={handleCancel}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg cancelIc" viewBox="0 0 16 16">
  <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
</svg>
                        </span>
                        {userError && <span className="error">{userError}</span>}
                    </div> : user.userName } {!editUserOpen && <span onClick={() => setEditUserOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill editIc" viewBox="0 0 16 16">
                          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                        </svg>
                    </span>}</span>
                </div>
                <div className={'d-flex flex-row mt-2 medtxt'}>
                    <span className={"label"}>Email: &nbsp; </span>
                    <span>{editEmailOpen ? <div>
                        <input className="roundedInput" type="text" value={user.email} onChange={(e) => handleChange(e.target.value , "email") }></input> <span onClick={handleEmailNameChange}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg submitIc" viewBox="0 0 16 16">
                                <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                            </svg>
                        </span><span onClick={handleCancel}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg cancelIc" viewBox="0 0 16 16">
                                <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
                            </svg>
                        </span>
                        {emailError && <span className="error">{emailError}</span>}
                    </div> : user.email } {!editEmailOpen && <span onClick={() => setEditEmailOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill editIc" viewBox="0 0 16 16">
                          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                        </svg>
                    </span>}</span>
                </div>
                <button className={`resetPassword ${props.btnLoading ? "btnDisabled" : ""}`} disabled={props.btnLoading} onClick={handleResetLink}>Reset Password</button>
                <button className="deleteAccount" onClick={() => setDeletePopup(true)}>Delete Account</button>
                {resetLinkTxt &&  <div style={{color : "black"}} className="col-4 ml-auto d-flex flex-column">
                    <span className="font-weight-bold">Password Reset Email sent</span>
                    <span className="mt-2 ">We've sent you link to reset password</span>
                    <span className="mt-2 ">Didn't receive an email? check your junk folder, or request another link</span>
                    {/* <span className="mt-4 text-center"><u>Back to your password</u></span> */}
                </div> }


                <Modal style={{color : "black"}} show={deletePopup} onHide={setDeletePopup}>
                <Modal.Dialog>
                    {/* <Modal.Header closeButton>
                    </Modal.Header> */}
                    <Modal.Body>
                    <p>Are you sure you want to delete your account?</p>        
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-danger" onClick={() => handleDelete()}>Delete</button>
                        <button className="btn btn-success" onClick={() => setDeletePopup(false)}>Cancel</button>

                    </Modal.Footer> 
                </Modal.Dialog>
                </Modal>
            </div>
        </div>
    )
}

const mapStateToProps = ( state ) => ( {
    btnLoading : state.auth.login_user_loading,
    reset_link_sent : state.auth.reset_link_sent
} );

const mapDispatchToProps = {
    sendResetLink,
    deleteMyAccount,
    UpdateUserById
};

export default connect( mapStateToProps, mapDispatchToProps )( Account );


// import React, { useEffect, useState } from 'react'
// import './index.scss';
// import { getUserData} from "../../../../../../utils/globals";
// import { connect } from "react-redux";
// import { sendResetLink , UpdateUserById } from "../../../../../../actions/auth";
// import { deleteMyAccount } from "../../../../../../actions/user";
// import { propTypes } from 'react-bootstrap/esm/Image';
// import { Modal } from 'react-bootstrap';
// import validateUtility from '../../../../../../utils/ValidateUtility';

// const Account = (props) => {
//     const [user , setUser] = useState({
//             email : getUserData('email'),
//             userName : getUserData('userName'),
//             id : getUserData('id')
//     });
//     const [resetLinkTxt , setResetLinkTxt] = useState(false);
//     const [deletePopup , setDeletePopup] = useState(false);

//     const [editUserOpen , setEditUserOpen] = useState(false);
//     const [editEmailOpen , setEditEmailOpen] = useState(false); 

//     const [userError , setUserError] = useState(false);
//     const [emailError , setEmailError] = useState(false);

//     const handleResetLink = () => {
//         props.sendResetLink({email: user.email});
//     }

//     const handleDelete = () => {
//         props.deleteMyAccount(user.id);  
//     };

//     const handleChange = (value , key) => {
//         let field = user;
//         field[key] = value;
//         setUser(fieldOb => ({...fieldOb , ...field}))

//     }

//     const handleCancel = () => {
//         setUser({email : getUserData('email'),
//         userName : getUserData('userName'),
//         id : getUserData('id')});

//         setEditUserOpen(false);
//         setEditEmailOpen(false);

//     }
//     const handleUserNameChange = () => {
//         if(!user.userName){
//             setUserError("Please enter valid userName");
//             return;
//         } else if(getUserData('id') == user.userName){
//             setUserError("Current and new user name is same");
//             return;
            
//         }

//         props.UpdateUserById(user.id , { userName : user.userName});
//         // setEditUserOpen(false);
//     }

//     const handleEmailNameChange = () => {
//         if(!validateUtility.email(user.email)){
//             setEmailError("Please enter valid email");
//             return;
//         } else if(getUserData('email') == user.email){
//             setUserError("Current and new email is same");
//             return;
            
//         }

//         props.UpdateUserById(user.id , { email : user.email});
//         // setEditUserOpen(false);
//     }
//     useEffect(() => {
//         props.reset_link_sent && setResetLinkTxt(true);
//     } , [props.reset_link_sent]);
//     ''
//     return (
//         <div className={'account'}>
//             <span className={'header'}>My Account</span>
//             <div className={'d-flex flex-row mt-2'}>
//                 <span className={"label"}>Username :</span>
//                 <span>{editUserOpen ? <div>
//                     <input type="text" value={user.userName} onChange={(e) => handleChange(e.target.value , "userName") }></input> <span onClick={handleUserNameChange}>submit</span><span onClick={handleCancel}>Cancel</span>
//                     {userError && <span className="error">{userError}</span>}
//                 </div> : user.userName } {!editUserOpen && <mark onClick={() => setEditUserOpen(true)}>Edit</mark>}</span>
//             </div>
//             <div className={'d-flex flex-row mt-2'}>
//                 <span className={"label"}>Email :</span>
//                 <span>{editEmailOpen ? <div>
//                     <input type="text" value={user.email} onChange={(e) => handleChange(e.target.value , "email") }></input> <span onClick={handleEmailNameChange}>submit</span><span onClick={handleCancel}>Cancel</span>
//                     {emailError && <span className="error">{emailError}</span>}
//                 </div> : user.email } {!editEmailOpen && <mark onClick={() => setEditEmailOpen(true)}>Edit</mark>}</span>
//             </div>
//             <button className={`resetPassword ${props.btnLoading ? "btnDisabled" : ""}`} disabled={props.btnLoading} onClick={handleResetLink}>Reset Password</button>
//             <button className="deleteAccount" onClick={() => setDeletePopup(true)}>Delete Account</button>
//             {resetLinkTxt &&  <div className="col-4 ml-auto d-flex flex-column">
//                 <span className="font-weight-bold">Password Reset Email sent</span>
//                 <span className="mt-2 ">We've sent you link to reset password</span>
//                 <span className="mt-2 ">Didn't receive an email? check your junk folder, or request another link</span>
//                 {/* <span className="mt-4 text-center"><u>Back to your password</u></span> */}
//             </div> }


//             <Modal show={deletePopup} onHide={setDeletePopup}>
//             <Modal.Dialog>
//                 <Modal.Header closeButton>
//                 </Modal.Header>
//                 <Modal.Body>
//                 <p>Are you sure you want to delete your account?</p>        
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <button className="deleteAccount" onClick={() => handleDelete()}>Delete</button>
//                 </Modal.Footer> 
//             </Modal.Dialog>
//             </Modal>
//         </div>
//     )
// }

// const mapStateToProps = ( state ) => ( {
//     btnLoading : state.auth.login_user_loading,
//     reset_link_sent : state.auth.reset_link_sent
// } );

// const mapDispatchToProps = {
//     sendResetLink,
//     deleteMyAccount,
//     UpdateUserById
// };

// export default connect( mapStateToProps, mapDispatchToProps )( Account );

