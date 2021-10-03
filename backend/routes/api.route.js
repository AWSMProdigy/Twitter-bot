const router = require('express').Router();
const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_API_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_API_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET 
})

//Get timeline of user+
router.get('/tweet', async (req, res, next) => {
  try{
    const name = req.query.user;
    
    const tweet = await client.get("statuses/user_timeline.json?screen_name=" + name + "&count=1", {     
    })
    res.send({tweet});
  }
  catch(error){
    next(error);
  }
});

module.exports = router;
