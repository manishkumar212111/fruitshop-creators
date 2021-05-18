
const initialState = {
    productList: [],
    product_detail_loading : false,
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

        default: return state;
    }
  }
  