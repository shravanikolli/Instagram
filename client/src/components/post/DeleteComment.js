import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment } from '../../actions/PostActions';

class DeleteComment extends Component {
    onDeleteClick(postId, commentId){
        this.props.deleteComment(postId, commentId);
    }

    render(){
        var styles = {
          width:'50px',
          height:'50px'
        };
        const { comment, postId, auth} = this.props;

        return (
            <div className="card card-body mb-3">
              <div className="row">
                <div className="col-md-2" >
                  <a href="profile.html">
                    <img
                      className="rounded-circle d-none d-md-block" 
                      style={styles}
                      src={comment.avatar}
                      alt=""
                    />
                  </a>
                  <br />
                  <span className="text-center">{comment.name}</span>
                </div>
                
                <div className="col-md-10">
                  <p className="lead">{comment.body}</p>
                  {comment.user === auth.user.id ? (
                    
                    <button
                      onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                      type="button"
                      className="btn btn-danger mr-1"
                    >
                      <i className="fas fa-times" />
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          );
        }
    }

DeleteComment.PropTypes = {
    auth : PropTypes.object.isRequired,
    postId : PropTypes.string.isRequired,
    comment : PropTypes.object.isRequired,
    deleteComment : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth : state.auth
});

export default connect(mapStateToProps, {deleteComment})(DeleteComment);