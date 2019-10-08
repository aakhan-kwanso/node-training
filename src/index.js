// @ts-check
import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import v1Router from './api/v1/v1';

const PORT = process.env.PORT || 4000;
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.use('/api/v1', v1Router);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
