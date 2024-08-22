const express = require('express');
const mongoose = require('mongoose');
const mentorRouter = require('./routers/mentorRouter');
const studentRouter = require('./routers/studentRouter');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Routers
app.use('/api', mentorRouter);
app.use('/api', studentRouter);

// back-end server testing
app.get('/',(req,res)=>{
    res.send(`<h1>Server Running Successfully</h1>`)
})
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
