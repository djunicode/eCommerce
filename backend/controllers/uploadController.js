import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import asyncHandler from 'express-async-handler';

const s3 = new S3Client({ region: process.env.AWS_REGION });

export const getSignedURL = asyncHandler(async (req, res) => {
  try {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.params.key,
    });

    const url = await getSignedUrl(s3, command, {
      expiresIn: process.env.AWS_EXPIRE,
    });

    return url;

    /* If this doesn't work, try the v2 api (It is compatible until the next major release)

    var params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.params.key,
    };
    
    s3.getSignedUrl('putObject', params, (err, url) => {
      return url;
    });
    
    */
  } catch (err) {
    return res
      .status(500)
      .send(
        process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err
      );
  }
});
