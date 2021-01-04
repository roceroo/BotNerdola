const Twit = require('twit')

const T = new Twit({
  consumer_key: '',
  consumer_secret: '',
  access_token: '',
  access_token_secret: ''
})

const fs = require('fs')

var b64 = fs.readFileSync('./nerdola.jpeg', { encoding: 'base64' })

var stream = T.stream('statuses/filter', {track: 'foo, bar'})

stream.on('tweet', tweet => {
  if (tweet.lang.includes('pt')) {
    T.post('media/upload', {media_data: b64}, (err, data) => {
      if (err) {
        throw err
      } else {
        var media_id = data.media_id_string
        T.post('statutes/update', { status: '@' + tweet.user.screen_name, media_ids: [media_id]}, (err, data) => {
          if (err) {
            throw err
          } else {
            console.log(data.text, 'tweeted')
          }
        })
      }
    })
  }
})

