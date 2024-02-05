import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

export const AdminsModel = mongoose.model("Admins", {
    id: ObjectID,
    username: String,
    email: String,
    password: String,
    profile_url: String
});

export const UsersModel = mongoose.model("Users", {
    id: ObjectID,
    username: String,
    email: String,
    password: String,
    phone_number: String,
    profile_url: String,
    membership_level: String,
    date_joined: Date,
    membership_expired: Date
});

// export const AnimesModel = mongoose.model("Animes", {
//     id: ObjectID,
//     api_key: String,
//     title: String,
//     episodes: [Number],
//     image: String,
//     genres: [String],
//     description: String,
//     status: String,
//     type: String,
//     release_date: Date,
// });

export const TransactionsModel = mongoose.model("Transactions", {
    id: ObjectID,
    users_id: String,
    username: String,
    membership_level: {
        type: String,
        enum: ['Fans', 'Ordinary Fans', 'Noble Fans']
    },
    amount: Number,
    photo_evidence: String,
    status: {
        type: String,
        enum: ['Unprocessed', 'Process', 'Success', 'Failed']
    },
    date_transaction: Date,
    membership_expired: Date
});

export const MembershipsModel = mongoose.model("Memberships", {
    id: ObjectID,
    level: {
        type: String,
        enum: ['Fans', 'Ordinary Fans', 'Noble Fans'],
        required: true,
    },
    prices: Number,
    features: [String],
});

export const BookmarksModel = mongoose.model("Bookmarks", {
    id: ObjectID,
    users_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    animes_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animes',
    },
    created_at: Date,
});