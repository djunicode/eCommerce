import { generateVAPIDKeys } from 'web-push';
import asyncHandler from 'express-async-handler';
import { loggedin } from '../utils/verifyUser.js';

import User from '../models/userModel.js';

if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
  console.log(
    'You must set the VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY environment variables. You can use the following ones:'
  );
  console.log(generateVAPIDKeys());
  return;
}

export const getPublicKey = asyncHandler(
  async((req, res) => {
    res.send(process.env.VAPID_PUBLIC_KEY);
  })
);

const isValidSaveRequest = (req, res) => {
  if (!req.body || !req.body.endpoint) {
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send(
      JSON.stringify({
        error: {
          id: 'no-endpoint',
          message: 'Subscription must have an endpoint.',
        },
      })
    );
    return false;
  }
  return true;
};

export const registerUser = asyncHandler(
  async((req, res) => {
    try {
      if (loggedin(req) && isValidSaveRequest(req, res)) {
        const user = await User.findById(req.user._id);
  
        if (user) {
          user.subscriptionDetails = req.body

          const updatedUser = await user.save();
  
          return {
            ...updatedUser._doc,
            password: null
          };
        } else {
          throw new Error('User not found');
        }
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }));
