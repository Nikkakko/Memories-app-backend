import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './db/connection.js';
import dotenv from 'dotenv';
dotenv.config();

import postsRoute from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ['https://mern-memories-app-api.onrender.com'],
  })
);

// app.use(express.json());

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use('/posts', postsRoute);
app.use('/user', userRoutes);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server is listening on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
