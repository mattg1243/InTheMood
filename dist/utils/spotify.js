"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecommendations = exports.getToken = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const requestData_1 = require("./requestData");
dotenv_1.default.config();
const client_id = process.env.API_CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const getToken = () => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('CLIENT: ' + client_id);
    // console.log('SECRET: ' + client_secret);
    let formData = new FormData();
    formData.append('grant_type', 'client_credentials');
    try {
        const response = yield (0, axios_1.default)({
            method: 'POST',
            url: 'https://accounts.spotify.com/api/token',
            data: { grant_type: 'client_credentials' },
            headers: {
                Authorization: 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return Promise.resolve(response.data);
    }
    catch (err) {
        console.log(err);
        return Promise.reject(err.message);
    }
});
exports.getToken = getToken;
const getRecommendations = (mood, token) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrl = 'https://api.spotify.com/v1/recommendations?limit=5&market=ES';
    const seedArtist = requestData_1.requestData.artist[mood];
    // api is only allowing one seed genre for some reason
    const seedGenres = requestData_1.requestData.genres[mood];
    const seedTracks = requestData_1.requestData.songs[mood];
    // create the request URL
    const reqUrl = `${baseUrl}&seed_artists=${seedArtist}&seed_genres=${seedGenres}&seed_tracks=${seedTracks}`;
    console.log(' --- REQUEST URL: ', reqUrl);
    // send the request and await the response
    try {
        const response = yield axios_1.default.get(reqUrl, {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        });
        const tracks = response.data.tracks;
        let resData = [];
        // loop through and save the data
        for (let i = 0; i < tracks.length - 1; i++) {
            resData.push({
                track_name: tracks[i].name,
                artist: tracks[i].artists[0].name,
                artwork: tracks[i].album.images[0].url,
                duration_ms: tracks[i].duration_ms,
                spotify_link: tracks[i].external_urls.spotify,
                explicit: tracks[i].explicit,
            });
        }
        console.log('  --- RESPONSE GENERATE: ', resData);
        return Promise.resolve(resData);
    }
    catch (err) {
        console.log(err.data.error);
        return Promise.reject();
    }
});
exports.getRecommendations = getRecommendations;
