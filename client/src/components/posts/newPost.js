import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/PostActions';

class NewPost extends Component {
  constructor(props){
    super(props);
    this.state = {
      location: '',
      url : '',
      description: '',
      tagpeople: '',
      errors: {}
    };

    
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //Component lifecycle method
  componentWillReceiveProps(newProps){
    if(newProps.errors){
      this.setState({ errors: newProps.errors});
    }
  }

  onSubmit(e){
    e.preventDefault();

    const { user } = this.props.auth;
    const newPost = {
      location:this.state.location,
      url:this.state.url,
      description: this.state.description,
      tagpeople: this.state.tagpeople,
      name:user.name,
      avatar: user.avatar
    };

    this.props.addPost(newPost);
    this.setState({text : ''});
    
  }

  onChange(e){
    this.setState( { [e.target.name] : e.target.value});
  }
  

  render() {
    const { errors } = this.state;
    var styles = {
        width :'100%',
        height : '80%',
        paddingTop:'100px',
        paddingBottom:'10px',
        display :'inline-block'
    };
    return (
        <div className="container" style={styles}>
        <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-secondary text-white">Make a new post!</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-inline">
                <label for="location" className="mr-sm-2">Location </label>
                <input type="text" className={classnames('form-control mr-sm-2', {'is-invalid': errors.location} )} placeholder="Location" name="location" 
                value={this.state.location}
                onChange={this.onChange} />
                <i className ="fas fa-map-marker-alt"></i><br/>
                {errors.location && (<div className="invalid-feedback">{errors.location}</div>)}
              </div>
              <br/>
              
              <div className="form-inline">
              <label for="url" className="mr-sm-2">Enter url</label>
                
                <input type="text" className={classnames('form-control mr-sm-2 mb-2', {'is-invalid': errors.text} )} placeholder="url" name="url" 
                value={this.state.url}
                onChange={this.onChange} />
                
                <button
                  type="submit" className="btn btn-dark">
                    <i className="fas fa-plus"></i>
                </button>
                {errors.text && (<div className="invalid-feedback">{errors.text}</div>)}
              </div>
            
            <br/>
            <div className="form-inline">
                <label for="description" className="mr-sm-2">Description</label>
                <input type="text" className={classnames('form-control mr-sm-2', 
                {'is-invalid': errors.description} )} placeholder="Description" name="description" 
                value={this.state.description}
                onChange={this.onChange} />
                {errors.description && (<div className="invalid-feedback">{errors.description}</div>)}
            </div>
            <br/>
            <div className="form-inline">
                <label for="tag people" className="mr-sm-2">Tag People</label>
                <input type="text" className={classnames('form-control mr-sm-2', 
                {'is-invalid': errors.tagpeople} )} placeholder="TagPeople" name="tagpeople" 
                value={this.state.tagpeople}
                onChange={this.onChange} />
                {errors.tagpeople && (<div className="invalid-feedback">{errors.people}</div>)}
            </div>
            <br/>
            <button type="submit" className="btn btn-info btn-block mt-4 cusbutton">
                Submit
            </button>
            </form>
        </div>
      </div>
    </div>
    </div>
    )
  }
}

NewPost.PropTypes = {
  addPost : PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth : state.auth,
  errors : state.errors
});

export default connect(mapStateToProps, {addPost})(NewPost);

