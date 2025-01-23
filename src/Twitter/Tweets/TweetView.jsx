import { useState, useEffect } from "react";
import axios from "axios";

import { Tweet } from "./Tweet";
import { TweetsIndex } from "./TweetsIndex";

import { Container, Row, Col } from "react-bootstrap";

import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { NewTweet } from "./NewTweet";
import { Loading } from "../Loading";

export function TweetView(props) {
  let user = props.user;

  const [tweet, setTweet] = useState({});

  const getTweet = () => {
    let url = window.location.href;
    let x = url.lastIndexOf("/");
    let id = url.substring(x + 1, url.length);
  
    axios.get(`/tweets/${id}.json`)
    .then(response => {
      console.log(response);
      setTweet(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }
  useEffect(getTweet, []);

  let navigate = useNavigate();

  const handleSubmit = (tweet) => {
    window.location.reload();
  }



  if (tweet.username) {
    let subtweets = <></>;
    let parents = <></>;

    if (tweet.subtweets && tweet.subtweets.length > 0) {
      subtweets = <TweetsIndex tweets={tweet.subtweets} user={user}/>;
    }

    if (tweet.parents && tweet.parents.length > 0) {
      let arr = tweet.parents;
      let output = arr.map((item, i) => arr[arr.length - 1 - i])

      console.log(output)
      parents = <TweetsIndex tweets={output} parents={true} user={user} editTweet={props.editTweet}/>;
    }

    return (
      <div className="tweet-view-container">
          <div className="tweet-view-top-bar">
            <div onClick={() => {navigate(-1)}} className=" w-8 h-8 rounded-2xl hover:cursor-pointer hover:shadow-black hover:bg-gray-300 flex align-items-center justify-content-center">
              <FaArrowLeft />
            </div>
            <h4>Post</h4>
          </div>

          {parents}

          <div className="big-tweet">
            <Tweet tweet={tweet} view={true} parents={tweet.parents && tweet.parents.length > 0} user={user} editTweet={props.editTweet}/>
          </div>

          <div className="tweet-view-new-tweet">
            <NewTweet user={user} onSubmit={handleSubmit} minHeight={40} placeholder={'Post your reply'} tweetID={tweet.id}/>
          </div>
    
          {subtweets}
      </div>
    )
  }
  else {
    return (
      <Loading/>
    )
  }
}