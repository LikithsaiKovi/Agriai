const express = require('express');
const router = express.Router();

const recommendations = {
  loamy: { tropical: "Rice, Sugarcane", temperate: "Wheat, Corn", arid: "Millets, Chickpeas" },
  sandy: { tropical: "Cashew, Coconut", temperate: "Carrots, Potatoes", arid: "Pearl Millet, Sorghum" },
  clayey: { tropical: "Paddy, Jute", temperate: "Soybean, Barley", arid: "Cotton, Mustard" }
};

router.post('/', (req, res) => {
  const { soil, climate } = req.body;
  if (!soil || !climate || !recommendations[soil]?.[climate]) {
    return res.status(400).json({ error: 'Invalid input' });
  }
  res.json({ recommended: recommendations[soil][climate] });
});

module.exports = router;
