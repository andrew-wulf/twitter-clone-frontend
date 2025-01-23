import { BrowserRouter, Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';


import { Twitter } from "./Twitter/Twitter";

import axios from 'axios';

function App() {
  axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://andrew-wulf-portfolio-api-486934fb1f0f.herokuapp.com/";
  
  return (
    <div>
      <Twitter />
    </div>
  );
}

export default App;