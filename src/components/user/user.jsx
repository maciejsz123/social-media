import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import Post from '../post/post';
import Friends from '../friends/friends';
import AddFriend from '../friends/addFriend';
import { fetchUsers } from '../../redux/actions/usersActions';

function User(props) {

  useEffect( () => {
    props.fetchUsers();
  }, [props.match.params.id])

  return(
    <div>
      <h3>displaying data for user {props.match.params.id}</h3>
      <Post user={props.match.params.id}/>
      <Friends user={props.match.params.id}/>
      <AddFriend user={props.match.params.id}/>
    </div>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { fetchUsers })(User);
