const watson = require('watson-developer-cloud');
const tone_analyzer = watson.tone_analyzer({
  username: process.env.WATSON_USERNAME,
  password: process.env.WATSON_PASSWORD,
  version: process.env.WATSON_VERSION,
  version_date: process.env.WATSON_VERSION_DATE
});

function analyseTone(text) {
  // console.log(text)
  return new Promise((resolve, reject) => {
    let res = {};
    tone_analyzer.tone({ 'text': text }, (err, res) => {
      if (err)
        reject(err);
      else
        resolve({...res, document_tone:{tones:ordenar(res.document_tone.tones)}});
    });
  });
}

function ordenar(tones){
  return tones.sort((a,b)=>{
    return b.score-a.score;
  })
}

function customOverview(sentences_tone) {
  const anger = {score:0,num:0}, joy = {score:0,num:0}, sadness = {score:0,num:0}, analytical = {score:0,num:0}, confident = {score:0,num:0}, tentative = {score:0,num:0};
  let cont = 0;
  sentences_tone.forEach(sentence => {
    sentence.tones.forEach(tone => {
      cont++;
      switch (tone.tone_id) {
        case 'anger':
          anger.num++;
          anger.score += tone.score
          break;
        case 'joy':
          joy.num++;
          joy.score += tone.score
          break;
        case 'sadness':
          sadness.num++;
          sadness.score += tone.score
          break;
        case 'analytical':
          analytical.num++;
          analytical.score += tone.score
          break;
        case 'confident':
          confident.num++;
          confident.score += tone.score
          break;
        case 'tentative':
          tentative.num++;
          tentative.score += tone.score
          break;
        default:
          break;
      }
    })
  })
  console.log('anger',anger);
  console.log('joy',joy);
  console.log('sadness',sadness);
  console.log('analytical',analytical);
  console.log('confident',confident);
  console.log('tentative',tentative);
  console.log('total',cont);

  return [
    { tone_id: 'anger', score: anger.score * anger.num / cont, tone_name: 'Anger' },
    { tone_id: 'joy', score: joy.score * joy.num / cont, tone_name: 'Joy' },
    { tone_id: 'sadness', score: sadness.score * sadness.num / cont, tone_name: 'Sadness' },
    { tone_id: 'analytical', score: analytical.score * analytical.num / cont, tone_name: 'Analytical' },
    { tone_id: 'confident', score: confident.score * confident.num / cont, tone_name: 'Confident' },
    { tone_id: 'tentative', score: tentative.score * tentative.num / cont, tone_name: 'Tentative' },
  ]
}

module.exports = { tone_analyzer, analyseTone, customOverview }
// Follow this tutorial https://console.bluemix.net/docs/services/tone-analyzer/getting-started.html#getting-started-tutorial in order to get credentials and create a file called .env
// .env example (of course this one doesn't works):
// WATSON_USERNAME=93a5f5fd-casdad151-bbcc-658b81096aac
// WATSON_PASSWORD=ams7AfghFLEle
// WATSON_VERSION=v3
// WATSON_VERSION_DATE=2017-09-21
// More info: https://www.ibm.com/watson/developercloud/tone-analyzer/api/v3/#api_explorer
// Tones explanation: https://developer.ibm.com/courses/find-sad-song-play-watson-tone-analyzer/