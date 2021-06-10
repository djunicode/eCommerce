import webpush from 'web-push';

import User from '../models/userModel.js';

export const pushNotification = async (userId, message) => {
  try {
    const user = await User.findById(userId);

    if (user && user.subscriptionDetails) {
      try {
        await webpush.sendNotification(
          JSON.parse(user.subscriptionDetails),
          message
        );
        return true;
      } catch (err) {
        if (err.statusCode === 404 || err.statusCode === 410) {
          // Expired subscription
          user.subscriptionDetails = undefined;

          await user.save();

          return false;
        } else {
          throw err;
        }
      }
    } else {
      throw new Error('User not found or is not subscribed');
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
