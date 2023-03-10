const { sendSuccessResponse, sendFailureResponse } = require('../utils/responses.js')
const otpGenerator = require('otp-generator');
const { User } = require('../models');


const generateOTP = async (req, res) => {
    const { phone_number } = req.body;

    try {

        // Generate otp using otp generator
        const otp = otpGenerator.generate(4, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        });

        // If user exist update the record with generated otp and expiration date.
        const [id] = await User.update({ otp, otp_expiration_date: Date.now() + 300000 }, {
            where: {
                phone_number
            }
        })

        // If user does not exist send failure response.
        if (!id) {
            return sendFailureResponse(res, 404, {}, ['USER NOT EXIST']);
        }

        //Send success response with user id if everything went well .
        return sendSuccessResponse(res, 201, { id }, 'OTP GENERATED');
    } catch (error) {
        console.log('generateOTP', error);
        return sendFailureResponse(res, 500, {}, ['INTERNEL SERVER ERROR']);
    }
}

module.exports = generateOTP;
