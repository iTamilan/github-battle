var React = require('react');
var ReactDom = require('react-dom');
require('./index.css');
var App = require('./component/App');

// state
// Lifecycle events
// UI

ReactDom.render(
  <App />,
  document.getElementById('app')
)