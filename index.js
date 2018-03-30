import fetch from 'node-fetch';

// Run dotenv
require('dotenv').config();

const API_KEY = process.env.LAST_FM_API_KEY;

const API_URL = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=hank_chizl_jaw&api_key=${API_KEY}&format=json`


/**
 * Take a passed dataset and return a single latest track object
 *
 * @param {object} dataSet
 * @returns {object}
 */
const parseLatestTrack = dataSet => {
    let response = {};
    let item = dataSet.recenttracks.track[0];

    // Set core details 
    response.title = item.name;
    response.artist = item.artist['#text'];
    response.album = item.album['#text'];
    response.link = item.url;
    
    // Parse out the large image 
    response.image = item.image.filter(image => image.size === 'extralarge')[0]['#text'];

    return response;
};

const lastFmMostRecentTrack = async () => {
    
    try {
        let response = await fetch(API_URL);
        let jsonData = await response.json();
        console.log({
            'status': 'success',
            'data': {...parseLatestTrack(jsonData) }
        }) 
        return {
            'status': 'success',
            'data': {...parseLatestTrack(jsonData) }
        };
    }
    catch(error) {
        return {
            'status': 'error',
            'message': error
        }
    }
};

export default lastFmMostRecentTrack();
