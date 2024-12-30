const express = require('express'); 
const authRouter = require('./routes/auth');
const passRouter = require('./routes/passwordEntry');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
require('./config');
require('dotenv').config();
const app = express();

const allowedFrontendUrls = ['http://127.0.0.1:5500','https://lock-mate-6mbl.vercel.app']; // Add your allowed URLs here

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedFrontendUrls.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE']
};

// CORS configuration
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../Frontend/pages')));
app.use('/auth', authRouter);
app.use('/password', passRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});