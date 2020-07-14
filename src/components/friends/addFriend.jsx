import React, { useState, useEffect } from 'react';
import fire from '../../fire.js';
import { connect } from 'react-redux';

function AddFriend(props) {
  const db = fire.firestore();
  const [isInvited, setIsInvited] = useState(false);

  useEffect( () => {
    let newInvited = false;
    const find = props.users.filter( user => user.id === props.loggedUser.userId)
    if(find[0]) {
      let find2 = find[0].data.friends.filter( friend => friend.name === props.user);
      newInvited = find2[0] ? find2[0].invited : false ;
    }
    setIsInvited(newInvited)
  }, [props.user, []])

  async function addFriend(e) {
    e.preventDefault();

    if(props.user === props.loggedUser.user) {
      console.log("you can't add yourself to friends")
      return ;
    }

    let data = await db.collection('users').get();
    let loggedUserData = {};
    let clickedUserData = {};
    data.forEach(doc => {
      if(doc.data().name === props.user) {
        clickedUserData = {data: doc.data(), id: doc.id};
      } else if(doc.id === props.loggedUser.userId) {
        loggedUserData = {data: doc.data(), id: doc.id};
      }
    });
    let checkIfArleadyExists = false;
    if(clickedUserData.data.friends.length) {
      checkIfArleadyExists = clickedUserData.data.friends.some( friend => {
        return friend.id === loggedUserData.id
      })
    }

    if(!checkIfArleadyExists || !isInvited) {
      //add user to friends - to user clicked
      db.collection('users').doc(clickedUserData.id).set({...clickedUserData.data, friends:[...clickedUserData.data.friends, {id: loggedUserData.id, name: loggedUserData.data.name, accepted: false, invited: true, iWasInvited: true}]});
      //add user to friends - logged user
      db.collection('users').doc(loggedUserData.id).set({...loggedUserData.data, friends: [...loggedUserData.data.friends, {id: clickedUserData.id, name: clickedUserData.data.name, accepted: false, invited: true, iWasInvited: false}]});
    }
  }

  return(
    <div>
    { (props.loggedUser.user === props.user || isInvited) ?
      '':
      (<span>add user <button onClick={addFriend}>friend</button></span>)
    }
    </div>
  )
}

const mapStateToProps = state => ({
  loggedUser: state.users.loggedUser,
  users: state.users.users
});

export default connect(mapStateToProps)(AddFriend);
