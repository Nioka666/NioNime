/* eslint-disable @typescript-eslint/no-unused-vars */
// server.js
import express from 'express';
import bodyParser from 'body-parser';
import { Conn } from './connection.js';
import { AdminsModel, MembershipsModel, TransactionsModel, UsersModel } from './models.js';
import cors from 'cors';
import path from 'path';
import session from 'express-session';
import multer from "multer";

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
            secure: false,
            httpOnly: true,
            maxAge: null,
        },
    })
);

await Conn();

app.get('/', (req, res) => {
    res.send("LESGOOOO");
});

const storage = multer.diskStorage({
    destination: function (req, file, callBack) {
        callBack(null, "public/img/evidence");
    },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
    res.status(200).json({ message: "File uploaded successfully" });
});

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
            res.clearCookie('connect.sid');
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

app.post("/api/membership-upgrade", async (req, res) => {
    const { userId, membership_level, newLevel } = req.body;
    try {
        const userLevelChange = UsersModel.findOneAndUpdate({ _id: userId, membership_level: newLevel }, { new: true });
        if (userLevelChange) {
            res.status(200).json(userLevelChange);
            res.status(200).json({ message: 'Level successfully changed!' });
        } else {
            res.status(200).json({ message: 'Level changed failed' });
        }
    } catch (error) {
        console.log(error);
    }
});

app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const newUser = await UsersModel.insertMany({
            username: username,
            email: email,
            password: password,
            membership_level: "Fan",
            date_joined: new Date()
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

app.get("/api/users-list", async (req, res) => {
    try {
        const usersList = await UsersModel.find();
        res.status(200).json(usersList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get("/api/trans/:trxID", async (req, res) => {
    try {
        const trxID = req.params.trxID;
        const transaction = await TransactionsModel.findOne({ _id: trxID });

        if (transaction) {
            res.status(200).json(transaction);
        } else {
            res.status(404).json({ message: 'Transaction not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/account/user-edit', async (req, res) => {
    const { username, newUsername, newEmail, newPhoneNumber } = req.body;
    try {
        const newUserInfo = await UsersModel.findOneAndUpdate(
            { username },
            {
                username: newUsername,
                email: newEmail,
                phone_number: newPhoneNumber
            },
            { new: true }
        );
        if (newUserInfo) {
            res.status(200).json({ message: 'Password successfully changed!' });
        } else {
            res.status(200).json({ message: 'Password changed failed' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post("/api/user-delete", async (req, res) => {
    const { userId } = req.body;
    try {
        await UsersModel.deleteOne({
            _id: userId
        });
        return res.status(200).json({ message: `user with id: ${userId} was successfully deleted` });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// API Admin route
app.post("/api/auth/admin-sign-in", async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await AdminsModel.findOne({ email, password });
        if (admin) {
            req.session.admin = {
                id: admin._id,
                username: admin.username,
                profile_url: admin.profile_url
            }
        }
        res.status(200).json({ message: 'admin was successfully logged in..' });
    } catch (error) {
        console.log(error);
    }
});

app.get("/api/admin-data", async (req, res) => {
    try {
        if (req.session.admin) {
            res.status(200).json(req.session.admin);
        } else {
            res.status(401).json({ message: "couldn't fetch admin data" });
        }
    } catch (error) {
        console.log(error);
    }
});

// if (user) {
//     req.session.user = {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//         password: user.password,
//         phone_number: user.phone_number,
//         membership_level: user.membership_level,
//     };
//     res.status(200).json({ message: 'Login successful' });
// } else {
//     res.status(401).json({ message: 'Invalid username or password' });
// }

app.post("/api/transaction-add", async (req, res) => {
    const { userID, username, membershipLevel, membershipPrice, fileName } = req.body;
    try {
        const newTrx = await TransactionsModel.insertMany({
            users_id: userID,
            username: username,
            membership_level: membershipLevel,
            amount: membershipPrice,
            photo_evidence: fileName,
            status: "Unprocessed",
            date_transaction: Date()
        });

        if (newTrx) {
            req.session.newTrx = newTrx.map(trx => ({
                id: trx._id,
                users_id: trx.users_id,
                username: trx.username,
                status: trx.status,
                membership_level: trx.membership_level,
                amount: trx.amount,
                date_transaction: trx.date_transaction
            }));
            req.session.save();
            res.status(200).json({ message: "Successfully inserting new trx" });
        } else {
            res.status(401).json({ error: "Inserting failed" });
        }

    } catch (error) {
        console.log(error);

    }
});

app.get("/api/transactions-data", async (req, res) => {
    try {
        if (req.session.newTrx) {
            res.status(200).json(req.session.newTrx);
        } else {
            res.status(404).json({ message: "Transaction data not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post("/api/transaction-detail", async (req, res) => {
    // const trxID = req.session.newTrx.id;
    try {
        const resp = await TransactionsModel.findOne({ id: req.session.newTrx.id });
        if (resp) {
            res.status(200).json(req.session.newTrx);
        } else {
            res.status(404).json({ message: 'Transaction not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get("/api/transaction-all", async (req, res) => {
    try {
        const resp = await TransactionsModel.find();
        if (resp) {
            res.status(200).json(resp);
        } else {
            res.status(404).json({ message: 'Transaction not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Edit transaction
app.post("/api/update/transaction-status", async (req, res) => {
    const { trxID, newTrxStatus } = req.body;
    try {
        const trxUpdated = await TransactionsModel.findOneAndUpdate({ trxID },
            { status: newTrxStatus },
            { new: true }
        );
        if (trxUpdated) {
            res.status(200).json({ message: "Transaction status is Successfully Updated" })
        } else {
            res.status(401).json({ message: "Transaction status is Failed to update" })
        }
    } catch (error) {
        console.log(error);
    }
})

app.post("/api/transaction-delete", async (req, res) => {
    const { trxID } = req.body;
    try {
        await TransactionsModel.deleteOne({
            _id: trxID
        });
        return res.status(200).json({ message: `Transaction with id: ${trxID} was successfully deleted` });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
