const { sendSuccessResponse, sendFailureResponse } = require('../utils/responses.js')
const { User } = require("../models");

const createUser = async (req, res) => {
  const { name, phone_number } = req.body;

  try {

    // Create user if not exist.
    let [user, created] = await User.findOrCreate({
      where: { phone_number },
      defaults: {
        name,
        phone_number
      }
    });

    // If user exist send failure response.
    if (!created) {
      //return failure response.
      return sendFailureResponse(res, 409, {}, ['User already exist']);
    }

    //send success response
    return sendSuccessResponse(res, 201,user, "'User created successfully'");

  } catch (error) {
    //return failiure response
    return sendFailureResponse(res, 500, {}, ['INTERNEL SERVER ERROR']);
  }
}



module.exports = createUser;