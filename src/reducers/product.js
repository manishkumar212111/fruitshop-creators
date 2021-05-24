
const initialState = {
    productList: [],
    product_detail_loading : false,
    duplicating_product : false
  };
  
  export default function(state = initialState, action) {
    const { type , data } = action;
    switch ( type ) {
        case 'PRODUCT_DETAIL_LOADING' : 
            return {...state , product_detail_loading : data};
        case 'PRODUCT_LISTING':
          return {...state , productList : data , product_detail_loading : false};
        case 'SINGLE_PRODUCT_DETAIL' :
          return {...state , productDetail : data , product_detail_loading : false};
        case 'PRODUCT_MARKET_PLACE' : 
          return {...state , products : data , product_detail_loading : false};
        case 'DUPLICATING_PRODUCT' : 
          return {...state , duplicating_product : data};
        default: return state;
    }
  }
  