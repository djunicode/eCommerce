import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import Redis from 'ioredis';
import cors from 'cors';
import webpush from 'web-push';

dotenv.config();

import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import paymentRouter from './routes/paymentRouter.js';
// import uploadRouter from './routes/uploadRoutes.js'; // Server crashes without valid AWS creds
import notificationRouter from './routes/notificationRouter.js';
import { verify } from './middleware/authMiddleware.js';
import connectDB from './config/db.js';

import { graphqlHTTP } from 'express-graphql';

import graphqlSchema from './graphql/schemas/index.js';
import graphqlResolvers from './graphql/resolvers/index.js';

await connectDB();

if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
  const keys = webpush.generateVAPIDKeys();
  console.log(keys);
  webpush.setVapidDetails(
    'mailto:none@none.com',
    keys.publicKey,
    keys.privateKey
  );
} else {
  webpush.setVapidDetails(
    process.env.VAPID_CONTACT,
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
}

const app = express();
const redis = new Redis();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use(verify);

app.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use('/payment', paymentRouter);
// app.use('/upload', uploadRouter);
app.use('/notifications', notificationRouter);

app.use(
  '/graphql',
  graphqlHTTP((req, res, graphQLParams) => {
    return {
      schema: graphqlSchema,
      rootValue: graphqlResolvers,
      context: { req, redis },
      graphiql: process.env.NODE_ENV === 'development' ? true : false,
    };
  })
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

export const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

export default {
  app,
};
