// this is way too coupled
import { Request, Response, NextFunction } from 'express';
import { getToken } from '../utils/spotify';

export const checkTokenCookie = async (req: Request, res: Response, next: NextFunction) => {
  // check if the client has a valid token
  if (req.cookies.spotifyToken && new Date(Date.now()) < new Date(req.cookies.spotifyTokenExpiry)) {
    next();
  } else {
    const response = await getToken();
    const token = response.access_token;
    const tokenExpiry = new Date(new Date().getTime() + response.expires_in);
    console.log('Expires at: ' + tokenExpiry);
    res.cookie('spotifyToken', token).status(200);
    res.cookie('spotifyTokenExpiry', tokenExpiry);
    next();
  }
};
