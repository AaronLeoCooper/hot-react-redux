import React, { Component } from 'react'
const cat = require('images/200.jpg')
require('styles/child.scss')

class Child extends Component {
  render () {
    return (
      <div>
        i'm the child
        <img src={cat} />
      </div>
    )
  }
}

export default Child
