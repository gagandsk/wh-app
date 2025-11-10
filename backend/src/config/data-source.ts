import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../users/user.entity"; 

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = parseInt(process.env.DB_PORT || "3306"); 
const DB_USERNAME = process.env.DB_USERNAME || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "laraveldevelop";
const DB_DATABASE = process.env.DB_DATABASE || "wheelhub_db";

export const AppDataSource = new DataSource({
    type: "mysql", 
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
});