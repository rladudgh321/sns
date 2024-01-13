import { faker } from '@faker-js/faker';
import {generate} from 'shortid';

const initialState = {
  me: null,
  loginLoading: false,
  loginDone: false,
  loginError:null,
  logoutLoading: false,
  logoutDone: false,
  logoutError:null,
  signupLoading: false,
  signupDone: false,
  signupError:null,
}

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

const dummyUser = (data) => ({
  id: generate(),
  nickname: faker.person.fullName(),
  email: data.email,
})

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
        me: dummyUser(action.data),
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
        me: null,
      }
    case LOG_OUT_FAILURE:
      return {
        ...state,
        logoutLoading: false,
        logoutError:action.error,
      }
    case SIGN_UP_REQUEST:
      return {
        ...state,
        signupLoading: true,
        signupDone: false,
        signupError:null,
      }
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signupLoading: false,
        signupDone: true,
      }
    case SIGN_UP_FAILURE:
      return {
        ...state,
        signupLoading: false,
        signupError:action.error,
      }
    default:
      return state;
  }
}

export default userReducer;