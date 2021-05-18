import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Footer = ( { loggedIn } ) => (
    <div>
        <footer>
            {/* <div class="container">
            <ul>
                <li><a class="diff-color" href="#">Terms of Service</a></li>
                <li><a class="diff-color" href="#">Privacy Policy</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
            </div> */}
        </footer>

    </div>
);

const mapStateToProps = ( state ) => ( {
    loggedIn: state.loggedIn,
} );

export default connect( mapStateToProps )( Footer );
