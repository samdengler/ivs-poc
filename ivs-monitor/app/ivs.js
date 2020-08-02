const AWS = require('aws-sdk');
const ivs = new AWS.IVS();

exports.getStreamHandler = async (event, context) => {
  console.log(`\n${JSON.stringify(event, null, 4)}`);

  try {
    return ivs.getStream({channelArn:event.resources[0]}).promise();
  } catch (err) {
    console.log(err);
    throw(err);
  }
};

exports.stopStreamHandler = async (event, context) => {
  console.log(`\n${JSON.stringify(event, null, 4)}`);

  try {
    return ivs.stopStream({channelArn:event.stream.channelArn}).promise();
  } catch (err) {
    console.log(err);
    throw(err);
  }
};
