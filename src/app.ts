import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { checkTokenCookie } from './middleware/checkToken';
import { recommendSongsHandler } from './handlers/Recommend.handlers';
// load .env variables
dotenv.config();
const PORT = process.env.PORT;
// initiate express app
const app = express();
// middleware
app.use(cookieParser());
app.use(checkTokenCookie);

// server routes
// this is the route to hit in order to get the recommendations from Spotify
// see the handler function if you need to see how the response is sent
app.get('/api/recommend', recommendSongsHandler);

// static routes
// these routes all send html pages to the browser
app.get('/features', (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(__dirname, '../client/features.html'));
});

app.get('*', (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// start the server on port 3000
app.listen(3000, () => {
  console.log(`  ---  server listening for requests on port ${PORT}  ---`);
});
