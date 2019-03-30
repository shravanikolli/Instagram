import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NewPost from './newPost';
import PostFeed from './PostFeed';
import Spinner from '../common/Spinner';
import { getPosts } from '../../actions/PostActions';


class PostsFeed extends Component{
  componentDidMount(){
    this.props.getPosts();
  }
  render(){
    const { posts, loading } = this.props.posts;
    let postContent;

    if(posts === null || loading){
      postContent=<Spinner />
    }
    else{
      postContent=<PostFeed posts={posts} />
    }

    
    return(
      
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <NewPost />
            </div>
            <div className="col-md-12">
            {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostsFeed.PropTypes = {
  getPosts:PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(mapStateToProps, { getPosts })(PostsFeed);