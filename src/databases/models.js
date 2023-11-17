import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

export const AdminsModel = mongoose.model("Admins", {
    id: ObjectID,
    username: String,
    email: String,
    password: String,
});

export const UsersModel = mongoose.model("Users", {
    id: ObjectID,
    username: String,
    email: String,
    password: String,
    phone_number: String,
    membership_level: String,
    date_joined: Date
});

// export const AnimeModel = mongoose.model("Animes", {
//     id: ObjectID,
//     judul: String,
//     episode: Number,
//     status: String,
//     genres: [String],
//     release_date: Date,
// });

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
    date_transaction: Date,
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

export const UsersHistory = mongoose.model("Users_History", {
    id: ObjectID,
    judul: String,
});