import { Container, Row, Col, Button } from "react-bootstrap"
import { Stack } from "react-bootstrap";

import { TweetsIndex } from "./Tweets/TweetsIndex";


import { useState, useEffect } from "react";
import axios from 'axios';
import { Route, Routes, useNavigate } from "react-router-dom";


import { FaArrowLeft } from "react-icons/fa6";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { FaEnvelope } from "react-icons/fa6";
import { FollowButton } from "./FollowButton";
import { MdVerified } from "react-icons/md";



export function UserPage(props) {

  const [tweets, setTweets] = useState([]);
  const [viewedUser, setViewedUser] = useState({});
  const [editVisible, setEditVisible] = useState('hidden');
  const navigate = useNavigate();


  let url = window.location.href;
  let x = url.lastIndexOf("users/");

  let name = url.substring(x + 6, url.length);
  let type = 'tweets';

  if (name.includes('/')) {
    let items = name.split('/');
    name = items[0];
    type = items[1];
  }

  const getUserTweets = () => {
    let val = name;
    if (type === 'likes' || type === 'replies') {
      val = `${val}/${type}`
    }
    axios.get(`/tweets/users/${val}.json`, {params: {offset: 0, limit: 20}})
    .then(response => {
      console.log(response);
      setTweets(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }
  useEffect(getUserTweets, []);
  

  const getUserInfo = () => {
    axios.get(`/users/${name}.json`)
    .then(response => {
      console.log(response);
      setViewedUser(response.data);

      if (props.user.username === viewedUser.username) {
        setEditVisible('visible');
      }
      else {
        setEditVisible('hidden');
      }
    })
    .catch(error => {
      console.log(error);
    });
  }
  useEffect(getUserInfo, []);

  let tabs = ['block', 'none', 'none'];

  if (url.includes('/replies')) {
    tabs = ['none', 'block', 'none'];
  }
  if (url.includes('/likes')) {
    tabs = ['none', 'none', 'block'];
  }

  
  

  let user = props.user;
  
  let midBarContent = 
  <>
    <button><IoEllipsisHorizontal/></button>
    <button><FaEnvelope/></button>
    <FollowButton user={user} viewed={viewedUser}/>
  </>

  if (user.id === viewedUser.id) {
    midBarContent = <button className="bio-edit">Edit Profile</button>
  }

  if (viewedUser.username) {
    console.log(viewedUser);

    let display = <h4>{viewedUser.display_name}</h4>;

    if (viewedUser.verified) {
      display = <div className="flex gap-1 place-items-center">
        <h4>{viewedUser.display_name} </h4>
        <h4><MdVerified className="blue-checkmark profile"/></h4>
      </div>
    }

    return (
      <div>

        <div className="user-page">
          <div className="user-page-top-bar">
            <div onClick={() => {navigate(-1)}} className=" w-8 h-8 rounded-2xl hover:cursor-pointer hover:shadow-black hover:bg-gray-300 flex align-items-center justify-content-center">
              <FaArrowLeft />
            </div>
            <h4>{viewedUser.display_name}</h4>
          </div>
          
          <div className="user-banner">
            <img src={viewedUser.banner}/>
            <div className="user-avi-container">
                <img src={viewedUser.avi}/>
            </div>
          </div>

          <div className="user-page-mid-bar">
            {midBarContent}
          </div>


          <div className="user-bio">
              <div className="ml-3 mt-3">
                {display}
                <p className="secondary-text">@{viewedUser.username}</p>
                <p>{viewedUser.bio}</p>
                <div className="flex flex-row gap-4">
                  <p className="follow-count"><b>{viewedUser.following}</b> Following </p>
                  <p className="follow-count"><b>{viewedUser.followers}</b> Followers </p>
              </div>

            </div>
          </div>

          <div className="user-tabs">
            <div className="user-tab">
              <h2 onClick={() => {window.location.href = `/users/${viewedUser.username}`}}>Tweets</h2>
              <div className="tab-select" style={{display: tabs[0]}}/>
            </div>
            <div className="user-tab">
              <h2 onClick={() => {window.location.href = `/users/${viewedUser.username}/replies`}}>Replies</h2>
              <div className="tab-select" style={{display: tabs[1]}}/>
            </div>
            <div className="user-tab">
              <h2 onClick={() => {window.location.href = `/users/${viewedUser.username}/likes`}}>Likes</h2>
              <div className="tab-select" style={{display: tabs[2]}}/>
            </div>
            <h2>Media</h2>

            
          </div>
        </div>

        <TweetsIndex tweets={tweets} user={user} editTweet={props.editTweet}/>

      </div>
    )
  }
}