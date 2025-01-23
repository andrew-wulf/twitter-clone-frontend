
import { FollowButton } from "./FollowButton";
import { Modal } from "./Tweets/Modal";
import { UserView } from "./UserView";


export function UsersIndex(props) {

  let current = props.current;
  let users = props.users;

  if (users && users.length > 0) {
    return (
      <div className="users-index flex flex-col gap-3">
        {
          users.map(user => {
            if (user.id !== current.id) {
              

              let modalContent = 
              
              <div className="modal-main">
                <UserView user={user}/>
              </div>


              return (
                <div key={user.id} className="flex flex-row gap-2">

                  <div className="avi-container" onClick={() => {window.location.href=`/users/${user.username}`}}>
                    <img src={user.avi} className="avi"/>
                  </div>

                  <div className="flex flex-col" onClick={() => {window.location.href=`/users/${user.username}`}}>
                    <p className="user-index-display">{user.display_name}</p>
                    <p className="user-index-name">@{user.username}</p>
                  </div>

                  <div className="user-index-follow">
                    <FollowButton viewed={user}/>
                  </div>

                </div>
              )
            }
          })
        }
      </div>
    )
  }

}