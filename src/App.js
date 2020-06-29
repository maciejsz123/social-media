import React, { useState, useEffect } from 'react';
import './App.sass';
import fire from './fire';
import Home from './components/home/home';
import Login from './components/login/login';
import { connect } from 'react-redux';
import { setLoggerUser } from './redux/actions/usersActions';

function App(props) {
  const [user, setUser] = useState(null);

  useEffect( () => {
    fire.auth().onAuthStateChanged( user => {
      if(user) {
        setUser(user);
        props.setLoggerUser(user);
      } else {
        setUser(null);
      }
    })
  }, []);

  return (
    <div className="App">
      {user ? <Home /> : <Login />}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
};

export default connect(mapStateToProps, {setLoggerUser})(App);
