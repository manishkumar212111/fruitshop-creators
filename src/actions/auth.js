import { setAlert } from "./alert";
import API from "../API"

export const loginUser = ( data ) => dispatch =>{
  try{
    dispatch( { type: "LOGIN_USER_LOADING",
      data : true
    });

    API.post('Login' , data, '' , function(res){
      
      if(res && res.data.user){
          dispatch( { type: "LOGIN_USER",
            data : res.data
          });
        } else {
            //''
            res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
        }
        dispatch( { type: "LOGIN_USER_LOADING",
          data : false
        });
    })
    
  } catch (err) {
  }
}

export const UpdateUserById = (id , data, redirect) => dispatch => {
  try{
    dispatch( { type: "UPDATE_USER_LOADING",
      data : true
    });

    API.patch('Users' , data, id , function(res){
      
      if(res && res.data.id){
          dispatch( { type: "UPDATE_USER",
            data : res.data
          });
          redirect ? setTimeout(() => {
            dispatch(() => {
              window.location.href="/marketplace"
            })
          },1000) 
          : dispatch(setAlert("data updated successfully" , 'success'));    
        } else {
            //''
            res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
        }
        dispatch( { type: "UPDATE_USER_LOADING",
          data : false
        });
    })
    
  } catch (err) {
  }
}

export const GoogleLoginValidate = ( data ) => dispatch =>{
  try{
    dispatch( { type: "LOGIN_USER_LOADING",
      data : true
    });
    API.post('GoogleLoginValidate' , data, '' , function(res){
      
      if(res && res.data.user){
          dispatch( { type: "LOGIN_USER",
            data : res.data
          });
        } else {
            //''
            res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
        }
        dispatch( { type: "LOGIN_USER_LOADING",
          data : false
        });
    })
    
  } catch (err) {
    
  }
}

export const registerUser = ( data ) => dispatch =>{
  try{
    dispatch( { type: "LOGIN_USER_LOADING",
      data : true
    });
    API.post('Register' , data, '' , function(res){
      
      if(res && res.data.user){
          dispatch( { type: "REGISTER_USER",
            data : res.data
          });
        } else {
            //''
            res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
        }
        dispatch( { type: "LOGIN_USER_LOADING",
          data : false
        });
    })
    
  } catch (err) {
    
  }
}


export const sendResetLink = ( data ) => dispatch =>{
  try{
    dispatch( { type: "LOGIN_USER_LOADING",
      data : true
    });
  
    API.post('Forgot_Password' , data, '' , function(res){
      if(res && !res.data.message){
        dispatch( { type: "RESET_LINK_SENT",
            data : true
          });
        dispatch(setAlert("Reset link sent" , 'success'));    
      } else {
          
          //''
          res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
      }
      dispatch( { type: "LOGIN_USER_LOADING",
        data : false
      });
      
    })
    
  } catch (err) {
    
  }
}

export const resetPassword = ( token , password ) => dispatch =>{
  try{
    dispatch( { type: "LOGIN_USER_LOADING",
      data : true
    });

    API.post('ResetPassword' , { token : token , password : password}, '' , function(res){
      if(res && !res.data.message){
        dispatch(setAlert("Password reset successfull" , 'success'));    

        } else {
            //''
            res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
        }
        dispatch( { type: "LOGIN_USER_LOADING",
          data : false
        });
      
    })
    
  } catch (err) {
    
  }
}