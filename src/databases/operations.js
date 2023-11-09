/* eslint-disable @typescript-eslint/no-unused-vars */
import chalk from "chalk";
import mongoose from "mongoose";
import { UsersModel } from "./models.js";
import { Conn } from "./connection.js";
import { userSeeder } from "./seeders.js";

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

// block running
const runOperation = async (operation, key, seeder) => {
    try {
        await operation(UsersModel, key, seeder);
    } catch (error) {
        console.log(chalk.red.bold);
    }
};

// await runOperation(insertMany, userSeeder);
// await runOperation(deleteMany, 'adhimNiokagi');
// await runOperation(deleteMany, 'Beta');
// await runOperation(deleteMany, 'Alpha');
await mongoose.connection.close();
