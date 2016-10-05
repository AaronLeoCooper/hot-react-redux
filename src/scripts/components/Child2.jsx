import React, { Component } from 'react'
const img = require('images/200.jpg')
require('styles/child.scss')

class Child2 extends Component {
  render () {
    return (
      <div>
        i'm the child2
        <img src={img} />
      </div>
    )
  }
}

export default Child2
