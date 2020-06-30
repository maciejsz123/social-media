import React, { useState, useEffect } from 'react';
import fire from '../../fire.js';
import { connect } from 'react-redux';

function CreatePost(props) {
  const db = fire.firestore();
  const [text, setText] = useState('');

  function addPost() {
    const unsubscribe = db.collection('posts').add({
      text,
      user: props.loggedUser,
      date: new Date()
    })

    return () => unsubscribe();
  }

  return(
    <div>
      <input type='text' placeholder='create post' value={text} onChange={(e) => setText(e.target.value)}/>
      <button type='button' onClick={addPost}>add post</button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  loggedUser: state.user.loggedUser
})

export default connect(mapStateToProps)(CreatePost);
