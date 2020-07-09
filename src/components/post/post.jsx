import React, { useState, useEffect } from 'react';
import fire from '../../fire.js';
import { Link } from "react-router-dom";
import User from '../user/user'
import CreatePost from './createPost';
import { connect } from 'react-redux';
import { fetchPosts } from '../../redux/actions/postsActions';

function Post(props) {
  const db = fire.firestore();

  useEffect( () => {
    props.fetchPosts();
  }, [])


  let postsMap = props.posts.map( (post, i) => {
    if(typeof post.user !== 'object' && props.user === post.user) {
      return (
        <div key={i}>
          <span>user: <Link to={`/user/${post.user}`}>{post.user}</Link></span>
          {`text: ${post.text} date: ${new Date(post.date.seconds * 1000)}`}
        </div>
      )
    } else if(typeof post.user !== 'object' && !props.user) {
      return (
        <div key={i}>
          <span>user: <Link to={`/user/${post.user}`}>{post.user}</Link></span>
          {`text: ${post.text} date: ${new Date(post.date.seconds * 1000)}`}
        </div>
      )
    }
  })

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
  loading: state.posts.loading
})

export default connect(mapStateToProps, { fetchPosts })(Post);
