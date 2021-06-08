import React from 'react';
import './index.scss'
import { useHistory } from "react-router-dom"

const ProductSetting = () => {

    const history = useHistory();

    return (
        <div className="wallet-card">
            <p className="title">Wallet</p>
            <p className="description">Set up your wallet and start earning</p>
            <p className="description">
                <ul>
                    <li>Get paid through Stripe. Check your welcome email to sign up.</li>
                    <li>View your analytics is coming soon. In the mean time, you can request a custom report from support@superfruit.app</li>
                </ul>
            </p>
        </div>
    )
}

export default ProductSetting;