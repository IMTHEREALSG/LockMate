const express = require('express'); 
const authRouter = require('./routes/auth');
const passRouter = require('./routes/passwordEntry');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
require('./config');
require('dotenv').config();
const app = express();



const allowedFrontendUrl = '*'; // URL of the frontend

// CORS configuration
// app.use(cors({
//     origin: allowedFrontendUrl, // Allow only this frontend
//     credentials: true,          // Allow cookies to be sent
//     allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
//     methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'] 
// }));
app.use(cors({
    origin: allowedFrontendUrl,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../Frontend/pages')));
app.use('/auth', authRouter);
app.use('/password', passRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});