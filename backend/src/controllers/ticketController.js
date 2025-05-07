const Ticket = require('../models/Ticket');
const { validationResult } = require('express-validator');

class ticketController {
  async createTicket(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
      const { user, email, tel, flight, reservedSeats, price } = req.body;

      const newTicket = new Ticket({
        user, email, tel, flight, reservedSeats, price 
      });
  
      const savedTicket = await newTicket.save();
      res.status(201).json(savedTicket);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error of creating a Ticket' });
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
}

module.exports = new ticketController();