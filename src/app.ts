import express from 'express';
import path from 'path';

const app = express();

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(3000);
