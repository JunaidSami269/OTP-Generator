const { sendSuccessResponse, sendFailureResponse } = require('../utils/responses.js')
const {User}  = require("../models");


console.log('User', User);
const createUser = async (req, res, next) => {
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

    // Creating user.
    // await User.create({
    //   name,
    //   phone_number
    // });
    // console.log("executing create");
    // If everything went well return success response.
    return sendSuccessResponse(res, 201, {}, "'User created successfully'");

  } catch (error) {
    console.log('create user error:', error);
    //return failiure response
    return sendFailureResponse(res, 500, {}, [INTERNEL_SERVER_ERROR]);
  }
}



module.exports = createUser;