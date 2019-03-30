import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Landing from './components/layouts/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NewPost from './components/posts/newPost';
import PostsFeed from './components/posts/PostsFeed';
import EditProfile from './components/profile/EditProfile';
import ChangePassword from './components/profile/ChangePassword';
import Dashboard from './components/posts/dashboard';

import Post from './components/post/Post';

import {Provider} from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';

import './App.css';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logOutUser } from './actions/authActions';

if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));


//Check for expiration
const currentTime = Date.now() / 1000;
if(decoded.exp < currentTime ){
  //Logout user
  store.dispatch(logOutUser());
  //redirect to login
  window.location.href="/login";
}
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path = "/addpost" component = {NewPost} />
              <Route exact path = "/posts" component = {PostsFeed} />
              <Route exact path="/edit" component={EditProfile} />
              <Route exact path="/changePassword" component={ChangePassword} />
              <Route exact path="/dashboard" component={Dashboard} />
              
              <Route exact path = "/post/:id" component = {Post} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
