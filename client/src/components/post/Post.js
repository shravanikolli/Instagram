import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PostItem from '../posts/postItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import Spinner from '../common/Spinner';
import { getPost } from '../../actions/PostActions';

class Post extends Component {
    componentDidMount(){
        this.props.getPost(this.props.match.params.id);
    }

    render(){
        const { post, loading } = this.props.posts;

        let postsContent;

        if(post === null || loading || Object.keys(post).length === 0){
            postsContent = <Spinner />
        }
        else{
            postsContent = (
                <div>
                    <PostItem post={post} showActions={false} />
                    <CommentForm postId={post._id} />
                    <CommentFeed postId={post._id} comments={post.comments} />
                </div>
            );
        }
        var styles = {
            marginTop:'120px',
            position:'relative'
        }
        return (
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/posts" style={styles} className="btn btn-light mb-3">
                            Back To Feed
                            </Link>
                            {postsContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Post.PropTypes = {
    getPost : PropTypes.func.isRequired,
    posts : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    posts:state.posts
});

export default connect(mapStateToProps, {getPost})(Post);