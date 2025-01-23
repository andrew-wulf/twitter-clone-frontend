import { Tweet } from "./Tweet";
import { QuoteTweet } from "./QuoteTweet";

import { Container, Stack, Col, Row } from "react-bootstrap";

export function TweetsIndex(props) {
  let tweets = props.tweets;
  console.log('tweets: ', tweets)



  if (tweets && tweets.length > 0) {
    return (
            <div className="flex flex-col">
              {
                tweets.map((tweet, i) => {
                  let first = false;
                  if (i === 0) { first = true}
                  return (
                    <div key={i}>
                      <Tweet tweet={tweet} parents={props.parents} view={false} first={first} user={props.user} editTweet={props.editTweet}/>
                    </div>
                  )
                })
              }
            </div>
    )
  }
}