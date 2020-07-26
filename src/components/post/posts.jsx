import React, { useState, useEffect } from 'react';
import CreatePost from './createPost';
import { connect } from 'react-redux';
import { fetchPosts } from '../../redux/actions/postsActions';
import { fetchUsers } from '../../redux/actions/usersActions';
import Post from './post.jsx';

function Posts(props) {
  const [loggedUserFriends, setLoggedUserFriends] = useState([]);

  useEffect( () => {
    props.fetchPosts();
  }, []);

  useEffect( () => {
    props.fetchUsers();
  }, []);

  useEffect( () => {
    let newLoggedUserData = props.usersData.filter( friend => friend.id === props.loggedUser.userId)
    setLoggedUserFriends(newLoggedUserData.length ? newLoggedUserData[0].data.friends : []);
  }, [props.usersData]);

  let postsMap = props.posts.reduce( (acc, post) => {
    if(typeof post.user !== 'object' && props.user === post.user) {
      acc.push(post);
    } else if (typeof post.user !== 'object' && !props.user && loggedUserFriends.length) {
      let v = loggedUserFriends.reduce( (acc1, friend) => {
        if(friend.accepted && !acc1.length && (post.userId === friend.id || post.userId === props.loggedUser.userId)) {
          acc1.push(post);
        }
        return acc1
      }, [])
      acc.push(...v)
    } else if(typeof post.user !== 'object' && !props.user && !loggedUserFriends.length) {
      if(post.userId === props.loggedUser.userId) {
        acc.push(post)
      }
    }
    return acc
  }, [])

  postsMap = postsMap.sort( (a,b) => b.date.seconds - a.date.seconds)
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
