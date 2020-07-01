import S3 from 'react-aws-s3';
 
const config = {
    bucketName: 'automadevs',
    dirName: 'img', /* optional */
    region: 'us-east-1',
    accessKeyId: 'AKIAI7LTQTGUSPMXXSYQ',
    secretAccessKey: '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',
    s3Url : 'https://automadevs.s3.amazonaws.com'
}

const ReactS3Client = new S3(config);
 
export default ReactS3Client;