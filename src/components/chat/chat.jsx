import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';

function Chat(props) {
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const friendsFilter = props.users.filter( user => user.id === props.loggedUser.userId)
    .map( user => user.data.friends)
    .flat()
    .filter( user => user.accepted)

    const newOnlineFriends = props.users.reduce( (acc, user) => {
      friendsFilter.filter( friend => {
        if(user.data.online && user.id === friend.id) {
          acc.push(user)
        }
      })
      return acc
    }, [])

    setOnlineFriends(newOnlineFriends)

  }, [props.users])

  const onlineFriendsMap = onlineFriends.map( (user, i) => (
    <div key={i}>{`user ${user.data.name} is online`}</div>
  ))

  return (
    <div>{ onlineFriends.length ?
      onlineFriendsMap : 'no friends active'}</div>
  )
}

const mapStateToProps = state => ({
  users: state.users.users,
  loggedUser: state.users.loggedUser
})

export default connect(mapStateToProps, {  })(Chat);
