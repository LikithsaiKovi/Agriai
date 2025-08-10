const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post('/', async (req, res) => {
  const { message } = req.body;

  console.log("📨 Message received:", message);
  console.log("🔑 API Key starts with:", process.env.OPENAI_API_KEY?.slice(0, 8));

  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }]
    });

    const reply = response.choices[0].message.content;
    console.log("✅ AI replied:", reply);
    res.json({ reply });

  } catch (err) {
    console.error("❌ OpenAI error:", err.response?.data || err.message || err);
    res.status(err.response?.status || 500).json({
  error: err.response?.data?.error?.message || 'AI failed to respond'
    });
  }
});

  module.exports = router; // ✅ CORRECT