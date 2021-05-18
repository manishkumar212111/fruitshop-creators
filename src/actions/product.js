import { setAlert } from "./alert";
import API from "../API";

export const getProductByUserId = (productId) => dispatch =>{
  try{
      dispatch({
          type : "PRODUCT_DETAIL_LOADING",
          data : true
      })
    API.get('Product' , {}, productId , function(res){
      
      if(res && res.data){
          dispatch( { type: "PRODUCT_LISTING",
            data : res.data
          });
        } else {
            //''
            res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
        }
        dispatch({
            type : "PRODUCT_DETAIL_LOADING",
            data : false
        })
    })
    
  } catch (err) {
    
  }
}

export const getProductById = (productId) => dispatch =>{
  try{
      dispatch({
          type : "PRODUCT_DETAIL_LOADING",
          data : true
      })
    API.get('ProductOpen' , {}, productId , function(res){
      
      if(res && res.data){
          dispatch( { type: "SINGLE_PRODUCT_DETAIL",
            data : res.data
          });
        } else {
            //''
            res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
        }
        dispatch({
            type : "PRODUCT_DETAIL_LOADING",
            data : false
        })
    })
    
  } catch (err) {
    
  }
}

export const updateProductById = (productId , data) => dispatch =>{
    try{
        dispatch({
            type : "PRODUCT_DETAIL_LOADING",
            data : true
        })
      API.patch('ProductOpen' , data , productId , function(res){
        
        if(res && res.data.id) {
            dispatch(setAlert("Details updated successfully" , 'success'));    
            setTimeout(() => {
              window.location.href="/home/listing";
            }, 500)
            
          } else {
              //''
              res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          }
          dispatch({
            type : "PRODUCT_DETAIL_LOADING",
            data : false
        })
      })
      
    } catch (err) {
      
    }
  }
  
  export const deleteProductById = (productId, userId) => dispatch =>{
    try{
        dispatch({
            type : "LOADING_PRODUCT_ACCOUNT_EDIT",
            data : {}
        })
      API.delete('ProductOpen' , {} , productId , function(res){
        if(res && res.data && !res.data.message) {
            dispatch(getProductByUserId());
            dispatch(setAlert("Product deleted successfully" , 'success'));

          } else {
              //''
              res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          }
      })
      
    } catch (err) {
      
    }
  }
  

  export const createProduct = (data) => dispatch =>{
    try{
        dispatch({
            type : "PRODUCT_DETAIL_LOADING",
            data : true
        })
      API.post('ProductOpen' , data , '' , function(res){
        if(res && res.data && res.data.id) {
            // dispatch(getProductByUserId());
            dispatch(setAlert("Product added" , 'success'));
            setTimeout(() => {
              window.location.href="/home/listing";
            }, 1000)
          } else {
              //''
              res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          }
          dispatch({
              type : "PRODUCT_DETAIL_LOADING",
              data : false
          })
      })
      
    } catch (err) {
      
    }
  }
  
  