import React, { useState, useEffect } from 'react';
import fire from '../../fire.js';

function User(props) {
  const db = fire.firestore();
  const [posts, setPosts] = useState([]);
  const [userPageName, setUserPageName] = useState('');

  useEffect( () => {
    if(props.match) {
      setUserPageName(props.match.params.user)
    }
  }, [])

  useEffect(() => {
    const unsubscribe = db.collection('posts').onSnapshot( (snap) => {
      const newPosts = snap.docs.map( (doc) => (
        doc.data()
      ));
      setPosts(newPosts);
    })

    return () => unsubscribe();
  }, []);

  let postsMap = posts.map( (post, i) => {
    if(post.user === userPageName) {
      return (<div key={i}>{`user: ${post.user} text: ${post.text} date: ${new Date(post.date.seconds * 1000)}`}</div>)
    } else {
      return ''
    }
  });

  return(
    <div>
      <h3>displaying data for user {props.user}</h3>
      {postsMap}
    </div>
  )
}

export default User;
