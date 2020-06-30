import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import fire from '../../fire.js';
import './home.sass';
import Post from '../post/post.jsx';
import CreatePost from '../post/createPost.jsx';
import User from '../user/user';

const Home = () => {
  const [searchFriend, setSearchFriend] = useState('');
  const users = ['test1@test.com', 'test@test.com'];

  function logout(e) {
    e.preventDefault();
    fire.auth().signOut();
  }

  return (
    <div>
      <Router>
        <div>
          <nav>
            <input type='text' placeholder='search friends' value={searchFriend} onChange={ (e) => setSearchFriend(e.target.value)}/>
            <span onClick={logout}>logout</span>
          </nav>
          <div>
            <span>
              <CreatePost />
              <Post />
              <User />
            </span>
          </div>

          <Switch>
            <Route path="/:user" component={User} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default Home;
