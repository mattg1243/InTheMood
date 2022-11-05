import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { getToken } from './utils/spotify';
import moment from 'moment';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
// middleware
import { checkTokenCookie } from './middleware/checkToken';
dotenv.config();

const app = express();
app.use(cookieParser());


app.post('/recommend', checkTokenCookie, (req: Request<{}, {}, { mood: string }>, res: Response, next: NextFunction) => {
  res.json(200).json('got it!');
});

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
