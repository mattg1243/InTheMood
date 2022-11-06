import { Request, Response, NextFunction } from 'express';
import { getToken } from '../utils/spotify';

export const checkTokenCookie = async (req: Request, res: Response, next: NextFunction) => {
  // check if the client has a valid token
  // this is getting a new token every request for now, need to fix that
  if (req.cookies.spotifyToken && new Date(Date.now()) < new Date(req.cookies.spotifyTokenExpiry)) {
    next();
  } else {
    console.log('  --- token expired, refreshing...');
    const response = await getToken();
    const token = response.access_token;
    const tokenExpiry = new Date(new Date().getTime() + response.expires_in);
    res.cookie('spotifyToken', token).status(200);
    res.cookie('spotifyTokenExpiry', tokenExpiry);
    console.log('  --- token refresh complete, expires at ', tokenExpiry);
    next();
  }
};
