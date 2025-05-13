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
            res.status(400).json({message: 'Помилка під час отримання рейсів'})
        }
    }

    async getFlight(req, res) {
        try {
            const { id } = req.params
            const flight = await Flight.findById(id)
            if (!flight) {
                return res.status(404).json({message: 'Рейс не знайдено'})
            }
            return res.json(flight)
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Помилка під час отримання рейсу'})
        }
    }

    async createFlight(req, res) {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Помилка валідації', errors });
        }
        const {
            flightName, direction, departureTime, departureDate,
            arrivalTime, arrivalDate, price, status, plane: planeId
        } = req.body;

        const plane = await Plane.findById(planeId);
        if (!plane) return res.status(404).json({ error: 'Літак не знайдено' });

        const seats = [];

        const flight = await Flight.create({
            flightName,
            direction,
            departureTime,
            departureDate,
            arrivalTime,
            arrivalDate,
            price,
            status,
            plane: planeId
        });

        for (const classType of ['business', 'economy']) {
            const config = classType === 'business' ? plane.businessPart : plane.economPart;

            let rowNumber = 1;
            for (let i = 0; i < config.rows; i++) {
                let seatColumnIndex = 1;  
                for (let j = 0; j < config.columns + config.aisles.length; j++) {
                    if (config.aisles.includes(j)) continue;

                    const seatId = `${seatColumnIndex}${String.fromCharCode(65 + i)}`; // Цифра для стовпця, буква для ряду
                    
                    seats.push(new Seat({
                        seatId, 
                        seatClass: classType, 
                        row: i + 1, 
                        column: seatColumnIndex,
                        flightId: flight._id
                    }));
                    seatColumnIndex++;
                }
                rowNumber++;
            }
        }

        const savedSeats = await Seat.insertMany(seats);
        const seatIds = savedSeats.map((seat) => seat._id);

        flight.seats = seatIds;
        await flight.save();

        res.status(201).json(flight);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Помилка під час створення рейсу' });
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
                return res.status(404).json({ message: 'Рейс не знайдено' });
            }
            return res.json(flight);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Помилка під час оновлення рейсу' });
        }
    }
    async deleteFlight(req, res) {
        try {
            const { id } = req.params
            const flight = await Flight.findByIdAndDelete(id)
            if (!flight) {
                return res.status(404).json({message: 'Рейс не знайдено'})
            }
            return res.json({ message: 'Рейс успішно видалено' });
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Помилка під час видалення рейсу'})
        }
    }

    async getSeats(req, res) {
        try {
            const { id } = req.params;
            const flight = await Flight.findById(id).populate('seats');
            if (!flight) {
              return res.status(404).json({ message: 'Рейс не знайдено' });
            }
            return res.json(flight.seats);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Помилка під час отримання місць' });
        }
    }

    async reserveSeat(req, res) {
        const flightId = req.params.id;
        const { seatIds, user } = req.body;
      
        const flight = await Flight.findById(flightId).populate('seats');
        if (!flight) return res.status(404).json({ message: 'Рейс не знайдено' });
      
        for (const seatId of seatIds) {
            const seat = flight.seats.find(s => {
                return s.seatId === seatId;
            });
            if (!seat) continue;
        
            if (seat.isReserved) {
                return res.status(400).json({ message: `Місце ${seatId} уже заброньовано` });
            }
        
            seat.isReserved = true;
            seat.reservedBy = user.id;
            await seat.save();
        }

        res.json({ message: "Місця заброньовані" });
    }
    async getReservedSeats(req, res) {
        const { id } = req.params;
        const flight = await Flight.findById(id).populate('seats');
        if (!flight) return res.status(404).json({ message: 'Рейс не знайдено' });
      
        const reservedSeats = flight.seats
        .filter(seat => seat.isReserved)
        .map(seat => seat.seatId);

        res.json(reservedSeats);
    }

    async getMySeats(req, res) {
        const { id } = req.params;
        const userId = req.user._id;
        
        const flight = await Flight.findById(id);
        if (!flight) return res.status(404).json({ message: 'Рейс не знайдено' });
        
        const mySeats = flight.seats.filter(seat => seat.reservedBy?.toString() === userId.toString());
        res.json(mySeats);
    }
}

module.exports = new flightController();