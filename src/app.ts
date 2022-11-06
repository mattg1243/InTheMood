import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { getRecommendations } from './utils/spotify';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
// middleware
import { checkTokenCookie } from './middleware/checkToken';
dotenv.config();

const app = express();
app.use(cookieParser());

app.get(
  '/recommend',
  checkTokenCookie,
  async (req: Request<{}, {}, { mood: string }>, res: Response, next: NextFunction) => {
    try {
      const recomendations = await getRecommendations('happy', req.cookies.spotifyToken);
      res.status(200).json(recomendations);
    } catch (err) {
      console.error(err);
    }
  }
);

app.get('/features', checkTokenCookie, (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(__dirname, '../client/features.html'));
});

// app.get('/token', async (req: Request, res: Response, next: NextFunction) => {
//   console.log('token req');
// });

app.get('*', checkTokenCookie, (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(3000);
