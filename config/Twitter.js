const Twitter = require("twitter");

const config = {
  lang:'en',
  count:100,
  tweet_mode:'extended',
  truncated: false,
  exclude: 'retweets',
}

async function getTweets(query){
  const tweets = (await TwitterClient.get('search/tweets',{q:query, ...config})).statuses.map(tweet => {
    return {
      src: tweet.user.profile_image_url_https,
      content: tweet.full_text
    }
  });
  return tweets;
}

async function getTweetsComplete(query){
  const tweets = (await TwitterClient.get('search/tweets',{q:query, ...config})).statuses;
  return tweets;
}
const TwitterClient = new Twitter({
  consumer_key:  process.env.CONSUMER_KEY,
  consumer_secret:  process.env.CONSUMER_SECRET,
  access_token_key:  process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});
module.exports = {TwitterClient, getTweets, getTweetsComplete};
// Create an app in https://apps.twitter.com/ generate the keys and tokens and create in the root of Tweelings a file called .env, just .env anything else
//.env example (of course this one doesn't works):
// CONSUMER_KEY=S7OwRcj5qsZ3ive43J7l5uhEY
// CONSUMER_SECRET=Do25lxz0rD3s1235lNYOZZrnBdjDLRRtfp0chxMSAoIviboyuhO
// ACCESS_TOKEN_KEY=8243848912334291074-SSRqWCY4EHSD3z4eZIbovWjhpk1hgfm
// ACCESS_TOKEN_SECRET=059FmhKRqCo123zi8HVlpc0U3WbvlrFZ6g9hifbWDJyGdX