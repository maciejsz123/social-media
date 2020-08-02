import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMessages, closeWindow } from '../../redux/actions/chatActions';
import './chat.sass';
import fire from '../../fire.js';

function Chat(props) {
  const db = fire.firestore();
  const [messageContent, setMessageContent] = useState('');
  const [pxFromRight, setPxFromRight] = useState(330);

  useEffect( () => {
    props.fetchMessages();
  }, [])

  async function submitMessage(e) {
    e.preventDefault();

    const unsubscribe = await db.collection('messages').add({
      content: messageContent,
      from: props.loggedUser.userId,
      to: props.userId,
      time: new Date()
    })
    setMessageContent('')
    return () => unsubscribe();
  }

  function findUserName(id) {
    return props.users.filter(user => user.id === id).map( u => u.data.name);
  }

  const mapMessages = props.messages.filter( ms => (ms.from === props.loggedUser.userId || ms.to === props.loggedUser.userId) &&
    (ms.from === props.userId || ms.to === props.userId)
  )
  .sort( (a,b) => a.time - b.time)
  .map( (ms, i) => {
    const from = findUserName(ms.from);
    const to = findUserName(ms.to);

    const divStyle = (ms.from === props.loggedUser.userId ? {textAlign: 'right'} : {textAlign: 'left'})
    const spanStyle = (ms.from === props.loggedUser.userId ? {backgroundColor: 'blue', borderRadius: '20px'} : {backgroundColor: 'grey', borderRadius: '20px'})

    return(
      <div key={i} style={divStyle}>
        <span style={spanStyle}>{ms.content}</span>
      </div>
    )
  })

  return (
    <div className='chat-window' style={{right: `${pxFromRight * props.index}px`}}>
      <div>{findUserName(props.userId)}</div>
      <button type='button' onClick={() => props.closeWindow(props.userId)}>X</button>
      <div>
        {mapMessages}
      </div>
      <div>
        <form onSubmit={(e) => submitMessage(e)}>
          <input type='text' value={messageContent} onChange={ (e) => setMessageContent(e.target.value)}/>
          <button>send</button>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  messages: state.chat.messages,
  loggedUser: state.users.loggedUser,
  users: state.users.users
})

export default connect(mapStateToProps, { fetchMessages, closeWindow })(Chat);
