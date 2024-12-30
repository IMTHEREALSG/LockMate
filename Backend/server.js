const express = require('express'); 
const authRouter = require('./routes/auth');
const passRouter = require('./routes/passwordEntry');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
require('./config');
require('dotenv').config();
const app = express();

const corsOptions = {
    origin: 'https://lockmate.netlify.app', // Replace with your frontend URL
    methods: 'GET,PUT,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../Frontend/pages')));
app.use('/auth', authRouter);
app.use('/password', passRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});