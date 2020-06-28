import React, { useState } from 'react';
import fire from '../../fire.js';
import './home.sass';
import Post from '../post/post.jsx';
import CreatePost from '../post/createPost.jsx';

const Home = () => {
  const [searchFriend, setSearchFriend] = useState('');

  function logout(e) {
    e.preventDefault();
    fire.auth().signOut();
  }

  return (
    <div>
      <nav>
        <input type='text' placeholder='search friends' value={searchFriend} onChange={ (e) => setSearchFriend(e.target.value)}/>
        <span onClick={logout}>logout</span>
      </nav>
      <div>
        <span>
          <CreatePost />
          <Post />
        </span>
      </div>
    </div>
  )
}

export default Home;
