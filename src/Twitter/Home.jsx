import { Loading } from "./Loading";
import { Timeline } from "./Tweets/Timeline";


export function Home(props) {
  if (props.user) {
    return (
      <Timeline user={props.user} editTweet={props.editTweet}/>
    )
  }

  else {
    return (
      <Loading />
    )
  }
}