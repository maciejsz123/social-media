import React from 'react';
import { Link } from "react-router-dom";

function Post(props) {
  return(
    <div>
      <span>user: <Link to={`/user/${props.data.user}`}>{props.data.user}</Link></span>
      {`text: ${props.data.text} date: ${new Date(props.data.date.seconds * 1000)}`}
    </div>
  )
}

export default Post;
