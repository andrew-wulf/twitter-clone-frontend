import axios from 'axios'
import { useEffect } from 'react';
import { Loading } from './Loading';

export function Redirect(props) {

  const login = () => {
    if (localStorage.jwt) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.jwt
      axios.get('/user.json')
        .then(response => {
          console.log(response);
          props.setUser(response.data);
          window.location.href = "/home"
        })
        .catch(error => {
          console.log(error);
          window.location.href = "/signin"
        });
    }
    else {
      window.location.href = "/signin"
    }
  }
  useEffect(login, []);

  return (
    <Loading />
  )
}