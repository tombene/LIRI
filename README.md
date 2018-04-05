# Thomas Benedict LIRI

# LIRI Bot

### Overview

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.
   
### Instructions

1. After cloning project you will need to run npm install

2. Next, create a file named `.env`, add the following to it, replacing the values with your API keys (no quotes) once you have them:

```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

# Twitter API keys

TWITTER_CONSUMER_KEY=your-twitter-consumer-key
TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret

```

### What Does It Do?
It takes in the following commands:

    * `my-tweets`

    * `spotify-this-song`

    * `movie-this`

    * `do-what-it-says`

It then displays the results to a console log and appends it to a log.txt file.

### What does each command do

1. `node liri.js my-tweets`

   * This will show your last 20 tweets and when they were created at in your terminal/bash window.

	 ![Image of twitter results](/images/twitterresults.jpg)

2. `node liri.js spotify-this-song '<song name here>'`

   * This will show you the below results of a search

	![Image of spotify results](/images/spotifyresults.jpg)

3. `node liri.js movie-this '<movie name here>'`

   * This will output the following:

	 ![Image of omdb results](/images/omdbresults.jpg)

4. `node liri.js do-what-it-says`
   
   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

	 ![Image of file read results](/images/dowhatitsaysresults.jpg)

5. 'node liri.js log.txt'

	* In addition to logging the data to your terminal/bash window, the data is outputted to a .txt file called `log.txt`.

	![Image of appended log file](/images/logresults.jpg)


