const Plane = require('../models/Plane');
const { validationResult } = require('express-validator');

class planeController {
  async createPlane(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation error', errors });
      }

      const { name, rows, columns, aisles, classDistribution } = req.body;

      if (!classDistribution || typeof classDistribution !== 'object') {
        return res.status(400).json({ message: 'Invalid classDistribution' });
      }

      const totalClassRows = Object.values(classDistribution).reduce((a, b) => a + b, 0);
      if (totalClassRows > rows) {
        return res.status(400).json({ message: 'Sum of classDistribution exceeds total rows' });
      }

      const plane = new Plane({ name, rows, columns, aisles, classDistribution });
      await plane.save();
      res.status(201).json(plane);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while creating plane' });
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
