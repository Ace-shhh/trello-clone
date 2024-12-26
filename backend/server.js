const dotenv = require('dotenv');
dotenv.config();
const cloudinary = require('cloudinary').v2;
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const workspaceRoutes = require('./routes/workspaceRoutes');
const columnRoutes = require('./routes/columnRoutes');
const boardRoutes = require('./routes/boardRoutes');
const cardRoutes = require('./routes/cardRoutes');
const commentRoutes = require('./routes/commentRoutes');
const authRoutes = require('./routes/authRoutes');
const passport = require("passport");
require("./config/passportConfig");

connectDB();

const app = express();
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
);
app.use(passport.initialize());


app.use('/api/update', userRoutes)
//middleware
app.use(express.json())
app.use(passport.initialize());


//Routes
app.use('/api/users', userRoutes);
app.use('/api/workspace', workspaceRoutes);
app.use('/api/column', columnRoutes);
app.use('/api/board', boardRoutes);
app.use('/api/card', cardRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/sessions', authRoutes)

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});



const PORT = process.env.PORT || 5173;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});
