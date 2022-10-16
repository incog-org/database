import Api from "./Api.js";
import MongoDBController from "./MongoDBController.js";
import Database from "./Database.js";
import { default as dbConnect } from "./Connect.js";

export default Database;
export const Server = Api;
export const MongoDB = MongoDBController;

export const connect = dbConnect;