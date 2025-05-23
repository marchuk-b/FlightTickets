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
        try {
            const flightId = req.params.id;
            const { reservedSeats, user } = req.body;

            console.log('reservedSeats: ', reservedSeats);

            const flight = await Flight.findById(flightId).populate('seats');
            if (!flight) {
                return res.status(404).json({ message: 'Рейс не знайдено' });
            }

            for (const { seatId, seatClass } of reservedSeats) {
                const seat = flight.seats.find(s =>
                    s.seatId === seatId &&
                    s.seatClass === seatClass
                );

                if (!seat) {
                    return res.status(404).json({ message: `Місце ${seatId} не знайдено або не відповідає класу ${seatClass}` });
                }

                if (seat.isReserved) {
                    return res.status(400).json({ message: `Місце ${seatId} уже заброньовано` });
                }

                seat.isReserved = true;
                seat.reservedBy = user.id;
                await seat.save();
            }

            res.json({ message: "Місця заброньовані успішно" });
        } catch (error) {
            console.error('Помилка при бронюванні місць:', error);
            res.status(500).json({ message: "Сталася помилка під час бронювання" });
        }
    }


    async getReservedSeats(req, res) {
        const { id } = req.params;
        const flight = await Flight.findById(id).populate('seats');
        if (!flight) return res.status(404).json({ message: 'Рейс не знайдено' });
      
        const reservedSeats = flight.seats
        .filter(seat => seat.isReserved)
        .map(seat => ({
        seatId: seat.seatId,
        seatClass: seat.seatClass,
        }));

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

    async searchFlights(req, res) {
        try {
            const { from, to, departure, roundTrip, returnDate } = req.query;

            const formattedDeparture = departure?.trim();
            const formattedReturn = returnDate?.trim();

            const buildQuery = (from, to, date) => {
                const query = {
                    direction: { from, to }
                };
                if (date) {
                    query.departureDate = date;
                };
                return query;
            };

            if (roundTrip === 'true') {
                const outboundQuery = buildQuery(from, to, formattedDeparture);
                const returnQuery = buildQuery(to, from, formattedReturn || formattedDeparture);

                const [outboundFlights, returnFlights] = await Promise.all([
                    Flight.find(outboundQuery),
                    Flight.find(returnQuery)
                ]);

                res.json({ outboundFlights, returnFlights });
            } else {
                const query = buildQuery(from, to, formattedDeparture);
                const flights = await Flight.find(query);
                res.json(flights);
            }
        } catch (error) {
            console.error("Помилка при пошуку рейсів:", error);
            res.status(500).json({ message: 'Помилка при пошуку рейсів' });
        }
    }

}

module.exports = new flightController();