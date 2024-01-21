/* eslint-disable @typescript-eslint/no-unused-vars */
import chalk from "chalk";
import mongoose from "mongoose";
import { AdminsModel, AnimesModel, BookmarksModel, MembershipsModel, TransactionsModel, UsersModel } from "./models.js";
import { Conn } from "./connection.js";
import { AdminsSeeder, AnimesSeeder, BookmarksSeeder, MembershipsSeeder, TransactionsSeeder, UsersSeeder } from "./seeders.js";

export const insertMany = async (modelDefined, seeder) => {
    try {
        await Conn();
        await modelDefined.insertMany(seeder);
        console.log(chalk.green.bold('success inserting data'));
    } catch (error) {
        console.log(chalk.red.bold(error));
    }
}

export const deleteMany = async (modelDefined, key) => {
    try {
        await Conn();
        await modelDefined.deleteMany({ username: key });
        console.log(chalk.green.bold("Success deleting data"));
    } catch (error) {
        console.log(chalk.red.bold(error));
    }
};

export const FindCollection = async (modelDefined, key) => {
    try {
        await Conn();
        await modelDefined.insertMany({ username: key });
        console.log(chalk.green.bold('Success inserting data'));
    } catch (error) {
        console.log(chalk.red.bold(error));
    }
};

export const findAndUpdate = async (modelDefined, key) => {
    try {
        await Conn();
        await modelDefined.findOneAndUpdate(
            { username: key },
            { username: "changed" },
            { new: true });
        console.log("succes");
    } catch (error) {
        console.log(error);
    }
}

// block running
const runOperation = async (operation, models, key, seeder) => {
    try {
        await operation(models, key, seeder);
    } catch (error) {
        console.log(chalk.red.bold);
    }
};

// await runOperation(insertMany, UsersSeeder);
// await runOperation(insertMany, AdminsSeeder);
// await runOperation(insertMany, TransactionsSeeder);
// await runOperation(insertMany, AnimesModel, AnimesSeeder);
// await runOperation(insertMany, MembershipsSeeder);
// await runOperation(insertMany, BookmarksModel, BookmarksSeeder);
// await runOperation(insertMany, MembershipsModel, MembershipsSeeder);
// await runOperation(findAndUpdate, UsersModel);
// await runOperation(insertMany, AdminsModel, AdminsSeeder);
await runOperation(insertMany, TransactionsModel, TransactionsSeeder);

await mongoose.connection.close();
