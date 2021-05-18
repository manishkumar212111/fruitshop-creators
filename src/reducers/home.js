
const initialState = {
    users: [],
  };
  
  export default function(state = initialState, action) {
    const { type , data } = action;
    switch ( type ) {
      case 'UPDATE_USER':
        let userData = {
          user : data,
          tokens : JSON.parse(localStorage.getItem('userDetail')).tokens
        }
        return {...state, userDetail: userData, update_user_loading :  false};
    
        case "STORE_DATA":
            return {...state, users :  data};
        default: return state;
    }
  }
  