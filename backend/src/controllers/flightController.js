const Flight = require('../models/Flight');
const Plane = require('../models/Plane');
const Seat = require('../models/Seat');

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
      
          const { rows, columns, aisles, classDistribution } = plane;
      
          const seats = [];
          let currentClass = 'business';
          let currentRow = 1;
      
          for (let classType of ['business', 'economy']) {
            const classRows = classDistribution[classType];
            for (let i = 0; i < classRows; i++) {
              let seatLetterIndex = 0;
      
              for (let j = 0; j < columns + aisles.length; j++) {
                if (aisles.includes(j)) continue;
      
                const seatId = `${currentRow}${String.fromCharCode(65 + seatLetterIndex)}`;
                seats.push(new Seat({ seatId, seatClass: classType }));
                seatLetterIndex++;
              }
              currentRow++;
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
            const flight = await Flight.findById(id).populate('plane');
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