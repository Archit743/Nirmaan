import React, { Component } from 'react'
import "./header.css"

export class header extends Component {
  render() {
    return (
      <header>
      <nav>
          <div class="logo">CampusHub</div>
          <div class="nav-links">
              <a href="#">Profile</a>
              <a href="#">Your Receipts</a>
          </div>
      </nav>
  </header>
    )
  }
}

export default header