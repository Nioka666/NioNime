import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

export const UsersModel = mongoose.model("Users", {
    id: ObjectID,
    username: String,
    email: String,
    password: String,
    phone_number: String,
    role: {
        enum: ['admin', 'user'],
    },
    membership_level: String,
    date_joined: Date
});

export const TransactionsModel = mongoose.model("Transactions", {
    id: ObjectID,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    username: String,
    membership_level: {
        type: String,
        enum: ['free', 'basic', 'premium']
    },
    amount: Number,
    status: {
        enum: ['pending', 'success', 'failed']
    },
    // invoice: String,
    date: Date,
});

export const MembershipsModel = mongoose.model("Memberships", {
    id: ObjectID,
    level: {
        type: String,
        enum: ['free', 'basic', 'premium'],
        required: true,
    },
    prices: {
        Monthly: Number,
        Yearly: Number,
    },
    features: [String],
});

export const AnimeHistory = mongoose.model("AnimeHistory", {
    id: ObjectID,
    judul: String,
});