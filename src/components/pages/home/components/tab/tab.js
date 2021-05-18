import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router'
import './index.scss'

const Tab = (props) => {
    const histrory = useHistory()
    const [activeTab , setActiveTab] = useState(localStorage.getItem("activetab") ? localStorage.getItem("activetab") : 0);
    
    const handleClick = (index)  => {
        localStorage.setItem("activeTab", index)
        setActiveTab(index);
        histrory.push(index== 0 ? "/home" : index == 1 ? "/marketplace" : "/analytics");
    }

    return (
        <Row className={'tab'}>
            <Col className={activeTab === 0 ? `activeTab` : null} onClick={()=>handleClick(0)}>My Shop</Col>
            <Col className={activeTab === 1 ? `activeTab` : null} onClick={()=>handleClick(1)}>Brand Marketplace</Col>
            <Col className={activeTab === 2 ? `activeTab` : null} onClick={()=>handleClick(2)}>Analytics</Col>
        </Row>
    )
}

export default Tab