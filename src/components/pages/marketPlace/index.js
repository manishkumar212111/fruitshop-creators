import React, { useEffect, useState } from "react";

import { getUserData} from "../../../utils/globals";
import { connect } from "react-redux";
import { UpdateUserById } from "../../../actions/auth";

const MarketPlace = (props) => {
    const [ success , setSuccess] = useState(getUserData('early_access'))

    useEffect(() => {
        setSuccess(getUserData('early_access'))
    }, [props.userDetail]);
    

    const handleClick = () => {
        props.UpdateUserById(getUserData('id') , { early_access : true})
    }

    return(
        <div className="container" style={{"color": "black" , "margin-top" : "130px"}}>
            <h2>Coming soon</h2>
            <p>
            We are working hard to bring you the latest trending products to sell and start your business at zero upfront cost.
            </p>
            {success ? <span>Thank you! We will be touch in you soon !</span> : <button className={"btn"} style={{backgroundColor : "#FF7F00" , "border-radius": "15px" , color : "white", "font-size" : "13px"}} onClick={handleClick}>Get early access</button>}
        </div>
    )
}


const mapStateToProps = ( state ) => ( {
    userDetail: state.auth.userDetail,
    login_user_loading: state.auth.login_user_loading
} );

const mapDispatchToProps = {
    UpdateUserById
};

export default connect( mapStateToProps, mapDispatchToProps )( MarketPlace );
