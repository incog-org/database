import { DBQuery, SearchQuery } from "./Interface.js";
import MongoDBController from "./MongoDBController.js";
export default class Database {
    controller: MongoDBController;
    constructor(controller: MongoDBController);
    findTheatre(query: SearchQuery, offset?: number, limit?: number): Promise<DBQuery[]>;
    insertTheatre(query: SearchQuery): Promise<boolean>;
    createTheatreId(): Promise<string>;
    findHost(host: string, owner?: string): Promise<boolean>;
    insertHost(host: string, owner?: string): Promise<boolean>;
    deleteHost(host: string, owner?: string): Promise<boolean>;
}
