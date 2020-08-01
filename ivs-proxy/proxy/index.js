const axios = require('axios');
const url = `http://${process.env.APPLICATION_LOAD_BALANCER_DNS_NAME}`;

exports.ivsHandler = async (event, context) => {
  console.log(`event:\n${JSON.stringify(event, null, 4)}`);

  try {
    return await axios.post(`${url}/ivs`, event);
  } catch (err) {
    return err;
  }
};

axios.interceptors.request.use(x => {
  console.log(x);
  return x;
})

axios.interceptors.response.use(x => {
  console.log(x);
  return x;
})