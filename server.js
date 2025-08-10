const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Error:", err));

// Routes
app.use('/api/newsletter', require('./routes/newsletter'));
app.use('/api/recommend-crop', require('./routes/crop'));
app.use('/api/iot-data', require('./routes/iot'));
app.use('/api/weather', require('./routes/weather'));
app.use('/api/chatbot', require('./routes/chatbot'));

const path = require('path');

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// Server start
const PORT = process.env.PORT || 5050;
app.get('/test', (req, res) => {
  res.send('Test route working ✅');
});
app.get('/', (req, res) => {
  res.send('✅ AgriAI Backend is Running');
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
