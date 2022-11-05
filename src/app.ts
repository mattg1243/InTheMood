import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { getToken } from './utils/spotify';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.post('/recommend', (req: Request<{}, {}, { mood: string }>, res: Response, next: NextFunction) => {
  res.json(200).json('got it!');
});

app.get('/features', (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(__dirname, '../client/features.html'));
});

app.get('/token', async (req: Request, res: Response, next: NextFunction) => {
  console.log('token req');
  try {
    const response = await getToken();
    res.json(response);
  } catch (err) {
    console.error(err);
  }
});

app.get('*', (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(3000);
