// types from other modules
export { SongResponse } from '../utils/songResponse';
export { RequestData } from '../utils/requestData';

export declare type SpotifyAuthResponse = { access_token: string; token_type: string; expires_in: number };
export declare type Mood = 'happy' | 'sad' | 'angry';
export declare type RecsForClient = {
  track_name: string;
  artist: string;
  artwork: string;
  duration_ms: number;
  spotify_link: string;
  explicit: boolean;
};
