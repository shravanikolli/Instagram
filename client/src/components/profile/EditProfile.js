import React, { Component } from "react";
import axios from "axios";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import classnames from "classnames";
import { editProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      website: "",
      bio: "",
      phonenumber: "",
      gender: "",
      editParam: 0,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onEditParamChange = this.onEditParamChange.bind(this);
  }

  componentDidMount() {
    let data = this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // If profile field doesnt exist, make empty string
      profile.website = !isEmpty(profile.website) ? profile.website : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.phonenumber = !isEmpty(profile.phonenumber)
        ? profile.phonenumber
        : '';
      profile.gender = !isEmpty(profile.gender) ? profile.gender : '';

      // Set component fields state
      this.setState({
        website: profile.website,
        bio: profile.bio,
        phonenumber: profile.phonenumber,
        gender: profile.gender
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onEditParamChange(e) {
    let paramValue = 0;

    if(e.target.className == "ep-1") {
      paramValue = 1;
    } else if (e.target.className == "ep-2") {
      paramValue = 2;
    }

    this.setState({ editParam: paramValue });
  }

  renderEditComponent(editParam) {
    let element = (
      <div className="edit-profile-container">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Name"
              value={this.props.profile && this.props.profile.profile && this.props.profile.profile.name ? this.props.profile.profile.name : ''}
              disabled
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Username"
              value={this.props.profile && this.props.profile.profile && this.props.profile.profile.username ? this.props.profile.profile.username : ''}
              disabled
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="website"
              name="website"
              placeholder="Website"
              value={this.state.website}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              name="bio"
              id="bio"
              rows="2"
              placeholder="Bio"
              value={this.state.bio}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label className="col-sm-8 col-form-label">
              Private Information
            </label>
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Email"
              value={this.props.profile && this.props.profile.profile  && this.props.profile.profile.email ? this.props.profile.profile.email : ''}
              disabled
            />
          </div>
          <div className="form-group">
            {/* <input type="text" className={classnames('form-control',{'is-invalid': errors.name})} id="phonenumber" name="phonenumber" placeholder="Phone number" value={this.state.phonenumber} onChange={this.onChange}/>
        {errors.name && (<div className="invalid-feedback">{errors.name}</div>)} */}
            <input
              type="tel"
              className="form-control"
              id="phonenumber"
              name="phonenumber"
              placeholder="Phone number"
              value={this.state.phonenumber}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" for="gender">
              Gender
            </label>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="male"
                value="male"
                onChange={this.onChange}
              />
              <label className="form-check-label" for="male">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="female"
                value="female"
                onChange={this.onChange}
              />
              <label className="form-check-label" for="female">
                Female
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );

    if (editParam == 1) {
      element = (<div> change password </div>);
    } else if (editParam == 2) {
      element = (<div> Delete Account </div>);
    }

    return element;
  }

  onSubmit(e) {
    e.preventDefault();

    //update user profile details
    const profileData = {
      website: this.state.website,
      bio: this.state.bio,
      phonenumber: this.state.phonenumber,
      gender: this.state.gender
    };

    // axios
    //   .post("/api/profile/edit", editProfile)
    //   .then(res => console.log(res.data))
    //   .catch(err => this.setState({ errors: err.response.data }));

    this.props.editProfile(profileData, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <section className="edit-profile-section">
        <nav className="edit-profile-nav">
          <ul>
            <li>
              <div onClick={this.onEditParamChange} className="ep-0">Edit Profile</div>
            </li>
            <li>
              <div onClick={this.onEditParamChange} className="ep-1">Change Password</div>
            </li>
            <li>
              <div onClick={this.onEditParamChange} className="ep-2">Delete Account</div>
            </li>
          </ul>
        </nav>
        {
          this.renderEditComponent(this.state.editParam)
        }
      </section>
    );
  }
}


EditProfile.propTypes = {
  editProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

//export default EditProfile;

export default connect(mapStateToProps, { editProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
