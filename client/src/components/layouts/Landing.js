import React, { Component } from 'react'

export default class Landing extends Component {
  render() {
    return (
        <header className="masthead text-center text-white">
        <div className="masthead-content">
          <div className="container">
            <h1 className="masthead-heading mb-0">Just a click</h1>
            <h2 className="masthead-subheading mb-0">Post your pic!</h2>
            <a href="/" className="btn btn-primary btn-xl rounded-pill mt-5">Learn More</a>
          </div>
        </div>
        <div className="bg-circle-1 bg-circle"></div>
        <div className="bg-circle-2 bg-circle"></div>
        <div className="bg-circle-3 bg-circle"></div>
        <div className="bg-circle-4 bg-circle"></div>
        </header>
    )
  }
}
