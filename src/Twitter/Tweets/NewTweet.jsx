import { useEffect, useState } from "react";

import { IoImageOutline } from "react-icons/io5";
import { FaRegFaceSmileBeam } from "react-icons/fa6";

import EmojiPicker from 'emoji-picker-react';
import axios from 'axios';

export function NewTweet(props) {

  let user = props.user;
  let minHeight = props.minHeight;
  let tweetID = props.tweetID;

  let tweet = props.tweet;


  let placeholder = "What is happening?!";
  if (props.placeholder) {
    placeholder = props.placeholder;
  }

  const [inputVal, setInputVal] = useState("");

  useEffect(() => {
    if (tweet) {
      setInputVal(tweet.text);
    }
  }, [tweet])

  const handleChange = (e) => {
    e.preventDefault();

    e.target.style.height = '0';
    e.target.style.height = Math.max(minHeight, e.target.scrollHeight) + 'px';

    let text = e.target.value;

    if (text.length < 141) {
      setInputVal(text);
    }
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputVal.length > 0) {

      if (tweetID) {
        axios.post('/tweets/subtweet.json', {text: inputVal, tweet_id: tweetID})
            .then(response => {
              console.log(response);
              setInputVal("");
    
              if (props.onSubmit) {
                props.onSubmit(response.data);
              }
            })
            .catch(error => {
              console.log(error);
            });
      }
  
      else {
        axios.post('/tweets/new.json', {text: inputVal})
            .then(response => {
              console.log(response);
              setInputVal("");
    
              if (props.onSubmit) {
                props.onSubmit(response.data);
              }
            })
            .catch(error => {
              console.log(error);
            });
      }
    }
  }

  const handleUpdate = (id) => {
    axios.post(`/update/${id}.json`, {text: inputVal})
      .then(response => {
        console.log(response);
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleDelete = (id) => {
    axios.post(`/delete/${id}.json`)
      .then(response => {
        console.log(response);
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });
  }


  if (tweet) {

    return (
      <div className="new-tweet">
        <form onSubmit={handleSubmit}>
          <div className="new-tweet-main">

            <div className="avi-container">
              <img src={user.avi} className="avi"/>
            </div>

            <div>
              <textarea className="new-tweet-input" type='textarea' autoFocus={true} value={inputVal}
              onChange={handleChange} />
            </div>
          </div>
  
          <div className="edit-tweet-footer">
            <div className="new-tweet-icon"><IoImageOutline/></div>
            <div className="new-tweet-icon"><FaRegFaceSmileBeam/></div>
            <button onClick={() => {handleUpdate(tweet.id)}} type='button' className="edit-button">Save Changes</button>
            <button onClick={() => {handleDelete(tweet.id)}} type='button' className="delete-button">Delete</button>
          </div>
        </form>
      </div>
    )
  }

  else {
    return (
      <div className="new-tweet">
        <form onSubmit={handleSubmit}>
          <div className="new-tweet-main">
            <div className="avi-container">
              <img src={user.avi} className="avi"/>
            </div>
  
            <div>
  
                <textarea className="new-tweet-input" type='textarea' placeholder={placeholder} autoFocus={true} value={inputVal}
                onChange={handleChange} />
                
            </div>
          </div>
  
          <div className="new-tweet-footer">
  
            <div className="new-tweet-icon"><IoImageOutline/></div>
            <div className="new-tweet-icon"><FaRegFaceSmileBeam/></div>
            <button type='submit' className="post-button">Post</button>
          </div>
        </form>
      </div>
    )
  }
}