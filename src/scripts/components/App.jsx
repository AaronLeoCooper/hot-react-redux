import React, { Component } from 'react'
import Child from './Child'
import Child2 from './Child2'
require('styles/app.scss')

class App extends Component {
  render () {
    return (
      <div>
        <span />
        <h1>Hello! Make a change... like this?</h1>
        <h2>Or maybe this</h2>
        <Child />
        <Child2 />
      </div>
    )
  }
}

export default App
