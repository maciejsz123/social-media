import React, { useState, useEffect } from 'react';
import fire from '../../fire.js';
import { connect } from 'react-redux';

function Unfriend(props) {
  const db = fire.firestore();

  function unfriend(e) {
    e.preventDefault();

    const friendData = props.users.filter( user => {
      return user.id === props.friend.id
    })

    const actualObj = createNewFriendObject(props.actualUser, props.friend);
    const friendObj = createNewFriendObject(...friendData, props.actualUser);

    db.collection('users').doc(actualObj.id).set(actualObj.data);
    db.collection('users').doc(friendObj.id).set(friendObj.data);

  }

  function createNewFriendObject(user, friend) {
    let newFriendState = user.data.friends.reduce( (total, act) => {
      if(act.id !== friend.id) {
        total.push(act)
        return total
      }
      return total
    }, [])

    return {
      id: user.id,
      data: {
        ...user.data,
        friends: [...newFriendState]
      }
    }
  }

  return(
    <div>
    { (props.loggedUser.user === props.user ) ?
      '':
      (<span><button onClick={unfriend}>unfriend</button></span>)
    }
    </div>
  )
}

const mapStateToProps = state => ({
  loggedUser: state.users.loggedUser,
  users: state.users.users
});

export default connect(mapStateToProps)(Unfriend);
