/**
 * Build entrypoint for app
 * (HMR disabled)
 */

import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

const rootElement = document.getElementById('app')

ReactDOM.render(<App />, rootElement)
