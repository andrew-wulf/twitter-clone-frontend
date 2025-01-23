import { Image, Stack, Container, Row, Col } from "react-bootstrap";
import { VideoPlayer } from "./VideoPlayer";


export function TweetContent(props) {
  let tweet = props.tweet;

  let quote = <div></div>;
  let content = <p className="tweet-text">{tweet.text}</p>;


  if (tweet.image) {
    content = 
    <div>
      <Row>
        <p className="tweet-text">{tweet.text}</p>
      </Row>

      <Row>
        <Col xs={1}/>
        <Col xs={10}>
          <Container className="tweet-img-container">
            <Image fluid src={tweet.image} alt="..." />

          </Container>
        </Col>
      </Row>
    </div>
  }

  if (tweet.video) {
    
    content =
    <div className="flex flex-col gap-3">
      <p className="tweet-text">{tweet.text}</p>

      <div className="tweet-video-container">
        <VideoPlayer video={tweet.video}/>
      </div>
     

    </div>
  }

  if (tweet.is_quote) {
    let qt = tweet.quoted_tweet;
    let media = <div></div>;

    if (qt.image) {
      media = 
      <Container className="tweet-img-container">
        <Image fluid src={qt.image} alt="..." />

      </Container>
    }
    if (qt.video) {
      media = <div className="tweet-video-container">
      <iframe className='video' width='500' height='320' 
        title='Youtube player'
        sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
        src={qt.video}>
      </iframe>
    </div>
    }

    quote = 
      <Row>
        <Col xs={2}/>
        <Col xs={8}>
          <Container className="quote" onClick={(e) => {e.stopPropagation(); window.location.href = `/tweet/${qt.id}`}}>
            <Row>
              <Col>
                <Stack direction='horizontal' gap={4}>
                  <div className="avi-container">
                   <Image src={qt.avi} className='avi'/>
                  </div>
                  <Stack>
                    <h6 className = 'user-display-name' onClick={(e) => {e.stopPropagation(); window.location.href = `/users/${qt.username}`}}>{qt.display_name}</h6>
                  </Stack>
                </Stack>
              </Col>
            </Row>

            <Row>
              <Col>
                <p>{qt.text}</p>
              </Col>
            </Row>

            <Row>
              <Col>
                {media}
              </Col>
            </Row>

          </Container>
        </Col>
      </Row>
  }

  return (
    <div>

      {content}

      {quote}

    </div>
  )
}