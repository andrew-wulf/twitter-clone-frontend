
import { Content } from "./Content";

import './css/twitter.css';
import './css/tweets.css';
import './css/userpage.css'
import './css/loading.scss'

import { useState, useEffect } from "react";
import axios from 'axios'
import { Routes, Route } from "react-router-dom";
import { Loading } from "./Loading";

import { Redirect } from "./Redirect";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";



export function Twitter() {

  const [currentUser, setCurrentUser] = useState("none");

  const [theme, setTheme] = useState('light');

  const getLocalStorage = () => {

    if (localStorage.getItem("theme") === null) {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        localStorage.setItem("theme", "dark");
      }
      else {
        localStorage.setItem("theme", "light");
      }
    }
    setTheme(localStorage.getItem("theme"));
  }
  useEffect(getLocalStorage, []);


  const useTheme = () => {
    let themes = {
    
      dark: {
        '--bg': 'rgb(20, 29, 38)',
        '--bg2': 'rgb(24, 33, 44)',
        '--text': 'rgb(230, 230, 230)',
        '--text2': 'rgb(250, 250, 250)',
        '--text3': 'rgba(250, 250, 250, 0.6)',
        '--text4': 'rgb(211, 211, 211)',
  
        '--tweet-bg': 'rgb(27, 40, 54)',
        '--tweet-hover': 'rgb(34, 48, 63)',
        '--primary': 'rgba(49, 120, 219, 0.952)',
        '--secondary': 'rgba(100, 100, 100, 1)',
        '--follow': 'rgb(225, 225, 225)',
  
        '--border': '1px solid rgba(187, 187, 187, 0.315)',
        '--border2': '1.8px solid rgba(187, 187, 187, 0.315)',

        '--toggle-bg': 'rgba(31, 45, 70, 0.986)',
        '--toggle-color': ''
      },
      light: {
        '--bg': 'rgb(240, 240, 240)',
        '--bg2': 'rgb(250, 250, 250)',
        '--text': 'rgb(5, 5, 5)',
        '--text2': 'rgb(30, 30, 30)',
        '--text3': 'rgb(70, 70, 70)',
        '--text4': 'rgb(40, 40, 40)',
  
        '--tweet-bg': 'rgb(250,250,250)',
        '--tweet-hover': 'rgb(240, 240, 240)',
  
        '--primary': 'rgba(49, 120, 219, 0.952)',
        '--secondary': 'rgba(100, 100, 100, 1)',
        '--follow': 'rgba(49, 120, 219, 0.952)',
  
        '--border': '1px solid rgba(128, 128, 128, 0.624)',
        '--border2': '1.8px solid rgb(185, 185, 185)',

        '--toggle-bg': 'rgba(150, 160, 170, 0.932)',
        '--toggle-color': ''
      }
    }

    if (theme) {
      let themeArr = themes[theme];

      Object.keys(themeArr).forEach(key => {
        document.documentElement.style.setProperty(key, themeArr[key])
      });
    }
  }
  useEffect(useTheme, [theme])


  const themeToggle = () => {
    if (theme === 'light') {
      setTheme('dark');
      localStorage.setItem("theme", "dark");
    }
    else {
      setTheme('light');
      localStorage.setItem("theme", "light")
    }
  }



  const getUser = () => {
    if (localStorage.jwt) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.jwt
      axios.get('/user.json')
        .then(response => {
          console.log(response);
          setCurrentUser(response.data);
        })
        .catch(error => {
          console.log(error);
          setCurrentUser("")
        });
    }
    else {
      setCurrentUser("")
    }
  }
  useEffect(getUser, []);


  if (currentUser === "none") {

    return (
      <Loading />
    )
  }

  else {
    return (
      <div className="twitter">

          <Routes>
            <Route path = "/" element= {<Redirect user={currentUser} setUser={setCurrentUser}/>}/>
            <Route path = "/signin" element={<SignIn user={currentUser}/>}/>
            <Route path = "/signup" element={<SignUp user={currentUser}/>}/>

            <Route path = "/*" element={<Content user={currentUser} setUser={setCurrentUser} theme={theme} themeToggle={themeToggle}/>}/>
          </Routes>
    
      </div>

      
    );
  }
}