const React = require('react');
const PropTypes = require('prop-types');

var styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px'
  }
};

class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text
    };
  }
  componentDidMount() {
    const {text, speed} = this.props
    const stopper = text + '...'

    this.interval = window.setInterval(() => {
      text === stopper ? this.setState(() => ({text: this.props.text})) : this.setState(({text}) => ({text: text + '.'}))}, speed)
  }
  componentWillUnmount() {
    window.clearInterval(this.interval);
  }
  render() {
    const {text} = this.state
    return (
      <p style={styles.content}>
        {text}
      </p>
    )
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
};

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
};

module.exports = Loading;