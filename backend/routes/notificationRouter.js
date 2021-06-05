import express from 'express';
import {
  getPublicKey,
  registerUser,
  sendNotification,
} from '../controllers/notificationController.js';

const notificationRouter = express.Router();

notificationRouter.route('/vapidPublicKey').get(getPublicKey);
notificationRouter.route('/register').post(registerUser);
notificationRouter.route('/sendNotification').post(sendNotification);

export default notificationRouter;
