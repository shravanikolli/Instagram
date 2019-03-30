const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = 'Not a valid URL';
    }
  }

  // if (!isEmpty(data.phonenumber)) {
  //   if (data.phonenumber.length < 10) {
  //     errors.phonenumber = 'Not a valid phone number. Minimum of 10 digits should be there.';
  //   }
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  }
};