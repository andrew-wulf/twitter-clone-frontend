import { Container, Row, Col, Stack, Image } from "react-bootstrap"

import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { FaRetweet } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { FaArrowUpFromBracket } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import { ImStatsBars } from "react-icons/im";

export function QuoteTweet(props) {
  let tweet = props.tweet;
  let qt = tweet.quoted_tweet;

  return (

    <Container key={tweet.id} className='tweet'>

      <Row>
        <Col>
          <Stack direction='horizontal' gap={2}>
            <div className="avi-container">
              <Image src={tweet.avi} className='avi'/>
            </div>
              <h5>{tweet.display_name}</h5>
              <p>@{tweet.username}</p>
         
          </Stack>
        </Col>
      </Row>

      <Row>
        <Col>
          <p>{tweet.text}</p>
        </Col>
      </Row>

      <Row>
        <Col xs={2}/>
        <Col xs={8}>
          <Container className="quote" onClick={() => {window.location.href = `/tweet/${qt.id}`}}>
            <Row>
              <Col>
                <Stack direction='horizontal' gap={4}>
                  <div className="avi-container">
                    <Image src={qt.avi} className='avi-quote'/>
                  </div>
                  <Stack>
                    <h6>{qt.display_name}</h6>
                  </Stack>
                </Stack>
              </Col>
            </Row>

            <Row>
              <Col>
                <p>{qt.text}</p>
              </Col>
            </Row>

          </Container>
        </Col>
      </Row>


      <Row>
        <Col xs={2}>
          <Stack direction="horizontal" gap={2}>
            <FaRegComment/>
            {tweet.replies}
          </Stack>
        </Col>

        <Col xs={2}>
          <Stack direction="horizontal" gap={2}>
            <FaRetweet />
            {tweet.retweets}
          </Stack>
        </Col>

        <Col xs={2}>
          <Stack direction="horizontal" gap={2}>
            <IoMdHeartEmpty />
            {tweet.likes}
          </Stack>
        </Col>

        <Col xs={2}>
          <Stack direction="horizontal" gap={2}>
            <ImStatsBars/>
            23.4M
          </Stack>
        </Col>

        <Col>
          <Stack direction="horizontal" gap={3}>
            <FaArrowUpFromBracket/>
            <FaRegBookmark/>
          </Stack>
        </Col>
      </Row>

    </Container>
  )
}