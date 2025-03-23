const express = require('express')
const { registerUser, loginUser, verifyUser, forgotPassword, resetUserPassword, registerAdmin} = require('../controllers/userController')
const { authenticate, adminAuth} = require('../middleware/authentication');
const { registerUserValidator, loginValidator } = require('../middleware/validator');

const router = express.Router();

router.post("/admin/register", registerUserValidator, registerAdmin) 

router.post("/admin",adminAuth, registerAdmin)

router.post('/register',registerUserValidator,registerUser);

router.post('/login',loginValidator, loginUser);

router.get('/verify/user/:token', verifyUser);

router.post('/forgot_password/user', forgotPassword);

router.post('/reset_password/user/:token', resetUserPassword);


module.exports = router;
