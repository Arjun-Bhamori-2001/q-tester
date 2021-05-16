const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    getUserProfile,
    deleteUser,
    updateProfile,
    updatePassword,
    logout
} = require('../controllers/authController');


const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/me')
      .get(isAuthenticatedUser, getUserProfile)
      .delete(isAuthenticatedUser, deleteUser)

router.route('/password/update').put(isAuthenticatedUser, updatePassword)
router.route('/me/update').put(isAuthenticatedUser, updateProfile)





router.route('/logout').get(logout);


module.exports = router;