const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const {z} = require('zod');
require('dotenv').config();

async function signup(req, res) {
    const schema = z.object({
           mobile_no: z.string().regex(/^[0-9]{10}$/),
           username: z.string().min(3),
           password: z.string().min(6),
    });

    try {
        schema.safeParse(req.body);
    } catch (error) {
        return res.status(400).json({message: error.errors});
    }
    const {mobile_no, username, password} = req.body;
    try{
        const checkUser = await User.findOne({username});
        if(checkUser){
            return res.status(400).json({message: 'Username already exists'});
        }
        const hashedPassword = await bcrypt.hash(password,7);
        const user = new User({
            mobile_no,
            username,
            password: hashedPassword
        });
        await user.save();
        return res.status(201).json({message: 'User created successfully'});

    }catch(error){
        return res.status(500).json({message: error.message});
    }
};

async function signin(req, res) {
    const schema = z.object({
        username: z.string().min(3),
        password: z.string().min(6),
    });

    const result = schema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ message: result.error.errors });
    }

    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 7200000 });

        return res.status(200).json({ message: 'Signin successful' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {signup, signin};