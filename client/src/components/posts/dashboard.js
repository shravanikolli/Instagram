import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostFeed from './PostFeed';
import Spinner from '../common/Spinner';
import { getAllPosts } from '../../actions/PostActions';

class Dashboard extends Component {
    componentDidMount(){
        this.props.getAllPosts();
      }
      render(){
        const { allPosts, loading } = this.props.posts;
        let postContent;
    
        if(allPosts === null || loading){
          postContent=<Spinner />
        }
        else{
          postContent=<PostFeed posts={allPosts} />
        }
    
        
        return(
          
          <div className="feed">
            <div className="dashboard-container">
              <div className="row">
                <div className="col-md-12">
                {postContent}
                </div>
              </div>
            </div>
          </div>
        );
      }
    
    
}

Dashboard.PropTypes = {
    getAllPosts:PropTypes.func.isRequired,
    posts: PropTypes.object.isRequired
  }
  
  const mapStateToProps = state => ({
    posts: state.posts
  });
  
export default connect(mapStateToProps, { getAllPosts })(Dashboard);
