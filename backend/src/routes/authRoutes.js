const Router = require('express');
const router = Router();
const controller = require('../controllers/authController');
const { check } = require('express-validator');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/register', [
    check('username', 'Username cannot be empty').notEmpty(),
    check('password', 'Password cannot be empty').notEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({min: 6}),
    check('email', 'Email cannot be empty').isEmail()
], controller.register);
router.post('/login', [
    check('username', 'Username cannot be empty').notEmpty(),
    check('password', 'Password cannot be empty').notEmpty()
], controller.login);
router.post('/logout', controller.logout);
router.get('/me', controller.getCurrentUser);

module.exports = router;