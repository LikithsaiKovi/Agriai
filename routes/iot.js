const express = require('express');
const router = express.Router();
const IotData = require('../models/IotData');

router.get('/', async (req, res) => {
  const latest = await IotData.find().sort({ createdAt: -1 }).limit(1);
  if (latest.length) {
    res.json(latest[0]);
  } else {
    // fallback simulated
    res.json({
      temperature: 25 + Math.random() * 5,
      humidity: 50 + Math.random() * 10,
      soilMoisture: 40 + Math.random() * 20,
      createdAt: new Date()
    });
  }
});

router.post('/', async (req, res) => {
  const { temperature, humidity, soilMoisture } = req.body;
  const entry = new IotData({ temperature, humidity, soilMoisture });
  await entry.save();
  res.status(201).json({ message: 'IoT data stored' });
});

module.exports = router;
