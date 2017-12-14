const server = require('server');
const { get, post } = server.router;
const { render, json } = server.reply;
const {TwitterClient, getTweets, getTweetsComplete }= require('../../config/Twitter');
const {tone_analyzer, analyseTone, customOverview} = require('../../config/Watson');

async function getFav(ctx) {
  // const tweets = await getTweets('Donald Trump');
  const fs = require('fs');
  const obj = JSON.parse(fs.readFileSync('./api/tweelings/favTweelings.json', 'utf8'));
  
  return json(obj);
}

async function getTweetsByQuery(ctx) {
  const query = ctx.query.query;
  const tweets = await getTweetsComplete(query);
  return json(tweets);
}

async function getTweeling(ctx) {
  const query = ctx.query.query;
  const tweets = await getTweets(query);

  const wholeText = tweets.map(tweet=>tweet.content+'./n')

  const tone = await analyseTone(wholeText);
  const tweeling = {
    query,
    tweets,
    tones:tone.document_tone.tones,
    tone,
    wholeText
  }
  return json(tweeling);
}

const tweelings = [
  get('/favTweelings', getFav),
  get('/tweetsByQuery', getTweetsByQuery),
  get('/tweeling', getTweeling)
]

module.exports = tweelings;