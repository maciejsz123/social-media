import React, { useState, useEffect } from 'react';
import fire from '../../fire.js';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

function Friends(props) {
  const db = fire.firestore();
  const [friends, setFriends] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);

  useEffect( () => {
    let unmounted = false;
    fetchUsers();
    async function fetchUsers() {
      let data = [];

      await db.collection('users').onSnapshot( (snap) => {
        data = snap.docs.map( (doc) => (
          {
            data: doc.data(),
            id: doc.id
          }
        ));
        setFetchedData(data);
        setFetched(true);
      });

    }
    return () => { unmounted = true };
  }, []);

  useEffect( () => {
    try {
      if(!fetched) return;
      const getActualUser = getActualUserFoo(fetchedData, props.user);

      const newFriends = fetchedData.filter( doc => doc.data.friends.length && doc.id === getActualUser.id)
      .map( doc => doc.data.friends);

      setFriends(...newFriends);
    } catch(err) {
      console.log('an error, refreshing');
    }
  });

  function getActualUserFoo(arrayOfUsers, userName) {
    return arrayOfUsers.filter( user => user.data.name === userName)[0];
  }

  function acceptFriend(e, friend) {
    e.preventDefault();

    db.collection('users').onSnapshot( async (snap) => {
      const getUsers = await snap.docs.map( (doc) => (
        {
          data: doc.data(),
          id: doc.id
        }
      ));

      const friendData = getUsers.filter( user => user.id === friend.id );

      const actualObj = createNewFriendObject(getActualUserFoo(getUsers, props.user), friend);
      const friendObj = createNewFriendObject(...friendData, getActualUserFoo(getUsers, props.user));

      await db.collection('users').doc(actualObj.id).set(actualObj.data);
      await db.collection('users').doc(friendObj.id).set(friendObj.data);

    })

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

  function unfriend(e, friend) {
    e.preventDefault();

    db.collection('users').onSnapshot( async (snap) => {
      const getUsers = await snap.docs.map( (doc) => (
        {
          data: doc.data(),
          id: doc.id
        }
      ));

      const friendData = getUsers.filter( user => user.id === friend.id);

      const actualObj = createNewDeleteObject(getActualUserFoo(getUsers, props.user), friend);
      const friendObj = createNewDeleteObject(...friendData, getActualUserFoo(getUsers, props.user));

      await db.collection('users').doc(actualObj.id).set(actualObj.data)
      await db.collection('users').doc(friendObj.id).set(friendObj.data)
    })
  }

  function createNewDeleteObject(user, friend) {
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

  let mapFriends;
  let friendInvitations;
  let sentInvitations;
  if(friends) {
    mapFriends = friends.filter( friend => friend.accepted && friend.name !== props.user)
    .map( (friend, i) => (
      <div key={i}>
        <span>user: <Link to={`/user/${friend.name}`}>{friend.name}</Link></span>
        {
          props.user !== props.loggedUser.user ?
          '' :
          <span><button onClick={(e) => unfriend(e, friend)}>unfriend</button></span>
        }
      </div>
    ));

    sentInvitations = friends.filter(friend => !friend.accepted && friend.invited && !friend.iWasInvited)
    .map( (friend, i) => (
      <div key={i}><span>user: <Link to={`/user/${friend.name}`}>{friend.name}</Link></span></div>
    ));

    friendInvitations = friends.filter( friend => !friend.accepted && friend.invited && friend.iWasInvited)
    .map( (friend, i) => (
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
  loggedUser: state.users.loggedUser
})

export default connect(mapStateToProps)(Friends);
