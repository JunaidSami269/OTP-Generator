const {sendSuccessResponse,sendFailureResponse} = require('../utils/responses.js')
const { User } = require('../models');

const verifyOTP = async (req, res) => {
   const { user_id: id } = req.params;
   const { otp } = req.query;

   try {
       // Find user with id.
       let user = await User.findOne({
           where: {
               id,
               otp
           }
       });

       // If user does not exist send failure response.
       if (!user) {
           return sendFailureResponse(res, 404, {}, ['USER NOT EXIST']);
       }

       user = user.toJSON();
       
       
       // Check if otp is expired
       if(Date.now() > new Date(user.otp_expiration_date.toString()).getTime()) {
           return sendFailureResponse(res, 400, {}, ['OTP EXPIRED']);
       }

       // send success response.
       return sendSuccessResponse(res, 200, user, 'OTP VERIFIED');

   } catch (error) {
       console.log('[controllers][users][verifyOTP]', error);
       return sendFailureResponse(res, 500, {}, ['INTERNEL SERVER ERROR']);
   }
}

module.exports = verifyOTP