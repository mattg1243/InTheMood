import express from 'express';
import path from 'path';
import { getToken } from './utils/spotify';

const app = express();

app.get('/token', async (req, res, next) => {
  try {
    const response = await getToken();
    res.json(response);
  } catch (err) {
    console.error(err);
  }
});

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(3000);
