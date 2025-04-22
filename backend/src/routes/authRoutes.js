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
router.post('/login', controller.login);
router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers);


module.exports = router;