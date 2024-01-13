const initialState = {
  me: false,
  loginLoading: false,
  loginDone: false,
  loginError:null,
  logoutLoading: false,
  logoutDone: false,
  logoutError:null,
}

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

const userReducer = (state = initialState , action) => {
  switch(action.type) {
    case LOG_IN_REQUEST:
      return {
        ...state,
        loginLoading: true,
        loginDone: false,
        loginError:null,
      }
    case LOG_IN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        loginDone: true,
        me: true,
      }
    case LOG_IN_FAILURE:
      return {
        ...state,
        loginLoading: false,
        loginError:action.error,
      }
    case LOG_OUT_REQUEST:
      return {
        ...state,
        logoutLoading: true,
        logoutDone: false,
        logoutError:null,
      }
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        logoutLoading: false,
        logoutDone: true,
        me: false,
      }
    case LOG_OUT_FAILURE:
      return {
        ...state,
        logoutLoading: false,
        logoutError:action.error,
      }
    default:
      return state;
  }
}

export default userReducer;