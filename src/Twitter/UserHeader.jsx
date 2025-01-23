import { MdVerified } from "react-icons/md";

export function UserHeader(props) {
  let user = props.user;

  let display = <p className="user-index-display">{user.display_name}</p>;

  if (user.verified) {
    display = <p className="user-index-display">{user.display_name} <MdVerified className="blue-checkmark"/></p>
  }
  
  return (
    <div className="user-header">
      <div className="avi-container" onClick={() => {window.location.href=`/users/${user.username}`}}>
        <img src={user.avi} className="avi"/>
      </div>

      <div className="flex flex-col" onClick={() => {window.location.href=`/users/${user.username}`}}>
        {display}
        <p className="user-index-name">@{user.username}</p>
      </div>
    </div>
  )
}