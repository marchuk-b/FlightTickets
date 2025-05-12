const Ticket = require('../models/Ticket');
const Flight = require('../models/Flight');
const User = require('../models/User');
const { validationResult } = require('express-validator');

class ticketController {
  async createTicket(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
      const { user, name, surName, email, tel, flight, reservedSeats = [], seatClasses = [], price } = req.body;

      // Перевірка існування користувача та рейсу
      const existingUser = await User.findById(user);
      if (!existingUser) return res.status(404).json({ message: 'User not found' });

      const existingFlight = await Flight.findById(flight);
      if (!existingFlight) return res.status(404).json({ message: 'Flight not found' });

      const newTicket = new Ticket({
        user, name, surName, email, tel, flight, reservedSeats, seatClasses, price 
      });

      const savedTicket = await newTicket.save();
      res.status(201).json(savedTicket);
    } catch (error) {
      console.error("Ticket creation error:", error);
      res.status(500).json({ message: 'Error creating a Ticket', error: error.message });
    }
}

  async getTickets(req, res) {
    try {
      const tickets = await Ticket.find();
      res.json(tickets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while getting tickets' });
    }
  }

  async getTicket(req, res) {
    try {
      const { id } = req.params;
      const ticket = await Ticket.findById(id);
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
      return res.json(ticket);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Error while getting ticket' });
    }
  }

  async deleteTicket(req, res) {
    try {
      const { id } = req.params;
      const ticket = await Ticket.findByIdAndDelete(id);
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
      return res.json({ message: 'Ticket deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Error while deleting ticket' });
    }
  }

  async getUserReservedSeats(req, res) {
    try {
      const { userId, flightId } = req.params;
  
      const flight = await Flight.findById(flightId).populate('seats');
  
      if (!flight) {
        return res.status(404).json({ message: 'Рейс не знайдено' });
      }
  
      const reservedSeats = flight.seats
        .filter(seat => seat.reservedBy?.toString() === userId)
        .map(seat => ({
          seatId: seat.seatId,
          seatClass: seat.seatClass
        }));
  
      res.json({ reservedSeats });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Помилка при отриманні зарезервованих місць' });
    }
  }
  
}

module.exports = new ticketController();