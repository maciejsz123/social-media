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
  const [loggedUserFriends ,setLoggedUserFriends] = useState(undefined);

  useEffect( () => {
    props.fetchPosts();
  }, []);

  useEffect( () => {
    props.fetchUsers();
  }, []);

  useEffect( () => {
    let newLoggedUserData = props.usersData.filter( friend => friend.id === props.loggedUser.userId)
    setLoggedUserFriends(newLoggedUserData.length ? newLoggedUserData[0].data.friends : undefined);
  }, [props.usersData]);

  let postsMap = props.posts.filter( post => {
    if(typeof post.user !== 'object' && props.user === post.user) {
      return post
    } else if(typeof post.user !== 'object' && !props.user && loggedUserFriends) {
      return loggedUserFriends.filter( friend => {
        if(friend.accepted && (post.userId === friend.id || post.userId === props.loggedUser.userId)) {
          return post
        }
      })
    }
  })
  .sort( (a,b) => b.date.seconds - a.date.seconds)
  .map( (post, i) => <Post key={i} data={post} />)


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
