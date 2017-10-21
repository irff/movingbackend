import AWS from 'aws-sdk'
import Promise from 'bluebird'

export default Promise.promisifyAll(new AWS.S3({ region: process.env.AWS_REGION || 'ap-southeast-1' }))
