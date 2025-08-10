const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');

router.post('/', async (req, res) => {
  console.log("POST /api/newsletter hit!"); 
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  try {
    const entry = new Newsletter({ email });
    await entry.save();
    res.status(201).json({ message: 'Subscribed successfully.' });
  } catch (err) {
    res.status(400).json({ error: 'Email already subscribed or invalid.' });
  }
});

module.exports = router; // ✅ THIS IS REQUIRED
