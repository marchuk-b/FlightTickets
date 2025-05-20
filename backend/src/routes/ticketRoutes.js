const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const { body } = require('express-validator');

router.post('/',[
  body('email')
    .isEmail().withMessage('Невірний формат email')
    .normalizeEmail(),
  body('tel')
    .isString().withMessage('Телефон повинен бути рядком')
    .isLength({ min: 10 }).withMessage('Номер телефону має бути не менше 10 символів'),
  body('flight')
    .notEmpty().withMessage('Поле flight обов’язкове'),
  body('reservedSeats')
    .isArray({ min: 1 }).withMessage('Має бути хоча б одне заброньоване місце'),
  body('price')
    .isNumeric().withMessage('Ціна має бути числом'),
  body('user')
    .optional().isMongoId().withMessage('user має бути валідним ObjectId'),
], ticketController.createTicket);
router.get('/', ticketController.getTickets);
router.get('/:userId/', ticketController.getUserTickets);
router.get('/:id', ticketController.getTicket);
router.delete('/:id', ticketController.deleteTicket);
router.get('/user-reserved-seats/:userId/:flightId', ticketController.getUserReservedSeats);
router.get('/pdf/:ticketId', ticketController.saveTicketInPDF);

module.exports = router;
