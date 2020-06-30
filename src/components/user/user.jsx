import React, { useState, useEffect } from 'react';
import Post from '../post/post';

function User(props) {
  console.log(props)

  return(
    <div>
      <h3>displaying data for user {props.match.params.id}</h3>
      <Post user={props.match.params.id}/>
    </div>
  )
}

export default User;
