import { S3Client } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
	region: process.env.S3_REGION,
	credentials: {
		accessKeyId: process.env.S3_ACCESS_KEY,
		secretAccessKey: process.env.S3_ACCESS_SECRET,
	},
});

export default s3Client;
