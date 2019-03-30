import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike } from '../../actions/PostActions';

class PostItem extends Component{
    onDeleteClick(id)
    {
        this.props.deletePost(id);
    }
    onLikeClick(id)
    {
        this.props.addLike(id);
    }
    findUserLike(likes){
        const { auth } = this.props;
        if(likes.filter( like => like.user === auth.user.id).length > 0){
            return true;
        } 
        else{
            return false;
        }
    }

    render()
    {
        var styles = {
            width : '50px',
            height : '50px'
        }
        const{ post, auth, showActions } = this.props;

        return(
        <div className="card bg-light mb-3 card-body mb-3">
            <div className="row">
                <div className="col-md-2">
                
                    <Link to="/profile">
                        <img
                        className="rounded-circle d-none d-md-block"
                        style={styles}
                        src={post.avatar}
                        alt="avatar"
                        />
                    </Link>
                    <br />
                    <p>{post.name}</p>
                    
                </div>
                <br />
                <div className="col-md-6">
                    <span className="Location">{post.location}</span><br/>
                    <span className="text-center">{post.description}</span>
                    <br/>
                </div>
                </div>
                <img className="posts-image" src={post.media.url} />
                <span>{post.tagPeople}</span>
                <br/><br/>
                <div>
                {showActions ? (
                <span>
                    <button
                    onClick={this.onLikeClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-light mr-1"
                    >
                    <i
                    className={classnames('fas fa-thumbs-up', {
                      'text-info': this.findUserLike(post.likes)
                    })}
                    />
                    <span className="badge badge-light">{post.likes.length}</span>
                    </button>
                    <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                        Comments
                    </Link>
                    { !post.bookMark ? 
                    <span className="far fa-bookmark"></span> :
                    <span className="fas fa-bookmark"></span> }
                </span>
                
                ) : null}
            </div>
      </div>
    );
    }
}
PostItem.defaultProps = {
    showActions:true
}
PostItem.PropTypes = {
    deleteposts:PropTypes.func.isRequired,
    addLike:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth:state.auth
})

export default connect(mapStateToProps, {deletePost, addLike})(PostItem);