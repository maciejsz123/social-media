import React, { useState, useEffect } from 'react';
import fire from '../../fire.js';

function CreatePost() {
  const db = fire.firestore();
  const [text, setText] = useState('');

  function addPost() {
    const unsubscribe = db.collection('posts').add({
      text,
      user: 'test@test.com',
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

export default CreatePost;
