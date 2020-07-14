import React, { useState, useEffect } from 'react';
import fire from '../../fire.js';
import { Link } from "react-router-dom";
import User from '../user/user'
import CreatePost from './createPost';
import { connect } from 'react-redux';
import { fetchPosts } from '../../redux/actions/postsActions';
import { fetchUsers } from '../../redux/actions/usersActions';
import Post from './post.jsx';

function Posts(props) {
  const db = fire.firestore();

  useEffect( () => {
    props.fetchPosts();
  }, [])

  useEffect( () => {
    props.fetchUsers();
  }, [])

  let postsMap = props.posts.map( (post, i) => {
    if(typeof post.user !== 'object' && props.user === post.user) {
      return <Post key={i} data={post} />
    } else if(typeof post.user !== 'object' && !props.user/* &&
    (post.userId === props.loggedUser.userId || post.userId === props.usersData.data.friends.id && props.usersData.data.friends.accepted === true)*/) {
      return <Post key={i} data={post} />
    }
  }).sort()

  if(props.error) {
    return <div>no data found</div>
  }

  if(props.loading) {
    return <div>Loading...</div>
  }

  return(
    <div>
      <CreatePost />
      {postsMap}
    </div>
  )
}

const mapStateToProps = state => ({
  posts: state.posts.posts,
  error: state.posts.error,
  loading: state.posts.loading,
  usersData: state.users.users,
  loggedUser: state.users.loggedUser
})

export default connect(mapStateToProps, { fetchPosts, fetchUsers })(Posts);
