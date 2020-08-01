const AWS = require('aws-sdk');
const ivs = new AWS.IVS();

exports.createChannelHandler = async (event, context) => {
  console.log(`\n${JSON.stringify(event, null, 4)}`);

  try {
    const channelName = event.executionId.replace(/:/g, '_');
    const data = await ivs.createChannel({name:channelName}).promise();
    return {
      channelArn: data.channel.arn,
      ingestEndpoint: data.channel.ingestEndpoint,
      playbackUrl: data.channel.playbackUrl,
      streamKey: data.streamKey.value
    };
  } catch (err) {
    console.log(err);
    throw(err);
  }
};

exports.deleteChannelHandler = async (event, context) => {
  console.log(`\n${JSON.stringify(event, null, 4)}`);

  try {
    return await ivs.deleteChannel({arn:event.channel.channelArn}).promise();
  } catch (err) {
    console.log(err);
    throw(err);
  }
};