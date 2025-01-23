
import { useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";


import axios from 'axios'

export function LikeButton(props) {
  let tweet = props.tweet;

  const [liked, setLiked] = useState(tweet.liked_by_user);
  const [count, setCount] = useState(tweet.likes);
  const [likeStyle, setLikeStyle] = useState({});

  const handleClick = (e) => {
    e.stopPropagation();
    setLiked(!liked);
    likeToggle();

    if (liked) {
      setCount(count - 1);
      setLikeStyle({});
    }
    else {
      setCount(count + 1);
      setLikeStyle({animation: 'pop 1.3s'})
    }
  }

  const likeToggle = () => {
    axios.post(`/tweets/${tweet.id}/like.json`)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }


  if (liked) {
      return (
        <div className="tweet-like" onClick={handleClick}>
          <IoMdHeart className="tweet-icon heart" style={likeStyle}/>
          <p className="tweet-like-count">{count}</p>

        </div>
      );
    }

  else {
    return (
      <div className="tweet-unlike" onClick={handleClick}>
        <IoMdHeartEmpty className="tweet-icon"/>
        <p className="tweet-like-count">{count}</p>
      </div>
    )
  }
}
  