// this is way too coupled
import { Request, Response, NextFunction } from 'express';
import { getToken } from '../utils/spotify';

export const checkTokenCookie = async (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies.spotifyToken) {
    next();
  } else {
    const response = await getToken();
    const token = response.access_token;
    const tokenExpiry = new Date(new Date().getTime() + response.expires_in);
    console.log('Expires at: ' + tokenExpiry);
    res.cookie('spotifyToken', token);
  }
};
