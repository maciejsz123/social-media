import React, { useState, useEffect } from 'react';
import Post from '../post/post';
import Friends from '../friends/friends';
import AddFriend from '../friends/addFriend';
import { fetchUsers } from './redux/actions/usersActions';

function User(props) {

  useEffect( () => {
    const unsubscribe = fetchUsers();
    return () => unsubscribe();
  }, [])

  return(
    <div>
      <h3>displaying data for user {props.match.params.id}</h3>
      <Post user={props.match.params.id}/>
      <Friends user={props.match.params.id}/>
      <AddFriend user={props.match.params.id}/>
    </div>
  )
}

export default User;
