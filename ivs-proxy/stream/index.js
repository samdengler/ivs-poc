let response;

exports.ivsHandler = async (event, context) => {
  console.log(`\n${JSON.stringify(event, null, 4)}`);

  let ivsEvent = JSON.parse(event.body);
  console.log(`\n${JSON.stringify(ivsEvent, null, 4)}`);

  response = {
    statusCode: 200,
    body: "{}"
  };
  return response;
};

exports.snsHandler = async (event, context) => {
  console.log(`\n${JSON.stringify(event, null, 4)}`);

  response = {
    statusCode: 200,
    body: "{}"
  };
  return response;
};

handleStreamEvent = async (streamId) => {
}