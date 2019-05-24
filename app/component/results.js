import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import {battle} from '../utils/api'
import {Link} from 'react-router-dom'
import PlayerPreview from './PlayerPreview'

function Profile (props) {
  const {login, avatar_url, name, location, company, followers, following, public_repos,blog} = props.info

  return (
    <PlayerPreview username={login} avatar={avatar_url}>
      <ul className='space-list-items'>
        {name && <li>{name}</li>}
        {location && <li>{location}</li>}
        {company && <li>{company}</li>}
        <li>Followers: {followers}</li>
        <li>Following: {following}</li>
        <li>Public Repos: {public_repos}</li>
        {blog && <li><a href={blog}>{blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired,
}

function Player ({label, score, profile}) {
  return (
    <div>
      <h1 className='header'>{label}</h1>
      <h3 style={{textAlign: 'center'}}>Score: {score}</h3>
      <Profile info={profile} />
    </div>
  )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired,
}

export default class Results extends React.Component {

  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true,
  }
  componentDidMount() {
    var players = queryString.parse(this.props.location.search);

    battle([
      players.playerOneName,
      players.playerTwoName
    ]).then((players) => {
     players === null ? this.setState(() => ({
            error: 'Looks like there was an error. Check that both users exist on Github.',
            loading: false,
          })) : this.setState(() => ({
          error: null,
          winner: players[0],
          loser: players[1],
          loading: false,
        }))
  })
  }

  render() {
    const {error, winner, loser, loading} = this.state

    if (loading === true) {
      return <p>Loading!</p>
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      )
    }

    return (
      <div className='row'>
        <Player
          label='Winner'
          score={winner.score}
          profile={winner.profile}
        />
        <Player
          label='Loser'
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    )
  }
}