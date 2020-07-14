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
    async function getUserId(email) {
      const db = await fire.firestore().collection('users').get();
      let userId = '';
      await db.forEach( data => {
        if(data.data().email === email) {
          userId = data.id;
        }
      });
      return userId;
    }

    fire.auth().onAuthStateChanged( user => {
      if(user) {
        const userId = getUserId(user.email);
        props.setLoggerUser(user.email.substring(0, user.email.indexOf("@")), userId);
      } else {
        props.setLoggerUser(null, null);
      }
    })
  }, []);

  if(props.users.loggedUserLoading) {
    return <div>...Loading</div>
  }

  return (
    <div className="App">
      <h3>logged as {props.users.loggedUser.user}</h3>
      {props.users.loggedUser.user ? <HomeRouter /> : <Login />}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
};

export default connect(mapStateToProps, {setLoggerUser})(App);
