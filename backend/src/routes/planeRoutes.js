const Router = require('express');
const router = Router();
const controller = require('../controllers/planeController');
const { check, body } = require('express-validator');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/', roleMiddleware(['ADMIN']), [
    check('name', 'Model is required').notEmpty(),
    check('rows', 'Rows must be a positive integer').isInt({ min: 1 }),
    check('columns', 'Columns must be a positive integer').isInt({ min: 1 }),
    body('classDistribution.business', 'Business class rows must be >= 0').isInt({ min: 0 }),
    body('classDistribution.economy', 'Economy class rows must be >= 0').isInt({ min: 0 }),
    body('aisles', 'Aisles must be an array of numbers').optional().isArray(),
    body('aisles.*', 'Each aisle must be a valid column number').optional().isInt({ min: 0 }),
  ], controller.createPlane);
router.get('/:id', controller.getPlane);
router.get('/', controller.getPlanes);
router.delete('/:id', roleMiddleware(['ADMIN']), controller.deletePlane);

module.exports = router;