const sendFailureResponse = (response, code = 400, data, messages = [], error_code, error_description) => {
    console.error('[sendFailureResponse][ERROR]', code, messages);
    if (error_description && error_description.code) {
        console.error('[sendFailureResponse][error_code]', error_code);
        console.error('[sendFailureResponse][error_description]', error_description);
        return response.status(error_description.code).json({ data, errors: error_description.message });
    }
    return response.status(code).json({ data, errors: messages });
  };
  
  const sendSuccessResponse = (response, code = 200, data, message) => {
    console.info('[sendSuccessResponse]', message);
    return response.status(code).json({ data, msg: message });
  };


  module.exports ={sendFailureResponse,sendSuccessResponse};