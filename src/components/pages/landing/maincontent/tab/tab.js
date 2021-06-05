import React from 'react'
import './index.scss'
import clsx from 'clsx';
import PriceIcon from '../../../../../assets/img/price.svg'
import PaintIcon from '../../../../../assets/img/paint.svg'
import DollarIcon from '../../../../../assets/img/dollar.svg'

const Tab = (props) => {

    const { tab, setTab } = props;

    return (
        <div className="tab-wrapper">
            <div className={clsx("tab",{"active-tab": tab === "product"})} onClick={() => setTab("product")}>
                <img src={PriceIcon} className="tab-icon" alt=""></img>
                <p className="tab-title">Add product</p>
            </div>
            <div className={clsx("tab",{"active-tab": tab === "theme"})} onClick={() => setTab("theme")}>
                <img src={PaintIcon} className="tab-icon" alt=""></img>
                <p className="tab-title">Customize theme</p>
            </div>
            <div className={clsx("tab",{"active-tab": tab === "wallet"})} onClick={() => setTab("wallet")}>
                <img src={DollarIcon} className="tab-icon" alt=""></img>
                <p className="tab-title">Wallet</p>
            </div>
        </div>
    )
}

export default Tab