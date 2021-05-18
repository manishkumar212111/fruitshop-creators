
import React from 'react';
import {resetPassword} from "../../../actions/auth";
import { connect } from "react-redux";
import ResetPassword from "../../widgets/resetPassword";

function ResetPsd(props) {
    const token = typeof window !== 'undefined' && window.location.search.split("=")[1];
    const SubmitCb = (password) => {
        props.resetPassword(token , password);
    }
    if(!token){
        return (
            <p> Please provide token </p>
        )
    }
    return(
        <span>
            <ResetPassword SubmitCb={SubmitCb}/>
        </span>
    )
}


const mapStateToProps = ( state ) => ( {
    userDetail: state.auth.userDetail,
    login_user_loading: state.auth.login_user_loading
} );

const mapDispatchToProps = {
    resetPassword
};

export default connect( mapStateToProps, mapDispatchToProps )( ResetPsd );
