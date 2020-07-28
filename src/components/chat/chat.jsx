import React, { useState } from 'react';
import { connect } from 'react-redux';
import './chat.sass';

function Chat(props) {
  const [pxFromRight, setPxFromRight] = useState(330)
  return (
    <div className='chat-window' style={{right: `${pxFromRight*props.index}px`}}>
      <div>name</div><div>zamknij</div>
      <div>messages</div>
      <div>write message</div>
    </div>
  )
}

const mapStateToProps = state => ({
  messages: state.chat.messages
})

export default connect(mapStateToProps, {})(Chat);
