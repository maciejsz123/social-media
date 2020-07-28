import React from 'react';
import { connect } from 'react-redux';
import './chat.sass';
import { addChat } from '../../redux/actions/chatActions';

function ListOfFriends(props) {

  const friendsFilter = props.users.filter( user => user.id === props.loggedUser.userId)
  .map( user => user.data.friends)
  .flat()
  .filter( user => user.accepted)

  const onlineFriends = props.users.reduce( (acc, user) => {
    friendsFilter.forEach( friend => {
      if(user.data.online && user.id === friend.id) {
        acc.push(user)
      }
    })
    return acc
  }, [])

  const onlineFriendsMap = friendsFilter.map( (user, i) => {
    let checkOnline = onlineFriends.filter( friend => friend.id === user.id);

    return (
      <div className='flex-row' key={i}>
        <div><button type='button' onClick={(e) => props.addChat(user)}>{user.name}</button></div>
        <div className={checkOnline.length > 0 ? 'green-dot' : ''}></div>
      </div>
    )
  })

  return (
    <div>
      <div id='online-friends'>{ onlineFriendsMap }</div>
    </div>
  )
}

const mapStateToProps = state => ({
  users: state.users.users,
  loggedUser: state.users.loggedUser,
  onlineUsers: state.users.onlineUsers,
  openedUsersTabs: state.chat.openedUsersTabs
})

export default connect(mapStateToProps, { addChat })(ListOfFriends);
