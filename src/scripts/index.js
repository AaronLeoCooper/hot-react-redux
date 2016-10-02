// import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

const rootElement = document.getElementById('app')

ReactDOM.render(<App />, rootElement)

// ReactDOM.render(
//   <AppContainer>
//     <App />
//   </AppContainer>,
//   rootElement
// )

// if (module.hot) {
//   module.hot.accept('./App', () => {
//     const NextApp = require('./App').default
//     ReactDOM.render(
//       <AppContainer>
//         <NextApp />
//       </AppContainer>,
//       rootElement
//     )
//   })
// }
