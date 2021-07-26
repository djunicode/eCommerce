import express from 'express';

import { getSignedURL } from '../controllers/uploadController.js';

const uploadRouter = express.Router();

uploadRouter.route('/:key').get(getSignedURL);

export default uploadRouter;
