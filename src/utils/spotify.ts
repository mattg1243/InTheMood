import axios from 'axios';
import dotenv from 'dotenv';
import type { SpotifyAuthResponse, Mood, SongResponse, RequestData, RecsForClient } from '../types';
import { requestData } from './requestData';
import FormData from 'form-data';
dotenv.config();

const client_id = process.env.API_CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

export const getToken = async (): Promise<SpotifyAuthResponse> => {
  // console.log('CLIENT: ' + client_id);
  // console.log('SECRET: ' + client_secret);
  let formData = new FormData();
  formData.append('grant_type', 'client_credentials');
  try {
    const response = await axios({
      method: 'POST',
      url: 'https://accounts.spotify.com/api/token',
      data: { grant_type: 'client_credentials' },
      headers: {
        Authorization: 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return Promise.resolve(response.data);
  } catch (err: any) {
    console.log(err);
    return Promise.reject(err.message);
  }
};

export const getRecommendations = async (mood: Mood, token: string): Promise<Array<RecsForClient>> => {
  const baseUrl = 'https://api.spotify.com/v1/recommendations?limit=5&market=ES';
  const seedArtist: string[] = requestData.artist[mood];
  // api is only allowing one seed genre for some reason
  const seedGenres: string = requestData.genres[mood];
  const seedTracks: string[] = requestData.songs[mood];
  // create the request URL
  const reqUrl = `${baseUrl}&seed_artists=${seedArtist}&seed_genres=${seedGenres}&seed_tracks=${seedTracks}`;
  console.log(' --- REQUEST URL: ', reqUrl);
  // send the request and await the response
  try {
    const response = await axios.get(reqUrl, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
    const tracks: Array<SongResponse> = response.data.tracks;
    let resData: RecsForClient[] = [];
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
  } catch (err: any) {
    console.log(err.data.error);
    return Promise.reject();
  }
};
