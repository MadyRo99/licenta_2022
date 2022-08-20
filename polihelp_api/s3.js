require('dotenv').config()
const fs = require('fs')
const S3 = require("aws-sdk/clients/s3")

let bucketName
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

function uploadFile(filePath, fileName, bucket) {
    const fileStream = fs.createReadStream(filePath)

    if (bucket == "profile") {
        bucketName = process.env.AWS_BUCKET_NAME_PROFILE
    } else if (bucket == "event") {
        bucketName = process.env.AWS_BUCKET_NAME_EVENT
    }

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: fileName
    }

    return s3.upload(uploadParams).promise()
}

function getFileStream(fileKey, bucket) {
    if (bucket == "profile") {
        bucketName = process.env.AWS_BUCKET_NAME_PROFILE
    } else if (bucket == "event") {
        bucketName = process.env.AWS_BUCKET_NAME_EVENT
    }

    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream()
}

exports.uploadFile = uploadFile
exports.getFileStream = getFileStream