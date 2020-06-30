import React, { useState } from 'react';
import fire from '../../fire.js';
import './home.sass';
import Post from '../post/post.jsx';
import CreatePost from '../post/createPost.jsx';
import User from '../user/user';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export const HomeRouter = () => {
  const [searchFriend, setSearchFriend] = useState('');

  function logout(e) {
    e.preventDefault();
    fire.auth().signOut();
  }
  
  return (
    <Router>
      <nav>
        <input type='text' placeholder='search friends' value={searchFriend} onChange={ (e) => setSearchFriend(e.target.value)}/>
        <button onClick={logout}>logout</button>
      </nav>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path="/user/:id" component={User} />
      </Switch>
    </Router>
  );
}

const Home = () => {

  return (
    <div>
      <Post />
    </div>
  )
}

export default Home;
