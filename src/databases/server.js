/* eslint-disable @typescript-eslint/no-unused-vars */
// server.js
import express from 'express';
import bodyParser from 'body-parser';
import { Conn } from './connection.js';
import { UsersModel } from './models.js';
import cors from 'cors';
import path from 'path';

const app = express();
const port = 3000;

const corsOptions = {
    // origin: 'http://localhost:4173', 
    origin: 'http://localhost',
    credentials: true,
    optionSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

await Conn();

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../index.html'));
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UsersModel.findOne({ username, password });

        if (user) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/account/change-password', async (req, res) => {
    const { username, password, newPassword } = req.body;

    try {
        const userPassword = await UsersModel.findOneAndUpdate(
            { username, password },
            { password: newPassword },
            { new: true } // This option returns the modified document
        );
        if (userPassword) {
            res.status(200).json({ message: 'Password successfully changed!' });
        } else {
            res.status(200).json({ message: 'Password changed failed' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
