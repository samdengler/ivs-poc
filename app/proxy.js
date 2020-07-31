const axios = require('axios');
const url = `http://${process.env.ApplicationLoadBalancerDNSName}`;

exports.handler = async (event, context) => {
  console.log(`event:\n${JSON.stringify(event, null, 4)}`);
  console.log(`env:\n${JSON.stringify(process.env, null, 4)}`);

  try {
    const response = await axios.post(url, event);
    console.log(`response.status = ${response.status}`);
    return "ok";
  } catch (err) {
    console.log(err);
    return err;
  }
};
