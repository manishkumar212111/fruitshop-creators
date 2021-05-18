import React, { useState } from 'react'
import { Container, Modal } from 'react-bootstrap';
import {Link} from "react-router-dom";
import { getUserData } from '../../../../../../utils/globals';
import Theme from "../theme";

import './index.scss'

const ShopOptions = () => {
    const [openTheme , setThemeOpen] = useState(false);
    const [isCopy , setCopied] = useState(false);
    const handleCopy = () => {
        var copyText = document.getElementById("txtCopy");
        var textArea = document.createElement("textarea");
        textArea.value = "superfruit.app/"+getUserData('userName');
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("Copy");
        textArea.remove();
        setCopied(true)
    }
    return (
        <div className="editPage">
        <Container className={'shopOption pl-0 pt-5'}>
            <div className={'optionDiv'}>
                <span className={'title'}>Theme</span>
                <span className={'edit'} style={{"cursor" : "pointer"}} onClick={() => setThemeOpen(true)}>Edit</span>
            </div>
            <div className={'optionDiv'}>
                <span className={'title'}>Listing</span>
                <Link className={'edit'} to="/home/listing">Edit</Link>
            </div>
            <div className={'initials'}>
                <span className="f20"><u id="txtCopy">superfruit.app/{getUserData('userName')}</u></span>
                <span className={'copy'} onClick={handleCopy} style={{"cursor" : "pointer"}}>{!isCopy ? "Copy" : "Copied"}</span>
            </div>
            {openTheme && <div>
                <Theme closeCallback={setThemeOpen}/>
            </div>}
        </Container>
        </div>
    )
}

export default ShopOptions
