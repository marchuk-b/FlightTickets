const Router = require('express');
const router = Router();
const controller = require('../controllers/flightController');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.get('/', controller.getFlights);
router.get('/:id', controller.getFlight);
router.post('/', roleMiddleware(['ADMIN']), controller.createFlight);
router.put('/:id', roleMiddleware(['ADMIN']), controller.updateFlight);
router.delete('/:id', roleMiddleware(['ADMIN']), controller.deleteFlight);

module.exports = router;