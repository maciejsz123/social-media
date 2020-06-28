import React, { useState, useEffect } from 'react';
import fire from '../../fire.js';

function Post() {
  const db = fire.firestore();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('posts').onSnapshot( (snap) => {
      const newPosts = snap.docs.map( (doc) => (
        doc.data()
      ));
      setPosts(newPosts);
    })

    return () => unsubscribe();
  }, [])


  let postsMap = posts.map( (post, i) => (
    <div key={i}>{`user: ${post.user} text: ${post.text} date: ${new Date(post.date.seconds * 1000)}`}</div>
  ))


  return(
    <div>
      {postsMap}
    </div>
  )
}

export default Post;
