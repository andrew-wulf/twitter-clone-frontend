
import axios from 'axios';
import { useState, useEffect } from 'react';


import { TweetsIndex } from './TweetsIndex.jsx';
import { Loading } from '../Loading.jsx';
import { NewTweet } from './NewTweet.jsx';


export function Timeline(props) {
  let user = props.user;

  const [tweets, setTweets] = useState([]);
  const [suggestedTweets, setSuggestedTweets] = useState([]);

  const [tweetsPage, setTweetsPage] = useState(1);
  const [suggestedPage, setSuggestedPage] = useState(1);

  const [offset, setOffset] = useState(0);

  
  const [gatherMethod, setGatherMethod] = useState('timeline');
  const [moreTweetsLeft, setMoreTweetsLeft] = useState(true);
  const [loading, setLoading] = useState(false);



  const getUserTimeline = () => {

    axios.get(`/tweets/timeline.json`, {params: {offset: 0, limit: 20}})
      .then(response => {
        console.log(response);
        //let output = [];
       // output.push(response.data)
        setTweets(response.data);

        if (response.data.length < 20) {
            setGatherMethod('suggested');
            setOffset(0);
        }
        else {
          setMoreTweetsLeft(true);
        }
      })
      .catch(error => {
        console.log(error);
        setMoreTweetsLeft(false);
      });
  }


  const getMoreTweets = (page) => {
    axios.get(`/tweets/${gatherMethod}.json`, {params: {offset: offset + (page - 1) * 20, limit: 20}})
      .then(response => {
        console.log(response);
        appendTweets(response.data);

        if (response.data.length < 20) {
          if (gatherMethod === 'suggested') {
            setMoreTweetsLeft(false);
          }
          else {
            setGatherMethod('suggested');
            setOffset(0);
          }
        }
        else {
          setMoreTweetsLeft(true);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }



  if (tweets.length + suggestedTweets.length < 20) {
    if (gatherMethod === 'timeline') {
      getUserTimeline();
    }
    else {
      getMoreTweets();
    }
  }



  const appendTweets = (data) => {

    let output = tweets;

    if (gatherMethod === 'suggested') {
      output = suggestedTweets
    }

    for (let j = 0; j < data.length; j++) {
      let row = data[j];
      let unique = true;
      let i = 0;
      while (i < output.length) {

        if (output[i].id === row.id) {
          console.log('match: ' + row.id)
          unique = false;
          break
        }
        i++;
      }
      if (unique) {output.push(row)}
    }

    //console.log(output);
    if (gatherMethod === 'timeline') {
      setTweets([...output])
    }
    else {
      setSuggestedTweets([...output])
    }
    setLoading(false);
  }




  useEffect(() => {
    if (tweets.length > 0) {
      let content = document.getElementsByClassName('content')[0];
      content.addEventListener('scroll', handleScroll);
      return () => {content.removeEventListener('scroll', handleScroll)}
    }
  })

  
  const handleScroll = () => {

    let timeline = document.getElementsByClassName('tweets-index')[0];
    let content = document.getElementsByClassName('content')[0];

    //console.log(timeline.scrollHeight, content.scrollTop)

    if (timeline) {

      if (content.scrollTop > (timeline.scrollHeight - 1400) && loading === false) {
        setLoading(true);
        handleScrollLimit();
      }
    }
  }


  const handleScrollLimit = () => {
    getNextPage();
    //console.log('loading...')
  }


  const getNextPage = () => {
    if (moreTweetsLeft) {
      if (gatherMethod === 'timeline') {
        setTweetsPage((tweetsPage + 1));
        getMoreTweets(tweetsPage + 1);
      }
      else {
        setSuggestedPage((suggestedPage + 1));
        getMoreTweets(suggestedPage + 1);
      }
    }
  }


  const handleSubmit = (tweet) => {
    let newArr = [tweet];
    newArr.push(...tweets);
    setTweets(newArr);
    setOffset(offset + 1);
  }
  


  let suggested = <></>;
  if (suggestedTweets.length > 0) {
    suggested = <>
                  <div className='suggested-title'>
                    <h4>Trending Now</h4>       
                  </div>
                  <TweetsIndex tweets={suggestedTweets} user={user} editTweet={props.editTweet}/>      
                </>
  }


  let tweetLoading = <></>;
  if (loading) {
    tweetLoading = <div className='spinner-container'>
                      <div className='simple-spinner'></div>
                    </div>
  }

  //console.log(tweets)
  if (tweets.length > 0 || suggestedTweets.length > 0) {
    return (
      <div>
        <div className='timeline-top-bar'/>
        <div className='timeline-new-tweet'>
          <NewTweet user={user} onSubmit={handleSubmit} minHeight={40}/>
        </div>

        <div className='tweets-index'>
          <TweetsIndex tweets={tweets} user={user} editTweet={props.editTweet}/>
          {suggested}
        </div>
        

        {tweetLoading}
      </div>
    )
  }

  else {
    if (moreTweetsLeft) {
    return (<Loading />)
  }
    else {
      return (
        <div className='flex justify-content-center'> 
          <h3>No tweets found.</h3>
        </div>
      )
    }
  }
}