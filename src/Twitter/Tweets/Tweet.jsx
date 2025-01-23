import { Container, Row, Col, Stack, Image } from "react-bootstrap"
import { TweetContent } from "./TweetContent";

import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { FaRetweet } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { FaArrowUpFromBracket } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import { ImStatsBars } from "react-icons/im";
import { LikeButton } from "./LikeButton";
import { Loading } from "../Loading";
import { useState } from "react";


import axios from 'axios';
import { RetweetButton } from "./RetweetButton";
import { MdVerified } from "react-icons/md";

import { BsThreeDots } from "react-icons/bs";
import { TweetModal } from "./TweetModal";

export function Tweet(props) {

  const handleQuote = () => {
  }

  const viewOptions = (tweet) => {
    //this should trigger a modal but I don't want to do that right now
    
    handleTweetEdit(tweet);
  }

  const handleTweetEdit = (tweet) => {
    props.editTweet(tweet)
  }

  const abbrTime = (time) => {
    if (time) {

      let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
      let date = new Date(time);

      let deltaMinutes = Math.floor((Date.now() - date) / 1000 / 60);
      if (deltaMinutes < 60) {
        return deltaMinutes + 'm'
      }

      let deltaHours = Math.floor(deltaMinutes / 60);
      if (deltaHours < 24) {
        return deltaHours + 'h'
      }
  
      else {
        let month = months[date.getMonth()];
        let day = String(date.getDate()).padStart(2, '0');
        return `${month.slice(0,3)} ${day}`;
      }
    }
  }

  const displayTime = (time) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let date = new Date(time);
    let year = date.getFullYear();
    let month = months[date.getMonth()];
    let day = String(date.getDate()).padStart(2, '0');

    let hours = date.getHours() + 1;
    let suffix = 'AM';
    let minutes = date.getMinutes();

    if ( hours > 12) {
      hours -= 12;
      suffix = 'PM';
    }

    let part1 = `${hours}:${String(minutes).padStart(2, '0')}${suffix}`;
    let part2 = `${month} ${day}, ${year}`;

    return <p>{part1} &#183;  {part2}</p>;
  }

  const displayViews = (views) => {
    if (views < 1000) {
      return views
    }
    if (views < 1000000) {
      if (views > 100000) {
        return `${Math.floor(views / 1000)}K`
      }
      return `${Math.round((views / 1000) * 10) / 10}K`
    }
    return `${Math.round((views / 1000000) * 10) / 10}M`
  }

  let tweet = props.tweet;
  let parents = props.parents;
  let view = props.view;
  let first = props.first;

  

  if (tweet.username) {
    let display = <p className="user-display-name">{tweet.display_name}</p>
    if (tweet.verified) {
      display = <div className="flex gap-1">
                  <p className="user-display-name">{tweet.display_name}</p>
                  <p><MdVerified className="blue-checkmark"/></p>
                </div>

    }

    let avi = 
              <div className="avi-container">
                <Image src={tweet.avi} className='avi'/>
              </div>
            
  
    if (parents) {
      if (first) {
        avi = <div className="avi-container-box">
                <div className="avi-container">
                  <Image src={tweet.avi} className='avi'/>
                </div>
                <div className="avi-bottom-line"/>
              </div>
      }
      else {
        if (view) {
          avi = <div className="avi-container-regular">
                  <div className="avi-container">
                    <Image src={tweet.avi} className='avi'/>
                  </div>
                  <div className="avi-top-line"/>
                </div>
        }
        else {
          avi = <div className="avi-container-box">
                  <div className="avi-top-line"/>
                  <div className="avi-container">
                    <Image src={tweet.avi} className='avi'/>
                  </div>
                  <div className="avi-bottom-line"/>
                </div>
        }
      }
    }

    let edited = <></>;
      if (tweet.edited) {
        edited = 
                     <div>&#183; <i>Edited</i></div>
                  
      }
  
    let img = avi;
    let header = 
  
      <div className="tweet-header" onClick={(e) => {e.stopPropagation(); window.location.href = `/users/${tweet.username}`}}>
        
        {display}

        <div className="flex flex-row gap-1">
          <p className="user-username">@{tweet.username}</p>
          <p className="tweet-time">&#183; {abbrTime(tweet.timestamp)}</p>
          {edited}
        </div>
      </div>;
    
    let viewData = <></>;
    let stats = <div className="tweet-stats">
                  <ImStatsBars className="tweet-icon"/>
                  <p>{displayViews(tweet.views)}</p>
                </div>
  
    if (view) {

      img = <></>;

      header =
      <div className="tweet-header" onClick={(e) => {e.stopPropagation(); window.location.href = `/users/${tweet.username}`}}>
        {avi}
        <div className="flex flex-col gap-0 mt-1">
          {display}
          <p className="user-username">@{tweet.username}</p>
        </div>
  
      </div>;
  
      viewData = 
      <div className="flex flex-row gap-1">
        <div className="hover:underline hover:cursor-pointer">
         {displayTime(tweet.timestamp)}
        </div>
        <div>
        &#183; {displayViews(tweet.views) + ' Views'}
        </div>
        {edited}
      </div>;
  
      stats = <></>
    }

    let retweeted_by = <></>;
    
    if (tweet.is_retweet) {
      retweeted_by = <div className="retweet-header" onClick={(e) => {e.stopPropagation(); window.location.href=`/users/${tweet.retweeted_by.username}`}}> <FaRetweet/>{tweet.retweeted_by.display_name} retweeted</div>
    }

    let replying_to = <></>;
    if (tweet.is_subtweet && !view && !parents) {
      replying_to = <div className="replying-to">Replying to <p>@{tweet.replying_to.username}</p></div>
    }

    let edit = <div onClick={(e) => {e.stopPropagation()}} className="tweet-options"> <BsThreeDots /></div>;

    if (props.user) {
      if (props.user.username === tweet.username) {
        edit = <div onClick={(e) => {e.stopPropagation(); viewOptions(tweet)}} className="tweet-options"> <BsThreeDots /></div>;
      }
    }



    let content = 
      <div className="tweet-main">
        
        {edit}

        {retweeted_by}

        <div className="flex flex-row gap-2">
          {img}
          
          <div className="">
            
            {header}
            
            {replying_to}

            <div className="tweet-content">
              <TweetContent tweet={tweet}/>
    
            </div>
            
            {viewData}
    
            <div className="tweet-footer">
    
              <div className="tweet-reply">
                <FaRegComment className="tweet-icon"/>
                <p>{tweet.replies}</p>
              </div>
            
              <RetweetButton tweet={tweet}/>

              <LikeButton tweet={tweet}/>
            
              {stats}
    
              <div className="flex flex-row">
                <div className="tweet-share">
                  <FaArrowUpFromBracket className="tweet-icon share"/>
                </div>
              
                <div className="tweet-bookmark">
                  <FaRegBookmark className="tweet-icon bookmark"/>
                </div>
              </div>
              
            </div>
          </div>
        
        </div>
      </div>
    
    let tweetClass = 'tweet'
  
    if (view) {tweetClass += '-view'} 
    if (parents) {tweetClass += '-parents'}
    //console.log(tweetClass)

    if (view) {
      return (
        <div className={tweetClass}>
          {content}
        </div>
      )
    }

    else {
      return (
       <div className={tweetClass} onClick={() => {window.location.href = `/tweet/${tweet.id}`}}>
         {content}
 
       </div>
     )
    }
  }

  else {
    return (
      <Loading/>
    )
  }
}