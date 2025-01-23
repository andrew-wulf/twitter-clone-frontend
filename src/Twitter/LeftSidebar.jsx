import axios from 'axios'
import './css/header.css'

import {Image, ListGroup, ListGroupItem} from 'react-bootstrap';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';


import { FaHome } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { RiQuillPenFill } from "react-icons/ri";

import { FaBookmark } from "react-icons/fa";
import { IoPersonOutline, IoPersonSharp } from "react-icons/io5";

import { useState, useEffect } from 'react';

import { FaRegMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { Modal } from './Tweets/Modal';


export function LeftSidebar(props) {

  const [accountModalVisible, setAccountModalVisible] = useState(false);
 
  const [toggleVerticalStyle, setToggleVerticalStyle] = useState({'transform': 'translate(0, 0)', 'transition': '0s'});
  const [toggleHorizontalStyle, setToggleHorizontalStyle] = useState({'transform': 'translate(0, 0)', 'transition': '0s'});

  const [sunVal, setSunVal] = useState(0);
  const [moonVal, setMoonVal] = useState(0);

  let theme = props.theme;


  const updateTheme = () => {
    let horizontal = {...toggleHorizontalStyle};
    let vertical = {...toggleVerticalStyle};

    if (theme === 'light') {

      horizontal['transform'] = 'translate(200%, 0)';
      vertical['transform'] = 'translate(0%, 150%)';

      setToggleHorizontalStyle(horizontal);
      setToggleVerticalStyle(vertical);
      setSunVal(100);
      setMoonVal(0);
    }
    else {
      horizontal['transform'] = 'translate(0%, 0)';
      vertical['transform'] = 'translate(0%, 0%)';

      setToggleHorizontalStyle({horizontal});
      setToggleVerticalStyle({vertical});
      setSunVal(0);
      setMoonVal(100);
    }
  }
  useEffect(updateTheme, [theme]);

  useEffect(() => {
    updateTheme()
  }, [])


  const toggle = () => {
    props.themeToggle();
  }
  
  
  const toggleAccountModal = () => {
    setAccountModalVisible(!accountModalVisible)
  }

  const handleClose = () => {
    setAccountModalVisible(false);
  }

  

  const signOut = () => {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    window.location.href = "/"
  }

  const portfolioLink = () => {
    let url = window.location.href;
    let dest = url.slice(0, url.indexOf('/twitter'));
    window.location.href = dest;
  }

  let user = props.user;
  console.log(user);

  let avi = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";
  if (user.avi && user.avi.length > 5) {avi = user.avi}


  return (
  
  <div className='left-sidebar'>
    <div className='left-sidebar-content'>

      <div className='header-logo' >
        <Navbar.Brand href="/home"><Image src="/twitter_logo.png" width="35px"/></Navbar.Brand>
      </div>

      <div direction='horizontal' className='header-option' onClick={
        () => {window.location.href= "/home"}}>
        <FaHome/>
        <div className='header-option-text'>
          <h5>Home</h5>
        </div>
    
      </div>
      
      <div direction='horizontal' className='header-option' onClick={
        () => {}}>
        <FaSearch/>
        <div className='header-option-text'>
          <h5>Explore</h5>
        </div>
    
      </div>

      <div direction='horizontal' className='header-option' onClick={
        () => {}}>
        <FaBell/>
        <div className='header-option-text'>
          <h5>Notifications</h5>
        </div>
    
      </div>

      <div direction='horizontal' className='header-option' onClick={
        () => {}}>
        <FaEnvelope/>
        <div className='header-option-text'>
          <h5>Messages</h5>
        </div>
    
      </div>

      <div direction='horizontal' className='header-option bookmark' onClick={
        () => {}}>
        <FaBookmark/>
        <div className='header-option-text'>
          <h5>Bookmarks</h5>
        </div>
    
      </div>
      
      <div direction='horizontal' className='header-option' onClick={
        () => {window.location.href= `/users/${user.username}`}}>
        <IoPersonSharp/>
        <div className='header-option-text'>
          <h5>Profile</h5>
        </div>
    
      </div>
      

      
      <button className='header-tweet ' onClick={props.toggleTweetModal}>
        <RiQuillPenFill/>
        <div className='header-tweet-label'>
          <h5>Tweet</h5>
        </div>
      </button>
      
      

      <div className='header-account' onClick={toggleAccountModal}>
        <div className='flex gap-3 place-items-center'>
          <div className='avi-container'>
            <Image src={avi} className='avi-header'/>
          </div>

          <div className='header-account-details'>
            <h6>{user.display_name}</h6>
            <p>{user.username}</p>
            
          </div>
        </div>

        <Modal onClose={handleClose} show={accountModalVisible} content={
            <div className='modal-main account'>
              <div onClick={(e) => {e.stopPropagation(); setAccountModalVisible(false); window.location.href = `users/${user.username}`}}>
                Account
              </div>
          
              <div onClick={(e) => {e.stopPropagation(); signOut(); setAccountModalVisible(false)}}>
                Sign Out
              </div>
            </div>
          }/>
      </div>
        

      <div onClick={toggle} className='theme-toggle horizontal'>
        <FaSun style={{opacity: `${sunVal}%`}}/>
        <FaRegMoon style={{opacity: `${moonVal}%`}}/>
        <span className="theme-slider" style={toggleHorizontalStyle}>
        </span>
      </div>

      <div onClick={toggle} className='theme-toggle vertical'>
        <FaSun style={{opacity: `${sunVal}%`}}/>
        <FaRegMoon style={{opacity: `${moonVal}%`}}/>
        <span className="theme-slider" style={toggleVerticalStyle}>
        </span>
      </div>

      {/* <h6 onClick={portfolioLink}className='header-portfolio-link'>Back to Portfolio Site</h6> */}
    </div>
  </div>
  )
}



{/* <NavDropdown className='header-profile-dropdown'>
<NavDropdown.Item onClick={() => {window.location.href = `/twitter/users/${user.username}`}}>View Profile</NavDropdown.Item>
<NavDropdown.Item href="#action/3.1">Account</NavDropdown.Item>
<NavDropdown.Item onClick={signOut}>Sign Out</NavDropdown.Item>
</NavDropdown> */}