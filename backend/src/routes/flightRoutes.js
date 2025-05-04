const Router = require('express');
const router = Router();
const controller = require('../controllers/flightController');
const roleMiddleware = require('../middlewares/roleMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', controller.getFlights);
router.get('/:id', controller.getFlight);
router.post('/', roleMiddleware(['ADMIN']), controller.createFlight);
router.put('/:id', roleMiddleware(['ADMIN']), controller.updateFlight);
router.delete('/:id', roleMiddleware(['ADMIN']), controller.deleteFlight);
router.get('/:id/seats', controller.getSeats);
router.patch('/:id/seats', authMiddleware, controller.reserveSeat);
router.get('/:id/reserved-seats', controller.getReservedSeats);
router.get('/:id/my-seats', authMiddleware, controller.getMySeats);


module.exports = router;