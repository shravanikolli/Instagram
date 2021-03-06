import axios from 'axios';

import {
    GET_PROFILE,
    PROFILE_LOADING,
    GET_ERRORS
  } from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios
      .get('/api/profile')
      .then(res =>
        dispatch({
          type: GET_PROFILE,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_PROFILE,
          payload: {}
        })
      );
  };

  // Edit Profile
export const editProfile = (profileData, history) => dispatch => {
    axios
      .post('/api/profile/edit', profileData)
      .then(res => {
        console.log("profile updated");
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

// Profile loading
export const setProfileLoading = () => {
    return {
      type: PROFILE_LOADING
    };
  };