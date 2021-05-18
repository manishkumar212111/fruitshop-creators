import React from 'react'
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
 // type = ThreeDots 
export default function Index({ height = 700, width = 1800,className="centered", type = "Puff"}) {
  return (
    <section className="align-items-center mt-5 pt-5">
      <div className={className} style={{"text-align" : "center","margin-top" : "15%"}}>
        <Loader
            type={type}
            color="#00BFFF"
            height={100}
            width={100}
            // timeout={3000} //3 secs
          />  
        </div>
      </section>
  )
}

