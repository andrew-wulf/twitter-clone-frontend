import { FollowButton } from "./FollowButton";


export function UserView(props) {
  let user = props.user;


  return (
    <div className="flex flex-col gap-2">
      <div key={user.id} className="flex flex-row gap-2">

        <div className="avi-container">
          <img src={user.avi} className="avi"/>
        </div>

        <div className="flex flex-col">
          <p className="user-index-display">{user.display_name}</p>
          <p className="user-index-name">@{user.username}</p>
        </div>

        <div className="user-index-follow">
          <FollowButton viewed={user}/>
        </div>
      </div>

      <p>{user.bio}</p>
      <p>{user.followers} Followers</p>
      <p>{user.following} Following</p>
    </div>
  )
}