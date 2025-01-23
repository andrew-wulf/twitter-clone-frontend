import Form from 'react-bootstrap/Form';

import Stack from 'react-bootstrap/Stack';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';

import axios from 'axios';
import { useState } from 'react';

import { FaArrowLeft, FaTwitter } from 'react-icons/fa6';
import { RxTwitterLogo } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';


export function SignUp(props) {

  const [userExists, setUserExists] = useState(false);
  const [userCache, setUserCache] = useState([]);

  const [emailExists, setEmailExists] = useState(false);
  const [emailCache, setEmailCache] = useState([]);

  const [userVal, setUserVal] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [passVal, setPassVal] = useState("");
  const [passConfirmVal, setPassConfirmVal] = useState("");
  const [displayVal, setDisplayVal] = useState("");
  const [aviVal, setAviVal] = useState("");
  const [bannerVal, setBannerVal] = useState("");
  const [bioVal, setBioVal] = useState("");

  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const login = () => {
    axios.post('/sessions.json', {email: emailVal, password: passVal})
      .then(response => {
        console.log(response);
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new FormData();

    axios.post('/users.json', {username: userVal, email: emailVal, password: passVal, password_confirmation: passConfirmVal, display_name: displayVal})

      .then(response => {
        console.log(response);
        login(params);
        setPage(4);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const updateUserImages = () => {
    axios.post('/user/update.json', {avi: aviVal, banner: bannerVal, bio: bioVal, verified: true})

      .then(response => {
        console.log(response);
        window.location.href = '/twitter/home'
      })
      .catch(error => {
        console.log(error);
      });
  }

  const checkUserExists = (user) => {

    var params = new FormData();
    params.append("username", user);
    console.log(`user: ${user}`)

    axios.get('/users/exists.json', {params: {username: user}})
      .then(response => {
        console.log(response);
        setUserExists(response.data.user_exists);
        let c = userCache;
        c.push([user, response.data.user_exists]);
        setUserCache(c);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleUserUpdate = (e) => {
    console.log('updating')
    e.preventDefault();
    let val = e.target.value;
    if (val.length < 20) {
      val = val.replaceAll(/[^a-zA-Z0-9_]/g, '');
      setUserVal(val);

      if (val.length > 5) {
        let res = userCache.filter(arr => {return arr[0] === val});
        console.log('CACHE: ', userCache, 'RES: ', res)
        if (res.length > 0) {
          setUserExists(res[0][1]);
        }
        else {
          checkUserExists(val);
        }
      }
    }
  }

  const checkEmailExists = (email) => {
    var params = new FormData();
    params.append("email", email);
    console.log(`email: ${email}`)

    axios.get('/users/exists.json', {params: {email: email}})
      .then(response => {
        console.log(response);
        setEmailExists(response.data.user_exists);
        let c = emailCache;
        c.push([email, response.data.user_exists]);
        setEmailCache(c);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleEmailUpdate = (e) => {
    console.log('updating')
    e.preventDefault();
    let val = e.target.value;

    if (val.length < 60) {
      val = val.replaceAll(/[^a-zA-Z0-9._%+-@]/g, '')
      setEmailVal(val);
      
      let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (emailRegex.test(val)) {
        
        if (val.length > 5) {
          let res = emailCache.filter(arr => {return arr[0] === val});
          console.log('CACHE: ', emailCache, 'RES: ', res)
          if (res.length > 0) {
            setEmailExists(res[0][1]);
          }
          else {
            checkEmailExists(val);
          }
        }
      }
    }
  }

  const handlePasswordUpdate = (e, type) => {
    console.log('updating')
    e.preventDefault();
    let val = e.target.value;
    val = val.replaceAll(/[ \0\n\r\t\\'";<>]/g, '');

    if (val.length < 40) {
      if (type === 'password') {
        setPassVal(val);
      }
      if (type === 'confirm') {
        setPassConfirmVal(val);
      }
    }
  }

  const handleDisplayUpdate = (e) => {
    console.log('updating')
    e.preventDefault();
    let val = e.target.value;
    val = val.replaceAll(/[\0\n\r\t\\'";<>]/g, '');

    if (val.length < 24) {
      setDisplayVal(val);
    }
  }


  let username = "";
  let emailPassword = "";
  let displayName = "";
  let avi = "";
  let banner = "";
  let bio = "";

  let emailExistsErr = "";
  let emailValidErr = "";

  let passValidErr = "";
  let passConfirmValidErr = "";

  let userSuccess = "Nice name!"
  let userExistsErr = "";
  let userValidErr = "";


  if (userExists) {userExistsErr = "username is taken."; userSuccess = ""}
  if (userVal.length > 0 && userVal.length < 6) {userValidErr = "username must contain at least 6 characters."; userSuccess = ""}
  if (userVal.length < 1) {userSuccess = ""}

  if (emailExists) {emailExistsErr = "email is taken."}

  if (passVal.length > 0 && (passVal.length < 7 || /\d/.test(passVal) === false || /[A-Z]/.test(passVal) === false)) {
    passValidErr = "password must contain 8 or more characters, a number, and a capital letter.";
  }

  if (passConfirmVal.length > 0 && passConfirmVal !== passVal) {
    passConfirmValidErr = "passwords must match."
  }
 
  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailRegex.test(emailVal) === false) {
    emailValidErr = "requires valid email address."
  }

  let emailButton = <Button className='signin-button' disabled variant="secondary" type="button" onClick={() => {setPage(2)}}>Next</Button>
  if ((emailExists === false && emailValidErr === "" && emailVal.length > 8) && (passVal.length > 7 && /\d/.test(passVal) && /[A-Z]/.test(passVal))) {
    emailButton = <Button className='signin-button' variant="primary" type="button" onClick={() => {setPage(2)}}>Next</Button>
  }

  let userButtons = 
                    <>
                    <Button className='signin-button' disabled variant="primary" onClick={() => {setDisplayVal(userVal); setPage(3)}}>Continue</Button>
                    <Button className='signin-button' variant="secondary" onClick={() => {setPage(1)}}>Back</Button>
                    </>
  if (userSuccess.length > 0) {
    userButtons = <>
                    <Button className='signin-button' variant="primary" onClick={() => {setDisplayVal(userVal); setPage(3)}}>Continue</Button>
                    <Button className='signin-button' variant="secondary" onClick={() => {setPage(1)}}>Back</Button>
                  </>
  }


  if (page === 1) {
    emailPassword = <>
              <p>{emailExistsErr}</p>
              <p>{emailValidErr}</p>
              
                <div className='flex flex-col gap-1 place-items-center'>
                  <div className= "signin-field">
                    <p>Email</p>
                    <Form.Control type="email" name="email" placeholder="example@email.com" value={emailVal} onChange={(e) => {handleEmailUpdate(e)}}/>
                  </div>

                  <div className= "signin-field">
                    <p>{passValidErr}</p>
                    <p>Password</p>
                    <Form.Control type="password" name="password" placeholder="Password" value={passVal} onChange={(e) => {handlePasswordUpdate(e, 'password')}}/>
                  </div>

                  <div className= "signin-field">
                    <p>{passConfirmValidErr}</p>
                    <p>Confirm Password</p>
                    <Form.Control type="password" name="password" placeholder="Password" value={passConfirmVal} onChange={(e) => {handlePasswordUpdate(e, 'confirm')}}/>
                  </div>

                  <div className='mt-2'/>
                  {emailButton}
                </div>
        
            </>
  }

  if (page === 2) {
    username = <>
                  <h1>Make a Username</h1>
                  <h6>Must be unique. You can change this later!</h6>
                  <p>{userExistsErr}</p>
                  <p>{userValidErr}</p>
                  <p>{userSuccess}</p>
   
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" name="username" placeholder="@" value={userVal} onChange={(e) => {handleUserUpdate(e)}}/>
                  
                  <Stack gap={2}>
                    {userButtons}
                  </Stack>
              </>
  }

  if (page === 3) {
    displayName = <>
                    <h3>Display Name</h3>
                    <div className='flex flex-col gap-3 place-items-center'>
                      <Form.Control type="text" name="display_name" value={displayVal} onChange={(e) => {handleDisplayUpdate(e)}}/>
                      <Button className='signin-button' type="submit">Finish</Button>
                    </div>
                  </>
  }

  if (page === 4) {
    avi = <>
            <h4>Add Profile Image</h4>
            <div className='flex flex-col gap-3 place-items-center'>
              <img src={aviVal} className='signin-img' onError={() => {document.getElementsByClassName('signin-img')[0].src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}}/>
              <Form.Control type="text" name="avi" placeholder="Enter Link" value={aviVal} onChange={(e) => {setAviVal(e.target.value)}}/>
              <Button className='signin-button' onClick={() => {setPage(5)}}>Next</Button>
            </div>
          </>
  }

  if (page === 5) {
    banner = <>
            <h4>Add Banner Image</h4>
            <div className='flex flex-col gap-3 place-items-center'>
              <img src={bannerVal} className='signin-img' onError={() => {document.getElementsByClassName('signin-img')[0].src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/991px-Placeholder_view_vector.svg.png"}}/>
              <Form.Control type="text" name="banner" placeholder="Enter Link" value={bannerVal} onChange={(e) => {setBannerVal(e.target.value)}}/>
              <Button className='signin-button' onClick={() => {setPage(6)}}>Next</Button>
            </div>
          </>
  }

  if (page === 6) {
    bio = <>
          <h4>Add a Bio</h4>
            <div className='flex flex-col gap-3 place-items-center'>
            <textarea className="signin-field bio" type='textarea' placeholder={'Tell us about yourself!'} autoFocus={true} value={bioVal}
            onChange={(e) => {setBioVal(e.target.value)}} />
            <Button className='signin-button' onClick={updateUserImages}>Next</Button>
            </div>
          </>
  }

  return (
    <Container fluid className='sign-in-page'>

      <div className='sign-in'>
        <div className='flex flex-row w-[100%]'>
          <h2>Sign Up</h2>
          <div onClick={() => {navigate(-1)}} className=" w-10 h-10 ml-auto rounded-full hover:cursor-pointer hover:shadow-black hover:bg-gray-300 flex align-items-center justify-content-center">
              <FaArrowLeft className='size-6'/>
            </div>
        </div>

        <Form onSubmit={handleSubmit} style={{'display': 'flex', 'flexDirection': 'column'}}>
          <Form.Group className="mb-3">

          {emailPassword}

          {username}

          {displayName}

          </Form.Group>

        </Form>

        <Form onSubmit={handleSubmit} style={{'display': 'flex', 'flexDirection': 'column'}}>
          <Form.Group className="mb-3">

          {avi}

          {banner}

          {bio}

          </Form.Group>

        </Form>

      </div>
    </Container>
  )
}
