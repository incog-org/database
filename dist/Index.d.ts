import Api from "./Api.js";
import MongoDBController from "./MongoDBController.js";
import Database from "./Database.js";
import { default as dbConnect } from "./Connect.js";
export default Database;
export declare const Server: typeof Api;
export declare const MongoDB: typeof MongoDBController;
export declare const connect: typeof dbConnect;
