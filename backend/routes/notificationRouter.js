import express from 'express';
import {
  getPublicKey,
  registerUser,
} from '../controllers/notificationController.js';

const notificationRouter = express.Router();

notificationRouter.route('/getVapidPublicKey').get(getPublicKey);
notificationRouter.route('/register').post(registerUser);

export default notificationRouter;
