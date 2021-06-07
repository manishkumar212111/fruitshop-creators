import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { categories } from "../../../configs";
import Logo from '../../../assets/img/logo.png'

const Index = (props) => {
    const history = useHistory()
    const [categoryList , setCategoryList] = useState(categories);
    const [social_url , setSocialUrl] = useState(props.social_url);
    const [showSocial , setShowSocial] = useState(true);
    const [category , setCategory] = useState(props.categories ? props.categories : [])
    
    const handleChange = (val , itm) => {
        let field = social_url;
        field[itm].url=val;
        setSocialUrl(fld => ([...field]))
    }

    const handleCategory =(id , index) => {
        let tmp = category;
        let field = categoryList;
        if(tmp.indexOf(id) > -1){
            field[index].status=false;
            tmp.splice(tmp.indexOf(id) , 1);
        } else {
            field[index].status=true;
            tmp.push(id);
        }    
        setCategoryList(fld => ([...field]))
        setCategory(tm => tmp);
    }

    const gotoHome = () => {
        history.push("/")
      }
    return (
        <div className="loginPopup">
                    <div className="popupContainer">
                    <header id="header" className="fixed-top">
                        <div className="container d-flex align-items-center">

                        <div className="logo mr-auto">
                <img src={Logo} alt="logo" onClick={gotoHome}/>
                        </div>
                        </div>
                    </header>
            {showSocial && 
                
                    <div className="tab-pane fade show active" id="registertab" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                        <h2 className="loginHeading">About you</h2>
                        <p className="fb">How will you be driving traffic?</p>
                            <div className="row">
                                {
                                    Array.isArray(social_url) && social_url.map((itm, index) => (
                                            <div className="col-md-12 form-group mt-2">
                                            <input className="form-control f-12 loginInput" type="text" placeholder={itm.placeholder} value={itm.url} name={itm.text} onChange={(e) => handleChange(e.target.value , index)}></input>
                                            </div>
                                    ))
                                }
                                <div className="col-md-12 text-center">
                                    <button  className="btn btn-primary d-block shadow loginButton"  onClick={() => setShowSocial(false)}>Continue</button>
                                    <span className="loginLink" onClick={() => setShowSocial(false)}> Skip</span>
                                </div>
                            </div>
                        </div>
            }
            {!showSocial && <div className="tab-pane fade show active" id="registertab" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                <h2 className="loginHeading">What do you plan on selling?</h2>
                <p className="fb">This helps us find more products for you to sell and expand your business with.</p>
                <div className="row">
                {categoryList.map((itm , index) => (
                        <div onClick={() => handleCategory(itm.id , index)} className="col-md-12 form-group mt-2">
                            <button  className={`btn btn-primary d-block shadow sellPlanBtn ${itm.status ? "active" : ""}`}>{itm.text}</button>
                        </div>
                )) }
            
            <div className="col-md-12 text-center">
                    <button  className="btn btn-primary d-block shadow loginButton" onClick={() => props.handleFinish(social_url , category)}>Finish</button>
                    <span className="loginLink" onClick={() => props.handleFinish(false)}> Skip</span>
                </div>
            </div></div>}
        </div>
        </div>
    )
}

export default Index;