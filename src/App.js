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
        props.setLoggerUser();
      }
    })
  }, []);

  useEffect( () => {
    setOnlineUser(true, props.loggedUser, props.users);
  }, [props.loggedUser, props.users])

  if(props.loggedUserLoading) {
    return <div>...Loading</div>
  }

  return (
    <div className="App">
      <h3>logged as {props.loggedUser.user}</h3>
      {props.loggedUser.user ? <HomeRouter loggedUser={props.loggedUser} users={props.users} /> : <Login />}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.users.loggedUser,
    users: state.users.users
  }
};


  export function setOnlineUser(toLogIn = false, loggedUser, users) {
    if(loggedUser.userId) {
      let getUser = users.reduce( (acc, user) => {
        if(loggedUser.userId === user.id) {
          let newObj = {
            ...user,
            data: {
              ...user.data,
              online: toLogIn
            }
          };
          acc.push(newObj);
        }
        return acc
      }, []);
      if(getUser.length) {
        fire.firestore().collection('users').doc(getUser[0].id).set(getUser[0].data)
      }
    }
  }

export default connect(mapStateToProps, { setLoggerUser })(App);
