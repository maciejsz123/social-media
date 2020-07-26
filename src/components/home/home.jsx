import React, { useState } from 'react';
import fire from '../../fire.js';
import './home.sass';
import Posts from '../post/posts.jsx';
import CreatePost from '../post/createPost.jsx';
import User from '../user/user';
import Chat from '../chat/chat';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { setOnlineUser } from '../../App.js';

export const HomeRouter = (props) => {
  const [searchFriend, setSearchFriend] = useState('');

  function logout(e) {
    e.preventDefault();
    fire.auth().signOut();
    setOnlineUser(false, props.loggedUser, props.users);
  }

  return (
    <Router>
      <nav>
        <input type='text' placeholder='search friends' value={searchFriend} onChange={ (e) => setSearchFriend(e.target.value)}/>
        <button onClick={logout}>logout</button>
        <span><Link to='/'>Home</Link></span>
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
      <Chat />
      <Posts />
    </div>
  )
}

export default Home;
