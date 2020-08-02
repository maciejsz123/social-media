import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './App.sass';
import fire from './fire';
import HomeRouter from './components/home/homeRouter';
import Login from './components/login/login';
import ListOfFriends from './components/chat/listOfFriends';
import Chat from './components/chat/chat';
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
      {props.loggedUser.user ?
        <div id='container'>
          <HomeRouter />
          <ListOfFriends />
          {props.chatList.map( (user, i) => <Chat key={i} index={i} userId={user}/>)}
        </div>
        : <Login />}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.users.loggedUser,
    users: state.users.users,
    chatList: state.chat.openedUsersTabs
  }
};


  export async function setOnlineUser(toLogIn = false, loggedUser, users) {
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
        await fire.firestore().collection('users').doc(getUser[0].id).set(getUser[0].data)
      }
    }
  }

export default connect(mapStateToProps, { setLoggerUser })(App);
