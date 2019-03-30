const Validator = require('validator');
const isEmpty = require('./is-empty');

function validateCommentInput(data){ 
    let errors = {};

    data.text = !(isEmpty(data.text)) ? data.text : '';

    //Check comment body is not empty
    if(isEmpty(data.comment)){
        errors.text = 'Comment body is required'
    }
    return {
        errors,
        isValid:isEmpty(errors)
    };
}

function validatePostInput(data){
    let errors = {};

    data.text = !(isEmpty(data.text)) ? data.text : '';
    
    //Check data type of comment flag to be boolean
    if(!isEmpty(data.commentflag)){
        if(!Validator.isBoolean(data.commentflag)){
            errors.text = 'Please provide boolean value for comment_flag'
        }
    }

    //Checks url field is provided
    if(isEmpty(data.url))
    {
        errors.text = 'Url field is required'
    }
    else{

        //Check number of url's is less than or equal to 10
        let arrayData = {};
        arrayData = data.url.split(',');
        if(arrayData.length > 10)
        errors.text = 'Maximum of 10 url is allowed for a post';

        //check for valid url format
        arrayData.forEach(element => {
            if(!Validator.isURL(element)){
                errors.text = 'Please provide valid url'
            }
        })
    
    }
    
    return {
        errors,
        isValid:isEmpty(errors)
    };
}

module.exports.validatePostInput = validatePostInput;
module.exports.validateCommentInput = validateCommentInput;


    