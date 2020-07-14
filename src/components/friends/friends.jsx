import React, { useState, useEffect } from 'react';
import fire from '../../fire.js';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchUsers } from '../../redux/actions/usersActions';
import Unfriend from './unfriend';

function Friends(props) {
  const db = fire.firestore();
  const [friends, setFriends] = useState([]);
  const [actualUser, setActualUser] = useState('');

  useEffect( () => {
    if(!props.users.length) {
      return;
    }
    let getActualUser = '';
    const newFriends = props.users.map( (doc) => {
      if(doc.data.name === props.user) {
        getActualUser = doc
      }
      return doc.data;
    }).filter( doc => {
      if(doc.friends.length) {
        if(doc.name === props.user) {
          return doc.friends
        }
      }
    }).map( doc => {
      return doc.friends
    });

    setFriends(...newFriends);
    setActualUser(getActualUser);
  }, [props.users]);

  function acceptFriend(e, friend) {
    e.preventDefault();

    const friendData = props.users.filter( user => {
      return user.id === friend.id
    })

    const actualObj = createNewFriendObject(actualUser, friend);
    const friendObj = createNewFriendObject(...friendData, actualUser);

    db.collection('users').doc(actualObj.id).set(actualObj.data);
    db.collection('users').doc(friendObj.id).set(friendObj.data);

  }

  function createNewFriendObject(user, friend) {
    let newFriendState = user.data.friends.map( act => {
      if(act.id === friend.id) {
        return {...act, accepted: true, invited: true}
      }
      return act
    })

    return {
      id: user.id,
      data: {
        ...user.data,
        friends: [...newFriendState]
      }
    }
  }

  let mapFriends;
  let friendInvitations;
  let sentInvitations;
  if(friends) {
    mapFriends = friends.filter( friend => {
      if(friend.accepted) { return friend }
    }).map( (friend, i) => (
      <div key={i}>
        <span>user: <Link to={`/user/${friend.name}`}>{friend.name}</Link></span>
        {
          props.user !== props.loggedUser.user?
          '' :
          <Unfriend friend={friend} actualUser={actualUser}/>
        }
      </div>
    ));

    sentInvitations = friends.filter(friend => {
      if(!friend.accepted && friend.invited && !friend.iWasInvited) { return friend }
    }).map( (friend, i) => (
      <div key={i}><span>user: <Link to={`/user/${friend.name}`}>{friend.name}</Link></span></div>
    ));

    friendInvitations = friends.filter( friend => {
      if(!friend.accepted && friend.invited && friend.iWasInvited) { return friend }
    }).map( (friend, i) => (
      <div key={i}>
        <span>user: <Link to={`/user/${friend.name}`}>{friend.name}</Link></span>
        <button onClick={ (e) => acceptFriend(e, friend)}>accept</button>
      </div>
    ))
  } else {
    mapFriends = 'you have no friends';
  }


  if(props.loading) {
    return <div>Loading...</div>
  }
  if(props.error) {
    return <div>{props.error}</div>
  }
  return(
    <div>
      <h3>Friends of user {props.user}</h3>
      <span>{mapFriends}</span>
      {
        props.user !== props.loggedUser.user ?
        '' :
        (<div>
          <h3>Friend invitations</h3>
          <span>{friendInvitations}</span>
        </div>)
      }
      {
        props.user !== props.loggedUser.user ?
        '' :
        (<div>
          <h3>sent invitations</h3>
          <span>{sentInvitations}</span>
        </div>)
      }

    </div>
  )
}

const mapStateToProps = state => ({
  users: state.users.users,
  loading: state.users.loading,
  error: state.users.error,
  loggedUser: state.users.loggedUser
})

export default connect(mapStateToProps, { fetchUsers })(Friends);
