/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";
import { MembershipsModel, TransactionsModel, UsersModel } from "./models.js";
import { Conn } from "./connection.js";
import { MembershipsSeeder, TransactionsSeeder, userSeeder } from "./seeders.js";

const UserMigration = (async () => {
    try {
        await Conn();
        await UsersModel.insertMany(userSeeder);
        console.log("Users inserted successfully");
    } catch (error) {
        console.error("Error:", error);
    }
})();

export const TransactionsMigration = (async () => {
    try {
        await Conn();
        await TransactionsModel.insertMany(TransactionsSeeder);
    } catch (error) {
        console.log(error)
    }
})();

export const MembershipMigration = (async () => {
    try {
        await Conn();
        await MembershipsModel.insertMany(MembershipsSeeder);
    } catch (error) {
        console.log(error)
    } finally {
        mongoose.connection.close();
    }
})();

