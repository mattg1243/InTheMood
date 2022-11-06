import { Request, Response, NextFunction } from 'express';
import { getRecommendations } from '../utils/spotify';
import { Mood } from '../types';

export const recommendSongsHandler = async (req: Request, res: Response, next: NextFunction) => {
  const mood = req.query.mood;
  // need to find a better, TypeScript way to do this check
  if (mood !== 'happy' && mood !== 'sad' && mood !== 'angry') {
    return res.status(400).json({ message: 'please send mood as either happy, sad, or angry' });
  }
  try {
    const recomendations = await getRecommendations(mood, req.cookies.spotifyToken);
    res.status(200).json(recomendations);
  } catch (err) {
    res.status(503).json(err);
    console.error(err);
  }
};
