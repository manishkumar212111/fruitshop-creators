//import { fetchCircuits } from "../api";
import { setAlert } from "./alert";
import API from "../API"

export const fetchData = ( ) => ( dispatch ) =>{
  API.get('Users', {} , "" , function(res){
    dispatch( 
      { type: "STORE_DATA",
        data : res.data
      }
    );
  })
}
