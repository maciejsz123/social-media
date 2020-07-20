import React from 'react';
import { Link } from "react-router-dom";
import './post.sass';

function Post(props) {
  let date = new Date(props.data.date.seconds * 1000);

  const formatedDate = () => {
    return `${roundToDigits(date.getDate())}.${roundToDigits(date.getMonth()+1)}.${date.getFullYear()} ${roundToDigits(date.getHours())}:${roundToDigits(date.getMinutes())}`;
  }

  function roundToDigits(number) {
    return  number < 10 ? '0' + number : number;
  }

  return(
    <div className='post-container'>
      <div className='post-user'>
        <span>user: <Link to={`/user/${props.data.user}`}>{props.data.user}</Link></span>
      </div>
      <div className='post-time'>
        <span>{formatedDate()}</span>
      </div>
      <div className='post-text'>
        {`text: ${props.data.text}`}
      </div>
    </div>
  )
}

export default Post;
