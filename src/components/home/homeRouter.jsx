import React, { useState } from 'react';
import fire from '../../fire.js';
import './home.sass';
import User from '../user/user';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './home';
import { connect } from 'react-redux';
import { setOnlineUser } from '../../App.js';
import { closeWindow } from '../../redux/actions/chatActions';

const HomeRouter = (props) => {
  const [searchFriend, setSearchFriend] = useState('');
  function logout(e) {
    e.preventDefault();
    props.chatList.forEach((item, i) => {
      props.closeWindow(item);
    });
    setOnlineUser(false, props.loggedUser, props.users);
    
    fire.auth().signOut();
  }

  return (
    <Router>
      <div>
        <h3>logged as {props.loggedUser.user}</h3>
        <nav>
          <input type='text' placeholder='search friends' value={searchFriend} onChange={ (e) => setSearchFriend(e.target.value)}/>
          <button onClick={logout}>logout</button>
          <span><Link to='/'>Home</Link></span>
        </nav>
      </div>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path="/user/:id" component={User} />
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.users.loggedUser,
    users: state.users.users,
    chatList: state.chat.openedUsersTabs
  }
};

export default connect(mapStateToProps, { closeWindow })(HomeRouter);
