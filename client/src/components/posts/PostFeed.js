import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostItem from './postItem';

class PostFeed extends Component{
  render(){
    const { posts } = this.props;

    return posts.map( post => <PostItem key={post._id} post={post} />)
    // const { posts, allPosts } = this.props;

    // return this.props.isAllPosts && allPosts ? 
    // allPosts.map( post => <PostItem key={post._id} post={post} />) 
    // : (posts ? posts.map( post => <PostItem key={post._id} post={post} />) : '')
  }
}

PostFeed.PropTypes = {
  posts:PropTypes.array.isRequired
}

export default PostFeed;