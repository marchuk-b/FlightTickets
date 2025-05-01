const Flight = require('../models/Flight');
const { validationResult } = require('express-validator')


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
            const { flightName, direction, departureTime, departureDate, arrivalTime, arrivalDate, price, status, freeSeats, plane, seats } = req.body
            const flight = new Flight({ flightName, direction, departureTime, departureDate, arrivalTime, arrivalDate, price, status, freeSeats, plane, seats })
            await flight.save()
            return res.json(flight)
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Error while creating flight'})
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

}

module.exports = new flightController();