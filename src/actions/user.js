import { setAlert } from "./alert";
import API from "../API";
import { clearUserData } from '../utils/globals'

export const GetUserById = (userId) => dispatch =>{
  try{
      dispatch({
          type : "USER_DETAIL_LOADING",
          data : {}
      })
    API.get('GetUserById' , {}, userId , function(res){
      
      if(res && res.data){
          dispatch( { type: "USER_DETAIL",
            data : res.data
          });
        } else {
            //''
            res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
        }
    })
    
  } catch (err) {
    
  }
}

export const auth = () => dispatch =>{
  try {
    API.post('Auth' , {}, '' , function(res){
      if(res && res.data){
          dispatch( { type: "USER_DETAIL_AUTH",
            data : res.data
          });
        } else {
            // window.location.href = '/';
            //''
            res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
        }
    })
    
  } catch (err) {
    
  }
}

export const UpdateUserById = (userId , data) => dispatch =>{
    try{
        dispatch({
            type : "LOADING_USER_ACCOUNT_EDIT",
            data : true
        })
      API.patch('UpdateUserById' , data , userId , function(res){
        
        if(res && res.data.email) {
            dispatch( { type: "USER_DETAIL",
              data : res.data
            });
            dispatch(setAlert("Details updated successfully" , 'success'));    
          } else {
              //''
              res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          }
          dispatch({
            type : "LOADING_USER_ACCOUNT_EDIT",
            data : false
        })
      })
      
    } catch (err) {
      
    }
  }
  
  export const changePassword = (data) => dispatch =>{
    try{
        dispatch({
            type : "UPDATING_USER",
            data : {}
        })
      API.post('changePassword' , data , '' , function(res){
        if(res && res.data.email) {
            dispatch( { type: "USER_DETAIL",
              data : res.data
            });
            dispatch(setAlert("Details updated successfully" , 'success'));    
          } else {
              //''
              res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          }
      })
      
    } catch (err) {
      
    }
  }

  export const changeEmail = (data) => dispatch =>{
    try{
        dispatch({
            type : "UPDATING_USER",
            data : {}
        })
      API.post('changeEmail' , data , '' , function(res){
        if(res && res.data.email) {
            dispatch( { type: "USER_DETAIL",
              data : res.data
            });
            dispatch(setAlert("Details updated successfully" , 'success'));    
          } else {
              //''
              res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          }
      })
      
    } catch (err) {
      
    }
  }

  export const deleteMyAccount = (userId) => dispatch =>{
    try{
        dispatch({
            type : "UPDATING_USER",
            data : {}
        })
      API.delete('Users' , {} , userId , function(res){
        if(res && res.data && !res.data.message) {
            dispatch( { type: "USER_DETAIL",
                data : res.data
              });
            dispatch(setAlert("Account deleted successfully" , 'success'));    
            clearUserData();
              if(typeof window !== 'undefined'){
                window.location.href="/";
              }

          } else {
              //''
              res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          }
      })
      
    } catch (err) {
    }
  }
  
  