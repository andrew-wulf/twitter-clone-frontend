import Form from 'react-bootstrap/Form';

import Stack from 'react-bootstrap/Stack';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';

import axios from 'axios';
import { useNavigate } from "react-router-dom";

import { FaTwitter } from 'react-icons/fa6';
import { RxTwitterLogo } from 'react-icons/rx';
import { Loading } from './Loading';
import { useState } from 'react';


export function SignIn(props) {
  
  const [activeRequest, setActiveRequest] = useState(false);
  const [coverDisplay, setCoverDisplay] = useState('None')

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    login(params);
  }

  const login = (params) => {
    setActiveRequest(true);
    setCoverDisplay('block')

    axios.post('/sessions.json', params)
      .then(response => {
        console.log(response);
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        setActiveRequest(false);
        setCoverDisplay('None');
        window.location.href = '/home'
      })
      .catch(error => {
        setActiveRequest(false);
        setCoverDisplay('None');
        console.log(error);
      });
  };

  const guestLogin = () => {
    const params = new FormData()

    params.append('email', 'guest.user@gmail.com');
    params.append('password', 'GuestAccount19!')
    login(params);
  }

  let loading = <>Sign In</>;

  if (activeRequest) {
    loading = <div className='button-spinner-container'>
                <div className='button-spinner'></div>
              </div>
  }


  if (props.user === "") {
    
    return (
      

      <div className='sign-in-page'>
     
        <div className="sign-in">

          <h1 style={{'textAlign': 'center', 'marginBottom': '3vh'}}>Sign in</h1>

          <Form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4 place-items-center'>
              <div className= "signin-field">
                <p>Email address</p>
                <Form.Control type="email" name="email" placeholder="Enter email" />
              </div>
              <div className= "signin-field">
                <p>Password</p>
                <Form.Control type="password" name="password" placeholder="Password"/>
              </div>
              
              
              <div className='flex flex-col gap-4 mt-4'>
                <Button variant="primary" type="submit" className='signin-button'>
                  {loading}
                </Button>
              
                <Button variant='outline-dark' type="button" className='signin-button'
                onClick={() => {window.location.href = "/signup"}}>
                    <div>
                      <FaTwitter className='signin-logo'/> 
                      <p>
                        Create Account
                        </p>
                    </div>
                </Button>
              </div>

              <div className='signin-guest'>
                <h6>OR</h6>

                <p>Use our <b onClick={guestLogin}>Guest Account!</b></p>
              </div>


            </div>
            

          </Form>
        </div>
          
        <div className='signin-cover' style={{display: coverDisplay}}/>

      </div>
    )
  }
  else {
    window.location.href = "/home"
  }
}
