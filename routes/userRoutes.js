const express = require("express");
const createUser= require('../controllers/createUser.js');
const generateOTP= require('../controllers/generateOTP.js');
const verifyOTP= require('../controllers/verifyOTP.js');
const router = express.Router();


router.post('/',createUser)

router.post('/junaid',(req,res)=>{
    res.send("hello....")
})

router.post('/generateOTP',generateOTP);

router.get('/:user_id/verifyOTP',verifyOTP);


module.exports = router;


