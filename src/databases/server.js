/* eslint-disable @typescript-eslint/no-unused-vars */
// server.js
import express from 'express';
import bodyParser from 'body-parser';
import { Conn } from './connection.js';
import { MembershipsModel, UsersModel } from './models.js';
import cors from 'cors';
import path from 'path';
import session from 'express-session';

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
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

app.use(
    session({
        secret: '1111111',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false, // Gantilah menjadi true jika menggunakan HTTPS
            httpOnly: true,
            maxAge: null,
        },
    })
);

await Conn();

app.get('/', (req, res) => {
    res.send("LESGOOOO");
})

app.get('/api/all-user', async (req, res) => {
    try {
        if (req.session && req.session.user) {
            res.status(200).json(req.session.user);
        } else {
            res.status(401).json({ message: 'Not authorized' });
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/user', async (req, res) => {
    try {
        if (req.session && req.session.user) {
            res.status(200).json(req.session.user);
        } else {
            res.status(401).json({ message: 'Not authorized' });
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UsersModel.findOne({ email, password });

        if (user) {
            req.session.user = {
                id: user._id,
                username: user.username,
                email: user.email,
                password: user.password,
                phone_number: user.phone_number,
                membership_level: user.membership_level,
            };
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error during logout:', err);
            res.status(500).json({ message: 'Internal server error during logout' });
        } else {
            res.clearCookie('connect.sid'); // Clear the session cookie
            res.status(200).json({ message: 'Logout successful' });
        }
    });
});

app.post('/api/account/change-password', async (req, res) => {
    const { username, password, newPassword } = req.body;

    try {
        const userPassword = await UsersModel.findOneAndUpdate(
            { username, password },
            { password: newPassword },
            { new: true }
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

app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const newUser = await UsersModel.insertMany({
            username: username,
            email: email,
            password: password,
            // phone_number: phone_number,
        });
        if (newUser) {
            res.status(200).json({ message: 'Succesfully registered!' });
        } else {
            res.status(200).json({ message: 'Registered Failed' });
        }
    } catch (error) {
        console.log(error);
    }
});

app.get("/api/membership-list", async (req, res) => {
    try {
        const membershipList = await MembershipsModel.find();
        res.status(200).json(membershipList);
    } catch (error) {
        // Mengirimkan respons ke klien jika terjadi kesalahan
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
