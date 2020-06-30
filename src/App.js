import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './App.sass';
import fire from './fire';
import Home, { HomeRouter } from './components/home/home';
import Login from './components/login/login';
import User from './components/user/user';
import { setLoggerUser } from './redux/actions/usersActions';


function App(props) {
  useEffect( () => {
    fire.auth().onAuthStateChanged( user => {
      if(user) {
        props.setLoggerUser(user.email);
      } else {
        props.setLoggerUser(null);
      }
    })
  }, []);

  return (
    <div className="App">
      {props.users.loggedUser ? <HomeRouter /> : <Login />}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.user
  }
};

export default connect(mapStateToProps, {setLoggerUser})(App);
