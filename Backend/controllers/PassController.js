const crypto = require('crypto-js');
const PassEntry = require('../models/passwords');
require('dotenv').config();

async function addPassword(req, res) {
    const { pname, pword } = req.body;
    const userId = req.userId; // Assuming req.user contains the authenticated user's info
    try {
        const encryptedPassword = crypto.AES.encrypt(pword, process.env.CRYPTO_SECRET).toString();
        const password = new PassEntry({
            pname,
            pword: encryptedPassword,
            userId
        });
        await password.save();
        return res.status(201).json({
            PassName: password.pname,
            id: password._id
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function getPasswords(req, res) {
    try {
        const passwords = await PassEntry.find({ userId: req.userId });
        const encryptedPasswords = passwords.map(password => ({
            id: password._id,
            pname: password.pname,
        }));
        res.status(200).json(encryptedPasswords);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function decryptPassword(req, res) {
    try {
        const entry = await PassEntry.findOne({
            _id: req.params.id,
            userId: req.userId
        });
        if (!entry) {
            return res.status(404).json({ message: 'Password not found' });
        }
        const decryptedPassword = crypto.AES.decrypt(entry.pword, process.env.CRYPTO_SECRET).toString(crypto.enc.Utf8);
        res.json({
            pname: entry.pname,
            pword: decryptedPassword
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function deletePassword(req, res) {
    try {
        const entry = await PassEntry.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId
        });
        if (!entry) {
            return res.status(404).json({ message: 'Password not found' });
        }
        res.json({
            message: 'Password deleted successfully',
            pname: entry.pname
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    addPassword,
    getPasswords,
    decryptPassword,
    deletePassword
};