'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Run dotenv
require('dotenv').config();

const API_KEY = process.env.LAST_FM_API_KEY;

const API_URL = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=hank_chizl_jaw&api_key=${API_KEY}&format=json`;

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

const lastFmMostRecentTrack = (() => {
    var _ref = _asyncToGenerator(function* (req, res) {

        try {
            let response = yield (0, _nodeFetch2.default)(API_URL);
            let jsonData = yield response.json();

            res.send({
                'status': 'success',
                'data': Object.assign({}, parseLatestTrack(jsonData))
            });
        } catch (error) {
            res.send({
                'status': 'error',
                'message': error
            });
        }
    });

    return function lastFmMostRecentTrack(_x, _x2) {
        return _ref.apply(this, arguments);
    };
})();

exports.lastFmMostRecentTrack;

