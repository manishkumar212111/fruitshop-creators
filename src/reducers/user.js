
const initialState = {
    userDetail: [],
    user_detail_loading : true,
    expires : true
  };
  
  export default function(state = initialState, action) {
    const { type , data } = action;
    switch ( type ) {
        case 'USER_DETAIL_LOADING' : 
            return {...state , user_detail_loading : true};
        case 'USER_DETAIL':
          return {...state , userDetail : data , user_detail_loading : false};
        case 'USER_DETAIL_AUTH':
          return {...state , userDetail : data.user , expires : data.expires};
        case 'LOADING_USER_ACCOUNT_EDIT':
          return { ...state , loading_account_info_edit : data}
        default: return state;
    }
  }
  