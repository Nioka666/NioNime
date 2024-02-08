/* eslint-disable @typescript-eslint/no-unused-vars */
// server.js
import express from 'express';
import bodyParser from 'body-parser';
import { Conn } from './connection.js';
import { AdminsModel, MembershipsModel, TransactionsModel, UsersModel } from './models.js';
import cors from 'cors';
import path, { resolve } from 'path';
import session from 'express-session';
import multer from "multer";
import validator from 'validator';
import bcrypt from "bcrypt"

const app = express();
const port = 3000;
const saltRounds = 10;

const corsOptions = {
    // for production
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
    destination: function (req, file, callback) {
        callback(null, 'public/img/evidence');
    },
    filename: function (req, file, callback) {
        const currentDate = new Date().toISOString().slice(0, 10);
        const sanitizedFileName = file.originalname.replace(/\s+/g, '_');
        const generatedFileName = `ss_evidence_${currentDate}_${sanitizedFileName}`;

        callback(null, generatedFileName);
    },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
    res.status(200).json({ message: 'File uploaded successfully' });
});

// gett all user
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

// user session
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

app.post('/api/user-details', async (req, res) => {
    const userIDs = req.body.userIDs;
    try {
        const resp = await UsersModel.findOne({ _id: userIDs });
        if (resp) {
            res.status(200).json(resp);
        } else {
            res.status(401).json({ msg: `can't find user with id${userIDs}` })
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UsersModel.findOne({ email });

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                req.session.user = {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    phone_number: user.phone_number,
                    membership_level: user.membership_level,
                };
                res.status(200).json({ message: 'Login successful' });
            } else {
                res.status(401).json({ message: 'Invalid username or password' });
            }
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
    const { userID, username, newPassword } = req.body;

    if (newPassword.length < 7) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        const userPassword = await UsersModel.findOneAndUpdate(
            { _id: userID, username },
            { password: hashedPassword },
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

// change user details
app.post('/api/account/change-detail', async (req, res) => {
    const { userID, newUsername, newEmail, newPhoneNumber } = req.body;

    try {
        const updatedUser = await UsersModel.findOneAndUpdate(
            { userID },
            { username: newUsername, email: newEmail, phone_number: newPhoneNumber },
            { new: true }
        );
        if (updatedUser) {
            res.status(200).json({ message: 'User Information was successfully changed!' });
        } else {
            res.status(200).json({ message: 'User Information was failed to changed' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// NOTE
app.post("/api/membership-update", async (req, res) => {
    const userID = req.body.userID;
    const membershipDateExpired = req.body.membershipDateExpired;
    const isValidNobleFans = req.body.isValidNobleFans;
    try {
        const userLevelChange = await UsersModel.findOneAndUpdate(
            { _id: userID },
            { membership_level: isValidNobleFans, membership_expired: membershipDateExpired },
            { new: true }
        );

        if (userLevelChange) {
            res.status(200).json({ message: 'Level successfully changed!', user: userLevelChange });
        } else {
            res.status(404).json({ message: 'User not found or level change failed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/membership-update-details/:slug', async (req, res) => {
    const slug = req.params.slug;
    const newLevelName = req.body.newLevelName;
    const newPrice = req.body.newPrice;

    try {
        const resp = await MembershipsModel.findByIdAndUpdate(
            { slug: slug },
            { level: newLevelName, prices: newPrice }
        );
        if (resp) {
            res.status(200).json(resp);
        } else {
            res.status(401).json({ msg: "can't find membership data" })
        }
    } catch (error) {
        console.log(error)

    }
});


app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email address' });
    }

    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await UsersModel.insertMany({
            username: username,
            email: email,
            password: hashedPassword,
            phone_number: "",
            membership_level: 'Fans',
            date_joined: new Date(),
        });

        if (newUser) {
            res.status(200).json({ message: 'Successfully registered!' });
        } else {
            res.status(500).json({ message: 'Registration failed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// get all membership
app.get("/api/membership-list", async (req, res) => {
    try {
        const membershipList = await MembershipsModel.find();
        res.status(200).json(membershipList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// get membership by user ID
app.get("/api/membership-find", async (req, res) => {
    const { userID } = req.body;
    try {
        const membershipList = await MembershipsModel.findOne({ _id: userID });
        res.status(200).json(membershipList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post("/api/membership-find-slug", async (req, res) => {
    const membershipSlug = req.body.membershipSlug;
    try {
        const membershipList = await MembershipsModel.findOne({ slug: membershipSlug });
        res.status(200).json(membershipList);
    } catch (error) {
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
    const userID = req.body.userID;
    const newUsername = req.body.newUsername;
    const newEmail = req.body.newEmail;
    const newPhoneNumber = req.body.newPhoneNumber;

    try {
        const newUserInfo = await UsersModel.findOneAndUpdate(
            { _id: userID },
            {
                username: newUsername,
                email: newEmail,
                phone_number: newPhoneNumber
            },
            { new: true }
        );
        if (newUserInfo) {
            res.status(200).json({ message: 'User successfully changed!' });
        } else {
            res.status(200).json({ message: 'User changed failed' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Length Docs
app.get("/api/collections-length", async (req, res) => {
    try {
        const userLength = await UsersModel.countDocuments();
        const trxLength = await TransactionsModel.countDocuments();
        const membershipLength = await MembershipsModel.countDocuments();

        if (userLength && trxLength) {
            res.status(200).json({ userLength, trxLength, membershipLength });
        } else {
            res.status(401).json({ msg: "fail find length of user doc" })
        }
    } catch (error) {
        console.log(error)
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
                email: admin.email,
                profile_url: admin.profile_url
            }
            res.status(200).json({ message: 'admin was successfully logged in..' });
        } else {
            res.status(401).json({ message: 'admin was failed logged in..' });
        }
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
    const { userID, username, membershipLevel, membershipPrice, fileName, membershipDateExpired } = req.body;
    try {
        const newTrx = await TransactionsModel.insertMany({
            users_id: userID,
            username: username,
            membership_level: membershipLevel,
            amount: membershipPrice,
            photo_evidence: fileName,
            status: "Unprocessed",
            date_transaction: new Date(),
            membership_expired: membershipDateExpired
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

app.get("/api/transaction-find/:trxID", async (req, res) => {
    const trxID = req.params.trxID;

    try {
        const resp = await TransactionsModel.findOne({ _id: trxID });
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

// post route
app.post("/api/transaction-finds", async (req, res) => {
    const trxID = req.body.trxID;

    try {
        const resp = await TransactionsModel.findOne({ _id: trxID });
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

app.post("/api/user-transaction-find", async (req, res) => {
    // const trxID = req.params.trxID;
    // IMPORTANNTTTTT
    const currentUserID = req.body.currentUserID;

    try {
        const response = await TransactionsModel.findOne({ users_id: `${currentUserID}` });
        if (response) {
            res.status(200).json(response);
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
        const trxUpdated = await TransactionsModel.findOneAndUpdate({ _id: trxID },
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
});

app.post("/api/transaction-latest", async (req, res) => {
    const userID = req.body.userID;
    try {
        const latestTRX = await TransactionsModel.findOne({ users_id: userID }).sort({ date_transaction: -1 })
        if (latestTRX) {
            res.status(200).json(latestTRX)
        } else {
            res.status(401).json({ message: "can't find transaction data" })
        }
    } catch (error) {
        console.log(error)

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
