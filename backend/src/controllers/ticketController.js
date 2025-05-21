const Ticket = require('../models/Ticket');
const Seat = require('../models/Seat');
const Flight = require('../models/Flight');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const { generatePDF } = require('../utils/generatePDF');

class ticketController {
  async createTicket(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
      const { user, name, surName, email, tel, flight, reservedSeats = [], price } = req.body;

      const existingUser = await User.findById(user);
      if (!existingUser) return res.status(404).json({ message: 'Користувача не знайдено' });

      const existingFlight = await Flight.findById(flight);
      if (!existingFlight) return res.status(404).json({ message: 'Рейс не знайдено' });

      const newTicket = new Ticket({
        user, name, surName, email, tel, flight, reservedSeats, price 
      });

      const savedTicket = await newTicket.save();
      res.status(201).json(savedTicket);
    } catch (error) {
      console.error("Помилка під час створення квитка: ", error);
      res.status(500).json({ message: 'Помилка під час створення квитка', error: error.message });
    }
}

  async getTickets(req, res) {
    try {
      const tickets = await Ticket.find();
      res.json(tickets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Помилка під час отримання квитків' });
    }
  }

  async getUserTickets(req, res) {
    const { userId } = req.params;

    try {
      const userTickets = await Ticket.find({user: userId});

      res.json(userTickets); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Помилка під час отримання квитків користувача' });
    }
  }

  async getTicket(req, res) {
    try {
      const { id } = req.params;
      const ticket = await Ticket.findById(id);
      if (!ticket) {
        return res.status(404).json({ message: 'Квиток не знайдено' });
      }
      return res.json(ticket);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Помилка під час отримання квитка' });
    }
  }

  async deleteTicket(req, res) {
    try {
      const { id } = req.params;

      const ticket = await Ticket.findById(id);
      if (!ticket) {
        return res.status(404).json({ message: 'Квиток не знайдено' });
      }

      if (ticket.reservedSeats && ticket.reservedSeats.length > 0) {
        for (const seat of ticket.reservedSeats) {
          await Seat.updateOne(
            { seatId: seat.seatId, seatClass: seat.seatClass, isReserved: true },
            { $set: { reservedBy: null, isReserved: false } }
          );
        }
      }

      await Ticket.deleteOne({ _id: ticket._id });

      return res.json({ message: 'Квиток успішно видалено' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Помилка під час видалення квитка' });
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

  
  async saveTicketInPDF(req, res) {
    const { ticketId } = req.params;

    try {
      const ticket = await Ticket.findById(ticketId);
      if (!ticket) {
        return res.status(404).json({ message: 'Квиток не знайдено' });
      }

      const flight = await Flight.findById(ticket.flight);
      if (!flight) {
        return res.status(404).json({ message: 'Рейс не знайдено' });
      }

      const user = await User.findById(ticket.user);
      if (!user) {
        return res.status(404).json({ message: 'Користувача не знайдено' });
      }

      const reservedSeats = ticket.reservedSeats.map(seat => ({
        seatId: seat.seatId,
        seatClass: seat.seatClass
      }));

      const ticketInfo = {
        surName: ticket.surName,
        name: ticket.name,
        reservedSeats,
        price: ticket.price
      };

      await generatePDF(ticketInfo, flight);

      res.status(200).json({ message: 'PDF-квиток успішно згенеровано' });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Помилка під час генерації PDF-квитка', error: error.message });
    }
  }

  async payTicket(req, res) {
    const { id } = req.params;

    try {
      const ticket = await Ticket.findById(id);
      if (!ticket) {
        return res.status(404).json({ message: 'Квиток не знайдено' });
      }
      const { ticketStatus } = req.body;
      if (ticketStatus === 'Очікує оплати') {
        ticket.status = 'Оплачено';
        await ticket.save();
        return res.status(200).json({ message: 'Квиток успішно оплачено' });
      } else {
        return res.status(400).json({ message: 'Невірний статус квитка' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Помилка під час оплати квитка', error: error.message });
    }
  }
}

module.exports = new ticketController();