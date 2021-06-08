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

export const getProductList = (options) => dispatch =>{
  try{
      dispatch({
          type : "PRODUCT_DETAIL_LOADING",
          data : true
      })
    API.get('ProductOpen' , options, '' , function(res){
      
      if(res && res.data){
          dispatch( { type: "PRODUCT_MARKET_PLACE",
            data : res.data
          });
        } else {
            //console.log(res.data.message);
            res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
        }

      dispatch({
        type : "PRODUCT_DETAIL_LOADING",
        data : false
      })
    })
    
  } catch (err) {
    console.log(err)
    console.log(err)
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
            dispatch(setAlert("Details updated successfully" , 'success'))
            window.location.href="/landing"
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
            dispatch(setAlert("Product added" , 'success'))
            window.location.href="/landing"
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

  export const addToStore = (productId) => dispatch => {
    try {

      dispatch({
        type : "DUPLICATING_PRODUCT",
        data : true
      })
      API.post('ProductOpen' , {} , productId , function(res){
        if(res && res.data) {
          console.log("ffffffffffff")
            // dispatch(setAlert("Product added" , 'success'));
          } else {
              //''
              res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          }
          dispatch({
            type : "DUPLICATING_PRODUCT",
            data : true
          })
      })
      
    }
     catch (err) {
     }
  }
  
  