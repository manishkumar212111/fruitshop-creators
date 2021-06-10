import React from 'react';
import MainContent from "./maincontent"
import { getUserData } from '../../../utils/globals';
import { toast } from 'react-toastify';
import './landing.scss'

const Landing = () => {

    const handleCopy = () => {
        var textArea = document.createElement("textarea");
        textArea.value = "shop.superfruit.app/"+getUserData('userName');
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("Copy");
        textArea.remove();
        toast.success("User url copied successfully!");
    }
    
    return (
        <div className="homepage-wrapper">
            <div className="homepage-content">
                <div className="display-user-url" onClick={handleCopy}>
                    <p className="user-url"><u id="txtCopy">shop.superfruit.app/{getUserData('userName')}</u>
                    </p>
                </div>
                <MainContent />
            </div>
        </div>       
    )
}

export default Landing;