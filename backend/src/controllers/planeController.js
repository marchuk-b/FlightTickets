const Plane = require('../models/Plane');
const { validationResult } = require('express-validator');

class planeController {
  async createPlane(req, res) {
    try {
      const { name, businessPart, economPart } = req.body;

      const newPlane = new Plane({
        name,
        businessPart,  
        economPart
      });
  
      const savedPlane = await newPlane.save();
      res.status(201).json(savedPlane);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error of creating a plane' });
    }
  }

  async getPlanes(req, res) {
    try {
      const planes = await Plane.find();
      res.json(planes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while getting planes' });
    }
  }

  async getPlane(req, res) {
    try {
      const { id } = req.params;
      const plane = await Plane.findById(id);
      if (!plane) {
        return res.status(404).json({ message: 'Plane not found' });
      }
      return res.json(plane);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Error while getting plane' });
    }
  }

  async deletePlane(req, res) {
    try {
      const { id } = req.params;
      const plane = await Plane.findByIdAndDelete(id);
      if (!plane) {
        return res.status(404).json({ message: 'Plane not found' });
      }
      return res.json({ message: 'Plane deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Error while deleting plane' });
    }
  }
}

module.exports = new planeController();
