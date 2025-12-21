require('dotenv').config();
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes')
const itemRoutes = require('./routes/itemRoutes')

const app = express();
app.use(cors())
app.use(express.json())

//connect db
connectDB(process.env.MONGO_URL)

// routes 
app.use('/api/auth', authRoutes);
app.use('/api/items',itemRoutes);


app.get('/', (req, res) => {
    res.send("message")
})

// app.post('', () => {

// })

// app.put('', () => {

// })

// app.delete('', () => {

// })


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
});