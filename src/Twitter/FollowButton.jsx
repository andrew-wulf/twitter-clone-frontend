
import axios from 'axios';
import { useState } from 'react';
import { RiUserFollowFill, RiUserFollowLine } from 'react-icons/ri';


export function FollowButton(props) {
  
  let viewed = props.viewed;

  const [followed, setFollowed] = useState(viewed.followed_by_user);
  const [msg, setMsg] = useState('Following')


  const followToggle = () => {
    axios.post(`/users/${viewed.username}/follow.json`)
    .then(response => {
      console.log(response);
      setFollowed(!followed);
    })
    .catch(error => {
      console.log(error);
    });
  }

  const warning = () => {
    setMsg('Unfollow')
  }

  const msgReset = () => {
    setMsg('Following')
  }


  if (followed) {
    return (
      <>
        <button className="bio-follow unfollow" onClick={followToggle} onMouseEnter={warning} onMouseLeave={msgReset}>{msg}</button>
      </>
    )
  }
  else {
    return (
      <>
        <button className="bio-follow" onClick={followToggle}>Follow</button>
      </>
    )
  }
  
}