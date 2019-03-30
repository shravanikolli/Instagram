import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';
import { addComment } from '../../actions/PostActions';

class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            comment:'',
            errors:{}
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(newProps){
        if(newProps.errors){
            this.setState({errors : newProps.errors});
        }
        
    }

    onSubmit(e){
        e.preventDefault();

        const {user} = this.props.auth;
        const {postId} = this.props;

        const newComment = {
            comment : this.state.comment,
            user : user.name,
            avatar : user.avatar
        };

        this.props.addComment( postId, newComment);
        this.setState({comment: ''});
    }

    onChange(e){
        this.setState({[e.target.name] : e.target.value});
    }

    render(){
        const {errors} = this.state;

        return (
            <div className = "post-form mb-3">
                <div className = "card card-info">
                    <div className="card-header bg-info text-white">
                    Make a comment...
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text" 
                                className={classnames('form-control mr-sm-2', {'is-invalid': errors.text} )}
                                placeholder="Add comments"
                                name="comment"
                                value={this.state.comment}
                                onChange={this.onChange}
                                />
                                {errors.text && (<div className="invalid-feedback">{errors.text}</div>)}
                            </div>
                            <button type="submit" className="btn btn-info btn-block mt-4 cusbutton">
                            Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}

CommentForm.PropTypes = {
    auth : PropTypes.object.isRequired,
    postId : PropTypes.string.isRequired,
    addComment : PropTypes.func.isRequired,
    errors : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth:state.auth,
    errors:state.errors
});

export default connect(mapStateToProps, {addComment})(CommentForm);
