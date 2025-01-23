
import "../css/tweetmodal.css"

import { NewTweet } from "./NewTweet";



export function TweetModal(props) {
  let user = props.user;

  const handleSubmit = (tweet) => {
    props.onClose();

    if (window.location.href.includes("/home")) {
      window.location.reload();
    }
  }


  let content = <NewTweet user={user} onSubmit={handleSubmit} minHeight={100} tweet={props.tweet}/>;

  // if (props.tweet) {
  //   content = <EditTweet user={user} tweet={props.tweet} onSubmit={handleSubmit} />
  // }


  if (props.show) {
    return (
      <div className="modal-background">
        <section className="tweet-modal">
          {props.children}
          <button className="close" type="button" onClick={props.onClose}>
            &#x2715;
          </button>

          <div className="edit-tweet-header">
            Edit Tweet
          </div>

          {content}
        </section>
      </div>
    );
  }
}