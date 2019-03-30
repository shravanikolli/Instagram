import {GET_ERRORS, SET_CURRENT_USER} from './types';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';


//Register User
export const registeruser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

//Login user - get user token
export const loginUser = (userData) => dispatch => {
  axios
      .post('/api/users/login', userData)
      .then(res => {
          //save to local storage
          const {token} = res.data;
          //set token to local storage (stored as key value pair)
          localStorage.setItem('jwtToken', token);
          //set token to auth header
          setAuthToken(token);
          //Decode token to get user data
          const decoded = jwt_decode(token);
          //set current user
          dispatch(setCurrentUser(decoded));
      })
      .catch(err => 
          dispatch({
              type: GET_ERRORS,
              payload: err.response.data
          })
      );
}

//Logout user
export const logOutUser = () => dispatch => {
//Remove token from local storage
localStorage.removeItem('jwtToken');
//Remove auth header
setAuthToken(false);
//set current user in redux store to be null
dispatch(setCurrentUser({}));
window.location.href="/login";
}

export const setCurrentUser = decoded => {
    return {
      type: SET_CURRENT_USER,
      payload: decoded
    }
  }