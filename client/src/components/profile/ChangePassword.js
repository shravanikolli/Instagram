import React, { Component } from 'react'

class ChangePassword extends Component {
  render() {
    return (
        <div class="container">
  <form action="/action_page.php"> 
    <div class="form-group">
      <input type="password" class="form-control" id="oldpassword" name="oldpassword" placeholder="Old Password" />
    </div>
    <div class="form-group">
      <input type="password" class="form-control" id="newpassword" name="newpassword" placeholder="New Password" />
    </div>
    <div class="form-group">
      <input type="password" class="form-control" id="confirmpassword" name="confirmpassword" placeholder="Confirm Password" />
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</div>
    )
  }
}

export default ChangePassword;