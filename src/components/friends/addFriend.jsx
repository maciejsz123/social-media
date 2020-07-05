import React, { useState, useEffect } from 'react';
import fire from '../../fire.js';
import { connect } from 'react-redux';

function AddFriend(props) {
  const db = fire.firestore();

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
    if(!checkIfArleadyExists) {
      //add user to friends - to user clicked
      db.collection('users').doc(clickedUserData.id).set({...clickedUserData.data, friends:[...clickedUserData.data.friends, {id: loggedUserData.id, name: loggedUserData.data.name, accepted: false}]});
      //add user to friends - logged user
      db.collection('users').doc(loggedUserData.id).set({...loggedUserData.data, friends: [...loggedUserData.data.friends, {id: clickedUserData.id, name: clickedUserData.data.name, accepted: false}]});
    }
  }

  return(
    <div>
    { props.loggedUser.user === props.user ?
      '':
      (<span>add user <button onClick={addFriend}>friend</button></span>)
    }
    </div>
  )
}

const mapStateToProps = state => ({
  loggedUser: state.user.loggedUser
});

export default connect(mapStateToProps)(AddFriend);
