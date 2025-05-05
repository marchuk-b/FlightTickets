const Flight = require('../models/Flight');
const Plane = require('../models/Plane');
const Seat = require('../models/Seat');
const { validationResult } = require('express-validator');

class flightController {
    async getFlights(req, res) {
        try {
            const flights = await Flight.find()
            res.json(flights)
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Error while getting flights'})
        }
    }

    async getFlight(req, res) {
        try {
            const { id } = req.params
            const flight = await Flight.findById(id)
            if (!flight) {
                return res.status(404).json({message: 'Flight not found'})
            }
            return res.json(flight)
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Error while getting flight'})
        }
    }

    async createFlight(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Validation error', errors})
            }
            const {
                flightName, direction, departureTime, departureDate,
                arrivalTime, arrivalDate, price, status, plane: planeId
            } = req.body;
    
          const plane = await Plane.findById(planeId);
          if (!plane) return res.status(404).json({ error: 'Plane not found' });
      
          const seats = [];
          const classPrefix = { business: 'B', economy: 'E' };
      
          for (const classType of ['business', 'economy']) {
            // В залежності від класу використовуємо відповідну конфігурацію
            const config = classType === 'business' ? plane.businessPart : plane.economPart;
            
            // Задаємо кількість рядів з даних конфігурації
            let rowNumber = 1;
            for (let i = 0; i < config.rows; i++) {
              let seatLetterIndex = 0;
              // Загальна кількість позицій у ряду = кількість місць (columns) плюс кількість проходів (aisles)
              for (let j = 0; j < config.columns + config.aisles.length; j++) {
                // Пропускаємо позиції, які відповідають проходу
                if (config.aisles.includes(j)) continue;
      
                const seatLetter = String.fromCharCode(65 + seatLetterIndex); // A, B, C...
                const seatId = `${classPrefix[classType]}${seatLetter}${rowNumber}`;

                
                seats.push(new Seat({ seatId, seatClass: classType, row: rowNumber, column: seatLetter 
                }));
                seatLetterIndex++;
              }
              rowNumber++;
            }
          }
      
          const savedSeats = await Seat.insertMany(seats);
          const seatIds = savedSeats.map((seat) => seat._id);
      
          const flight = await Flight.create({
            flightName,
            direction,
            departureTime,
            departureDate,
            arrivalTime,
            arrivalDate,
            price,
            status,
            plane: planeId,
            seats: seatIds
          });
      
          res.status(201).json(flight);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Failed to create flight' });
        }
    }

    async updateFlight(req, res) {
        try {
            const { id } = req.params;
            const { flightName, direction, departureTime, departureDate, arrivalTime, arrivalDate, price, status, freeSeats, plane, seats } = req.body;
            const flight = await Flight.findByIdAndUpdate(
                id,
                { flightName, direction, departureTime, departureDate, arrivalTime, arrivalDate, price, status, freeSeats, plane, seats },
                { new: true }
            );
            if (!flight) {
                return res.status(404).json({ message: 'Flight not found' });
            }
            return res.json(flight);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error while updating flight' });
        }
    }
    async deleteFlight(req, res) {
        try {
            const { id } = req.params
            const flight = await Flight.findByIdAndDelete(id)
            if (!flight) {
                return res.status(404).json({message: 'Flight not found'})
            }
            return res.json({ message: 'Flight deleted successfully' });
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Error while deleting flight'})
        }
    }

    async getSeats(req, res) {
        try {
            const { id } = req.params;
            const flight = await Flight.findById(id).populate('seats');
            if (!flight) {
              return res.status(404).json({ message: 'Flight not found' });
            }
            return res.json(flight.seats);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error fetching seats' });
        }
    }

    async reserveSeat(req, res) {
        const flightId = req.params.id;
        const { seatIds, user } = req.body;
      
        const flight = await Flight.findById(flightId).populate('seats');
        if (!flight) return res.status(404).json({ message: 'Flight not found' });
      
        for (const seatId of seatIds) {
            const seat = flight.seats.find(s => {
                return s.seatId === seatId;
            });
            if (!seat) continue;
        
            if (seat.isReserved) {
                return res.status(400).json({ message: `Seat ${seatId} already reserved` });
            }
        
            seat.isReserved = true;
            seat.reservedBy = user.id;
            await seat.save();
        }

        res.json({ message: "Seats reserved" });
    }
    async getReservedSeats(req, res) {
        const { id } = req.params;
        const flight = await Flight.findById(id).populate('seats');
        if (!flight) return res.status(404).json({ message: 'Flight not found' });
      
        const reservedSeats = flight.seats
        .filter(seat => seat.isReserved)
        .map(seat => seat.seatId); // лише рядки типу "1A"

        res.json(reservedSeats);
    }

    async getMySeats(req, res) {
        const { id } = req.params;
        const userId = req.user._id;
        
        const flight = await Flight.findById(id);
        if (!flight) return res.status(404).json({ message: 'Flight not found' });
        
        const mySeats = flight.seats.filter(seat => seat.reservedBy?.toString() === userId.toString());
        res.json(mySeats);
    }
}

module.exports = new flightController();