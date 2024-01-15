import React from 'react'
import ReactDOM from 'react-dom/client'
import { RootCmp } from './RootCmp.jsx'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorkerRegistration from './serviceWorkerRegistration.js'
import './assets/styles/main.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <Router>
      <RootCmp />
    </Router>
  </Provider>
)
