import { Form } from 'react-bootstrap';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { UsersIndex } from './UsersIndex';

export function RightSidebar(props) {

  let current = props.current;

  const [userRecs, setuserRecs] = useState([]);


  const whoToFollow = () => {
    axios.get(`/recommendations.json`)
    .then(response => {
      console.log(response);
      setuserRecs(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }
  useEffect(whoToFollow, []);

  
  let users = <></>

  if (current && userRecs.length > 0) {
    users =
    <div className="might-like">
      <h4>Who To Follow</h4>
      <UsersIndex current={current} users={userRecs}/>
    </div>
  }


  return (
    <div className="right-sidebar">
      <div className='right-sidebar-content'>
        <Form >
          <Form.Control
            type="text"
            placeholder="Search"
            className=" searchbar"
            style={{'borderRadius': '25px'}}
          />
        </Form>
        
        <div className="user-suggestions">

            {users}  

            <div className="whats-happening" style={{opacity: '0%'}}>
              <h4>What's Happening</h4>

            </div>
          </div>
      </div>
    </div>
  )
  
}