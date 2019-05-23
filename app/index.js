var React = require('react');
var ReactDom = require('react-dom');
require('./index.css');

// state
// Lifecycle events
// UI

class App extends React.Component {
  render() {
    return (
      <div>
        Hello world!
      </div>
    )
  }
}

ReactDom.render(
  <App />,
  document.getElementById('app')
)