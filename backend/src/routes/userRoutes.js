const Router = require('express');
const router = Router();
const controller = require('../controllers/userController');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.get('/', controller.getUsers);
router.get('/:id', controller.getUser);
router.delete('/:id', roleMiddleware(['ADMIN']), controller.deleteUser);
router.put('/:id', roleMiddleware(['ADMIN']), controller.changeUser);
router.post('/:id/role/:role', roleMiddleware(['ADMIN']), controller.addUserRole);
router.delete('/:id/role/:role', roleMiddleware(['ADMIN']), controller.deleteUserRole);

module.exports = router;