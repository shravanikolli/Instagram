import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DeleteComment from './DeleteComment';

class CommentFeed extends Component {
    render(){
        const {comments, postId } = this.props;

        return comments.map(comment => (
            <DeleteComment key={comment._id} comment={comment} postId={postId} />
        ));
    }
}

CommentFeed.PropTypes={
    comments : PropTypes.array.isRequired,
    postId : PropTypes.string.isRequired
};

export default CommentFeed;