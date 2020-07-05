import React, { useState, useEffect } from 'react';
import fire from '../../fire.js';
import { Link } from "react-router-dom";
import { connect } from 'react-router';

function Friends(props) {
  const db = fire.firestore();
  const [friends, setFriends] = useState([]);

  useEffect( () => {

    const unsubscribe = db.collection('users').onSnapshot( (snap) => {

      const newFriends = snap.docs.map( (doc) => {
        return doc.data();
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
    })

    return () => unsubscribe();
  }, [props]);

  function acceptFriend(e, friend) {
    e.preventDefault();
    console.log(friend);
    //add user to friends - logged user

  }

  let mapFriends;
  let friendInvitations;
  if(friends) {
    mapFriends = friends.filter( friend => {
      if(friend.accepted) {
        return friend
      }
    }).map( (friend, i) => (
      <div key={i}><span>user: <Link to={`/user/${friend.name}`}>{friend.name}</Link></span></div>
    ));
    friendInvitations = friends.filter( friend => {
      if(!friend.accepted) {
        return friend
      }
    }).map( (friend, i) => (
      <div key={i}>
        <span>user: <Link to={`/user/${friend.name}`}>{friend.name}</Link></span>
        <button onClick={ (e) => acceptFriend(e, friend)}>accept</button>
      </div>
    ))
  } else {
    mapFriends = 'you have no friends'
  }

  return(
    <div>
      <h3>Friends of user {props.user}</h3>
      <span>{mapFriends}</span>
      <h3>Friend invitations</h3>
      <span>{friendInvitations}</span>
    </div>
  )
}

const mapStateToProps = state => ({
  users: props.users
})

export default connect()(Friends);
