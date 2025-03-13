const express = require('express')
const { registerUser, loginUser, verifyUser, forgotPassword, resetUserPassword, registerAdmin} = require('../controllers/userController')
const { authenticate, adminAuth} = require('../middleware/authentication');

const router = express.Router();

router.post("/admin/register", registerAdmin)
router.post("/admin",adminAuth, registerAdmin)
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify/user/:token', verifyUser);
router.post('/forgot_password/user', forgotPassword);
router.post('/reset_password/user/:token', resetUserPassword);


module.exports = router;
