import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.js'
import { BrowserRouter as Router } from 'react-router-dom'
import "semantic-ui-css/semantic.min.css"

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);