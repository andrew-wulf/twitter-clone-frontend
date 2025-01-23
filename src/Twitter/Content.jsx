
import { Route, Routes } from "react-router-dom";

import {Home} from './Home.jsx'

import { TweetView } from "./Tweets/TweetView.jsx";
import {TweetModal} from "./Tweets/TweetModal.jsx";
import { UserPage } from "./UserPage.jsx";

import { Loading } from "./Loading.jsx";
import { LeftSidebar } from "./LeftSidebar.jsx";
import { RightSidebar } from "./RightSidebar.jsx";
import { useState } from "react";


export function Content(props) {
  let user = props.user;
  
  const scroll = (e) => {
    let doc = document.querySelector('.content');
    doc.scrollBy({
      top: e.deltaY,
      left: 0,
    });
  }


  const [tweetModalVisible, setTweetModalVisible] = useState(false);
  const [selectedTweet, setSelectedTweet] = useState(false);
  
  
  const toggleTweetModal = () => {
    setTweetModalVisible(!tweetModalVisible);
    setSelectedTweet(false);
  }
  

  const editTweet = (tweet) => {
    setSelectedTweet(tweet);
    setTweetModalVisible(true);
  }


  return (
    <div className="content">
      
      <div onWheel={scroll}>
        <LeftSidebar user={props.user} toggleTweetModal={toggleTweetModal} theme={props.theme} themeToggle={props.themeToggle}/>
      </div>


      <div className="middle-container">
        <Routes>
    
          <Route path = "/home" element={<Home user={user} editTweet={editTweet}/>}/>

          <Route path = "/tweet/:id" element={<TweetView user={user} editTweet={editTweet}/>}/>
          
          <Route path = "/users/:name/*" element={<UserPage user={user} editTweet={editTweet}/>}/>

          <Route path = "/loading" element={<Loading/>}/>
        </Routes>

        <div className="extra-space"/>
      </div>
    
    
      <div onWheel={scroll}>
        <RightSidebar current={props.user}/>
      </div>
      
      <TweetModal show={tweetModalVisible} onClose={toggleTweetModal} user={props.user} tweet={selectedTweet}/>
            
    </div>
  )
}