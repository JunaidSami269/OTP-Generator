const sendFailureResponse = (response, code = 400, data, messages = []) => {
    console.error('[sendFailureResponse][ERROR]', code, messages);
    return response.status(code).json({ data, errors: messages });
  };
  
  const sendSuccessResponse = (response, code = 200, data, message) => {
    console.info('[sendSuccessResponse]', message);
    return response.status(code).json({ data, msg: message });
  };


  module.exports ={sendFailureResponse,sendSuccessResponse};