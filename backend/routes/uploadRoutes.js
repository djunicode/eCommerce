import express from 'express';

import { getSignedURL } from '../controllers/uploadController.js';

const uploadRouter = express.Router();

uploadRouter.route('/upload/:key').get(getSignedURL);

export default uploadRouter;
