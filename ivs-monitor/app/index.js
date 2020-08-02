const AWS = require('aws-sdk');
const ivs = new AWS.IVS();

exports.lambdaHandler = async (event, context) => {
  console.log(`\n${JSON.stringify(event, null, 4)}`);

  try {
    return ivs.getStream({channelArn:event.resources[0]}).promise();
  } catch (err) {
    console.log(err);
    throw(err);
  }
};
