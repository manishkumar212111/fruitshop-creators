
import LOGIN_USER from "../actions/types"

const initialState = {
    userDetail: [],
  };
  
export default function(state = initialState, action) {
  const { type , data } = action;
  switch ( type ) {
      case 'REGISTER_USER':
        return {...state, userDetail :  data};
      case 'LOGIN_USER':
          return {...state, userDetail :  data};
      case 'LOGIN_USER_LOADING':
        return {...state, login_user_loading : data};
      case 'RESET_LINK_SENT': 
        return { ...state , reset_link_sent : true}
      case 'UPDATE_USER':
        let userData = {
          user : data,
          tokens : JSON.parse(localStorage.getItem('userDetail')).tokens
        }
        localStorage.setItem('userDetail', JSON.stringify(userData))
        return {...state, userDetail: userData, update_user_loading :  false , reset_link_sent : false};
    
      default: return state;
  }
}
  