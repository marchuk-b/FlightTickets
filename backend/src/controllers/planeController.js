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
      res.status(500).json({ message: 'Помилка під час створення літака' });
    }
  }

  async getPlanes(req, res) {
    try {
      const planes = await Plane.find();
      res.json(planes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Помилка під час отримання літаків' });
    }
  }

  async getPlane(req, res) {
    try {
      const { id } = req.params;
      const plane = await Plane.findById(id);
      if (!plane) {
        return res.status(404).json({ message: 'Літак не знайдено' });
      }
      return res.json(plane);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Помилка під час отримання літака' });
    }
  }

  async deletePlane(req, res) {
    try {
      const { id } = req.params;
      const plane = await Plane.findByIdAndDelete(id);
      if (!plane) {
        return res.status(404).json({ message: 'Літак не знайдено' });
      }
      return res.json({ message: 'Літак успішно видалено' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Помилка під час видалення літака' });
    }
  }
}

module.exports = new planeController();
